import mongoose from 'mongoose';

export interface UrlResponseDto {
  id: string;
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  user: mongoose.Types.ObjectId;
  clickCount: number;
  createdAt: Date;
  updatedAt: Date;
}
