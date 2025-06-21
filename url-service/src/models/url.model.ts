import { IUrlDocument } from '@user-service/interfaces/url.interface';
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
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
