import * as amqp from 'amqplib';
import { logger } from '@huseynovvusal/url-shortener-shared';
import { ClickData } from '@url-service/interfaces/click-data.interface';

export class AnalyticsProducer {
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  static readonly EXCHANGE_NAME = 'clicks_exchange';
  static readonly ROUTING_KEY = 'clicks';

  public async connect(rabbitMqUrl: string): Promise<void> {
    try {
      this.connection = await amqp.connect(rabbitMqUrl);
      this.channel = await this.connection.createChannel();

      await this.channel.assertExchange(
        AnalyticsProducer.EXCHANGE_NAME,
        'direct'
      );

      // Set up graceful shutdown
      process.once('SIGINT', this.close.bind(this));

      logger.info(`Connected to RabbitMQ at ${rabbitMqUrl}`);
    } catch (error) {
      logger.error(`Failed to connect to RabbitMQ: ${error}`);
      throw error;
    }
  }

  public async publishClickEvent(
    urlId: string,
    clickData: ClickData
  ): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized. Call connect() first.');
    }

    try {
      const message = JSON.stringify({ urlId, ...clickData });

      const isPublished = this.channel.publish(
        AnalyticsProducer.EXCHANGE_NAME,
        AnalyticsProducer.ROUTING_KEY,
        Buffer.from(message),
        {
          persistent: true,
          contentType: 'application/json',
        }
      );

      if (isPublished) {
        logger.info(`Click event published for URL ID: ${urlId}`);
      } else {
        logger.warn(`Failed to publish click event for URL ID: ${urlId}`);
      }
    } catch (error) {
      logger.error(`Error publishing click event: ${error}`);
      throw error;
    }
  }

  public async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      logger.info('Channel closed');
    }
    if (this.connection) {
      await this.connection.close();
      logger.info('Connection closed');
    }
  }
}

export const createAnalyticsProducer = () => new AnalyticsProducer();
