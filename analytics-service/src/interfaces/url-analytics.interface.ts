interface CountryBreakdown {
  [country: string]: number;
}

interface ReferrerBreakdown {
  [referrer: string]: number;
}

interface BrowserBreakdown {
  [browser: string]: number;
}

interface DeviceBreakdown {
  [device: string]: number;
}

interface OSBreakdown {
  [os: string]: number;
}

export interface URLAnalytics {
  urlId: string;
  totalClicks: number;
  countries: CountryBreakdown;
  referrers: ReferrerBreakdown;
  browsers: BrowserBreakdown;
  devices: DeviceBreakdown;
  operatingSystems: OSBreakdown;
  createdAt: Date;
  updatedAt: Date;
}

export interface URLAnalyticsDocument extends URLAnalytics, Document {}
