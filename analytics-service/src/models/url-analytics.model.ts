import { URLAnalyticsDocument } from '@analytics-service/interfaces/url-analytics.interface';
import mongoose, { Schema } from 'mongoose';

const URLAnalyticsSchema = new Schema<URLAnalyticsDocument>(
  {
    urlId: {
      type: String,
      required: true,
      unique: true,
    },
    totalClicks: {
      type: Number,
      default: 0,
    },
    countries: {
      type: Map,
      of: Number,
      default: {},
    },
    referrers: {
      type: Map,
      of: Number,
      default: {},
    },
    browsers: {
      type: Map,
      of: Number,
      default: {},
    },
    devices: {
      type: Map,
      of: Number,
      default: {},
    },
    operatingSystems: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true }
);

URLAnalyticsSchema.index({ urlId: 1 }, { unique: true });

const URLAnalyticsModel = mongoose.model<URLAnalyticsDocument>(
  'URLAnalytics',
  URLAnalyticsSchema
);

export default URLAnalyticsModel;
