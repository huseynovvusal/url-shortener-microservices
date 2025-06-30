import { UAParser } from 'ua-parser-js';

export const parseUserAgent = (
  userAgent: string
): {
  browser?: string;
  device?: string;
  operatingSystem?: string;
} => {
  const parser = new UAParser(userAgent);

  return {
    browser: parser.getBrowser()?.name || 'Unknown',
    device: parser.getDevice()?.type || 'Unknown',
    operatingSystem: parser.getOS()?.name || 'Unknown',
  };
};
