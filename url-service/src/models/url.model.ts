import { IUrlDocument } from '@url-service/interfaces/url.interface';
import mongoose, { Schema } from 'mongoose';

const urlSchema = new Schema<IUrlDocument>(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    userId: { type: String, required: true },
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UrlModel = mongoose.model<IUrlDocument>('Url', urlSchema);

export default UrlModel;
