import { ClickData } from '@analytics-service/interfaces/click-data.interface';
import { URLAnalytics } from '@analytics-service/interfaces/url-analytics.interface';
import URLAnalyticsModel from '@analytics-service/models/url-analytics.model';

export interface IURLAnalyticsRepository {
  findByUrlId(urlId: string): Promise<URLAnalytics | null>;
  createAnalytics(urlId: string): Promise<URLAnalytics>;
  incrementClick(
    urlId: string,
    clickData: ClickData
  ): Promise<URLAnalytics | null>;
  getAnalyticsByUrlId(urlId: string): Promise<URLAnalytics | null>;
  getAnalyticsByMultipleUrlIds(urlIds: string[]): Promise<URLAnalytics[]>;
}

export class URLAnalyticsRepository implements IURLAnalyticsRepository {
  public async findByUrlId(urlId: string): Promise<URLAnalytics | null> {
    return URLAnalyticsModel.findOne({ urlId });
  }

  async createAnalytics(urlId: string): Promise<URLAnalytics> {
    return URLAnalyticsModel.create({ urlId });
  }

  async incrementClick(
    urlId: string,
    clickData: ClickData
  ): Promise<URLAnalytics | null> {
    const updateQuery: any = {
      $inc: {
        totalClicks: 1,
      },
    };

    if (clickData.country) {
      updateQuery.$inc[`countries.${clickData.country}`] = 1;
    }
    if (clickData.referrer) {
      updateQuery.$inc[`referrers.${clickData.referrer}`] = 1;
    }
    if (clickData.browser) {
      updateQuery.$inc[`browsers.${clickData.browser}`] = 1;
    }
    if (clickData.device) {
      updateQuery.$inc[`devices.${clickData.device}`] = 1;
    }
    if (clickData.operatingSystem) {
      updateQuery.$inc[`operatingSystems.${clickData.operatingSystem}`] = 1;
    }

    return URLAnalyticsModel.findOneAndUpdate({ urlId }, updateQuery, {
      new: true,
      upsert: true,
    });
  }

  async getAnalyticsByUrlId(urlId: string): Promise<URLAnalytics | null> {
    return URLAnalyticsModel.findOne({ urlId });
  }

  async getAnalyticsByMultipleUrlIds(
    urlIds: string[]
  ): Promise<URLAnalytics[]> {
    return URLAnalyticsModel.find({ urlId: { $in: urlIds } });
  }
}

export const createURLAnalyticsRepository = () => new URLAnalyticsRepository();
