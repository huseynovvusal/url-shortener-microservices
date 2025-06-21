import mongoose, { Document } from 'mongoose';

export interface IUrl {
  shortCode: string;
  originalUrl: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  clickCount: number;
}

export interface IUrlDocument extends IUrl, Document {}
