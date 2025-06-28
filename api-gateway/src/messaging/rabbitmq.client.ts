import { logger } from '@huseynovvusal/url-shortener-shared';
import amqp from 'amqplib';

export class RabbitMQClient {
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;
  private attempts = 0;
  private readonly maxAttempts = 5;
  private readonly retryDelay = 5000; // 5 seconds

  private connected: boolean = false;

  constructor(private readonly url: string) {}

  public async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();

      this.connected = true;
      this.attempts = 0;

      await this.setupQueues();

      logger.info('RabbitMQ connected successfully');
    } catch (error) {
      this.connected = false;
      this.reconnect();
    }
  }

  private async setupQueues(): Promise<void> {
    if (!this.channel) return;

    await this.channel.assertQueue('clicks_queue', { durable: true });
  }

  public async publish<T = any>(queue: string, message: T): Promise<boolean> {
    if (!this.channel || !this.connected) {
      logger.error('RabbitMQ channel is not connected. Cannot publish message.');
      return false;
    }

    try {
      const content = Buffer.from(JSON.stringify(message));

      const result = await this.channel.sendToQueue(queue, content, {
        persistent: true,
        timestamp: Date.now(),
      });

      if (result) {
        logger.info(`Message sent to queue ${queue}:`, message);
      } else {
        logger.error(`Failed to send message to queue ${queue}:`, message);
      }

      return result;
    } catch (error) {
      logger.error(`Error publishing message to queue ${queue}:`, error);
      return false;
    }
  }

  private reconnect(): void {
    if (this.attempts >= this.maxAttempts) {
      logger.error('Max connection attempts reached. Exiting...');
      process.exit(1);
    }

    this.attempts++;

    setTimeout(() => {
      logger.warn(`Reconnecting to RabbitMQ... Attempt ${this.attempts}`);

      this.connect();
    }, this.retryDelay);
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }

      if (this.connection) {
        await this.connection.close();
      }

      this.connected = false;
      logger.info('RabbitMQ disconnected successfully');
    } catch (error) {
      logger.error('Error disconnecting from RabbitMQ:', error);
    }
  }

  public get isConnected(): boolean {
    return this.connected;
  }
}
