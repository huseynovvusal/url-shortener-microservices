import { ClickData } from '@analytics-service/interfaces/click-data.interface';
import { IAnalyticsService } from '@analytics-service/services/analytics.service';
import { logger } from '@huseynovvusal/url-shortener-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AnalyticsController {
  constructor(private readonly analyticsService: IAnalyticsService) {}

  async recordClick(req: Request, res: Response): Promise<void> {
    try {
      const { urlId } = req.params;
      const clickData: ClickData = req.body;

      const analytics = await this.analyticsService.recordClick(urlId, clickData);

      res.status(StatusCodes.OK).json({
        data: analytics,
      });
    } catch (error) {
      logger.error('Error recording click:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to record click' });
    }
  }

  async getUrlAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { urlId } = req.params;
      const analytics = await this.analyticsService.getUrlAnalytics(urlId);

      if (!analytics) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Analytics not found for this URL' });
        return;
      }

      res.status(StatusCodes.OK).json({
        data: analytics,
      });
    } catch (error) {
      logger.error('Error fetching analytics:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch analytics' });
    }
  }

  async getMultipleUrlAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { urlIds } = req.body;

      //TODO: Validation using Zod
      if (!urlIds || !Array.isArray(urlIds)) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'Valid urlIds array is required' });
        return;
      }

      const analytics = await this.analyticsService.getAnalyticsForUrls(urlIds);
      res.status(StatusCodes.OK).json({
        data: analytics,
      });
    } catch (error) {
      logger.error('Error fetching multiple analytics:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch analytics' });
    }
  }
}
