import { CreateUrlDto } from '@user-service/dtos/create-url.dto';
import { IUrlDocument } from '@user-service/interfaces/url.interface';
import UrlModel from '@user-service/models/url.model';
import { generateShortCode } from '@user-service/utils/generate-short-code';

export class UrlRepository {
  async create(data: CreateUrlDto, userId: string): Promise<IUrlDocument> {
    const shortCode = generateShortCode();

    const url = new UrlModel({
      shortCode,
      originalUrl: data.originalUrl,
      userId: userId,
    });

    return await url.save();
  }

  async findByShortCode(shortCode: string): Promise<IUrlDocument | null> {
    return UrlModel.findOne({
      shortCode: shortCode,
    });
  }

  async findById(id: string): Promise<IUrlDocument | null> {
    return UrlModel.findById(id);
  }

  async findByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    urls: IUrlDocument[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }> {
    const skip = (page - 1) * limit;

    const [urls, total] = await Promise.all([
      UrlModel.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      UrlModel.countDocuments({ userId }),
    ]);

    return {
      urls,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async incrementClickCount(shortCode: string): Promise<IUrlDocument | null> {
    return UrlModel.findOneAndUpdate(
      { shortCode },
      { $inc: { clickCount: 1 } },
      { new: true }
    );
  }

  async deleteById(id: string): Promise<IUrlDocument | null> {
    return UrlModel.findByIdAndDelete(id);
  }
}

export const createUrlRepository = () => new UrlRepository();
