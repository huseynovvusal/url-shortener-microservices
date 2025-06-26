import { UserAgentInfo } from '@api-gateway/interfaces/user-agent-info.interface';
import { UAParser } from 'ua-parser-js';

export function parseUserAgent(userAgent: string | undefined): UserAgentInfo {
  if (!userAgent) {
    return {
      browser: { name: 'Unknown', version: 'Unknown' },
      device: { type: 'Unknown', vendor: 'Unknown', model: 'Unknown' },
      os: { name: 'Unknown', version: 'Unknown' },
    };
  }

  const result = UAParser(userAgent);

  return {
    browser: {
      name: result.browser.name || 'Unknown',
      version: result.browser.version || 'Unknown',
    },
    device: {
      type: result.device.type || 'Unknown',
      vendor: result.device.vendor || 'Unknown',
      model: result.device.model || 'Unknown',
    },
    os: {
      name: result.os.name || 'Unknown',
      version: result.os.version || 'Unknown',
    },
  };
}
