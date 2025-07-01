import { logger, NotFoundError } from '@huseynovvusal/url-shortener-shared';
import { CreateUrlDto } from '@url-service/dtos/create-url.dto';
import { parseUserAgent } from '@url-service/lib/ua-parser';
import { AnalyticsProducer } from '@url-service/producers/analytics.producer';
import { UrlService } from '@url-service/services/url.service';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClickData } from '@url-service/interfaces/click-data.interface';
import { RedisService } from '@url-service/services/redis.service';
import { IUrl } from '@url-service/interfaces/url.interface';

export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly analyticsProducer: AnalyticsProducer,
    private readonly redisSercice: RedisService
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const urlData: CreateUrlDto = req.body;
      const userId = req.user!.id;

      const url = await this.urlService.createShortUrl(urlData, userId);

      // return
      res.status(StatusCodes.CREATED).json({
        data: url,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getByShortCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { shortCode } = req.params;

      const url = await this.urlService.getUrlByShortCode(shortCode);

      res.status(StatusCodes.OK).json({
        data: url,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getUrlsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.urlService.getUrlsByUserId(userId, page, limit);

      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async deleteUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this.urlService.deleteUrlById(id);

      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }

  public async redirectToOriginalUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { shortCode } = req.params;

      let url: IUrl | null = null;

      const cachedUrl = await this.redisSercice.get<IUrl>(`url:${shortCode}`);

      if (cachedUrl) {
        url = cachedUrl;

        logger.debug('From redis');
      } else {
        logger.debug('From database');

        url = await this.urlService.getUrlByShortCode(shortCode);

        if (!url) throw new NotFoundError('URL not found');

        this.redisSercice.set<IUrl>(`url:${shortCode}`, url, 3600);
      }

      const parsedUserAgent = parseUserAgent(
        req.headers['user-agent'] as string
      );

      const clickData: ClickData = {
        country: req.headers['x-country'] as string,
        referrer: req.headers.referer,
        browser: parsedUserAgent.browser,
        device: parsedUserAgent.device,
        operatingSystem: parsedUserAgent.operatingSystem,
      };

      logger.debug('Click data:', clickData);

      this.analyticsProducer.publishClickEvent(url.id, clickData);

      res.redirect(url.originalUrl);
    } catch (error) {
      next(error);
    }
  }
}

export const createUrlController = (
  urlService: UrlService,
  analyticsProducer: AnalyticsProducer,
  redisService: RedisService
) => new UrlController(urlService, analyticsProducer, redisService);
