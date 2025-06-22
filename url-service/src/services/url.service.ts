import { NotFoundError } from '@huseynovvusal/url-shortener-shared';
import { AppConfig } from '@url-service/config/app.config';
import { CreateUrlDto } from '@url-service/dtos/create-url.dto';
import { UrlResponseDto } from '@url-service/dtos/url-response.dto';
import { IUrlDocument } from '@url-service/interfaces/url.interface';
import { UrlRepository } from '@url-service/repositories/url.repository';

export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly appConfig: AppConfig
  ) {}

  public async createShortUrl(
    data: CreateUrlDto,
    userId: string
  ): Promise<UrlResponseDto> {
    const url = await this.urlRepository.create({
      ...data,
      userId: userId,
    });

    return this.mapUrlToDto(url);
  }

  public async getUrlByShortCode(shortCode: string): Promise<UrlResponseDto> {
    const url = await this.urlRepository.findByShortCode(shortCode);

    if (!url) {
      throw new NotFoundError('URL not found');
    }

    return this.mapUrlToDto(url);
  }

  public async getUrlById(id: string): Promise<UrlResponseDto> {
    const url = await this.urlRepository.findById(id);

    if (!url) {
      throw new NotFoundError('URL not found');
    }

    return this.mapUrlToDto(url);
  }

  public async getUrlsByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    urls: UrlResponseDto[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }> {
    const result = await this.urlRepository.findByUserId(userId, page, limit);

    return {
      urls: result.urls.map((url) => this.mapUrlToDto(url)),
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        pages: result.pages,
      },
    };
  }

  public async incrementClickCount(shortCode: string): Promise<UrlResponseDto> {
    const url = await this.urlRepository.incrementClickCount(shortCode);

    if (!url) {
      throw new NotFoundError('URL not found');
    }

    return this.mapUrlToDto(url);
  }

  async deleteUrlById(id: string): Promise<boolean> {
    const url = await this.urlRepository.findById(id);

    if (!url) {
      throw new NotFoundError('URL not found');
    }

    await this.urlRepository.deleteById(id);

    return true;
  }

  private mapUrlToDto(url: IUrlDocument): UrlResponseDto {
    return {
      id: url.id.toString(),
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      shortUrl: `${this.appConfig.baseUrl}/${url.shortCode}`,
      userId: url.userId,
      clickCount: url.clickCount,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    };
  }
}

export const createUrlService = (
  urlRepository: UrlRepository,
  appConfig: AppConfig
) => new UrlService(urlRepository, appConfig);
