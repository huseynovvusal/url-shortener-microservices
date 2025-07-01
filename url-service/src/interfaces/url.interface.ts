import { Document } from 'mongoose';

export interface IUrl {
  id: string;
  shortCode: string;
  originalUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  clickCount: number;
}

export interface IUrlDocument extends Omit<IUrl, 'id'>, Document {}
