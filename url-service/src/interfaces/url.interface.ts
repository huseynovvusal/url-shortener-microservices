import { Document } from 'mongoose';

export interface IUrl {
  shortCode: string;
  originalUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  clickCount: number;
}

export interface IUrlDocument extends IUrl, Document {}
