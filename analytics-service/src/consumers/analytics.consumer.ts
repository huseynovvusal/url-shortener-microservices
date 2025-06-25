import * as amqp from 'amqplib';
import { IAnalyticsService } from '@analytics-service/services/analytics.service';
import { logger } from '@huseynovvusal/url-shortener-shared';
import { ClickData } from '@analytics-service/interfaces/click-data.interface';

export class AnalyticsConsumer {
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;
  static readonly QUEUE_NAME = 'analytics_queue';

  private analyticsService: IAnalyticsService;

  constructor(analyticsService: IAnalyticsService) {
    this.analyticsService = analyticsService;
  }

  public async connect(rabbitMqUrl: string): Promise<void> {
    try {
      this.connection = await amqp.connect(rabbitMqUrl);
      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(AnalyticsConsumer.QUEUE_NAME);
      logger.info(`Connected to RabbitMQ at ${rabbitMqUrl} and asserted queue ${AnalyticsConsumer.QUEUE_NAME}`);
    } catch (error) {
      logger.error(`Failed to connect to RabbitMQ: ${error}`);
      throw error;
    }
  }

  public async consumeClickEvents(): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized. Call connect() first.');
    }

    this.channel.consume(AnalyticsConsumer.QUEUE_NAME, async (msg) => {
      if (!msg) {
        logger.warn('Received null message, skipping');
        return;
      }

      try {
        const clickEvent = JSON.parse(msg.content.toString());
        const { urlId, ...clickData } = clickEvent;

        await this.analyticsService.recordClick(urlId, clickData as ClickData);

        this.channel!.ack(msg);
      } catch (error) {
        logger.error(`Failed to process message: ${error}`);
        this.channel!.nack(msg, true);
      }
    });
  }
}
