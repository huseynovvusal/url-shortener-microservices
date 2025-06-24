import { ClickData } from '@analytics-service/interfaces/click-data.interface';
import { URLAnalytics } from '@analytics-service/interfaces/url-analytics.interface';
import { IURLAnalyticsRepository } from '@analytics-service/repositories/url-analytics.repository';

export interface IAnalyticsService {
  recordClick(urlId: string, clickData: ClickData): Promise<URLAnalytics | null>;
  getUrlAnalytics(urlId: string): Promise<URLAnalytics | null>;
  getAnalyticsForUrls(urlIds: string[]): Promise<URLAnalytics[]>;
}

export class AnalyticsService implements IAnalyticsService {
  constructor(private readonly analyticsRepository: IURLAnalyticsRepository) {}

  public async recordClick(urlId: string, clickData: ClickData): Promise<URLAnalytics | null> {
    return this.analyticsRepository.incrementClick(urlId, clickData);
  }

  public async getUrlAnalytics(urlId: string): Promise<URLAnalytics | null> {
    return this.analyticsRepository.findByUrlId(urlId);
  }

  public async getAnalyticsForUrls(urlIds: string[]): Promise<URLAnalytics[]> {
    return this.analyticsRepository.getAnalyticsByMultipleUrlIds(urlIds);
  }
}

export const createAnalyticsService = (analyticsRepository: IURLAnalyticsRepository) =>
  new AnalyticsService(analyticsRepository);
