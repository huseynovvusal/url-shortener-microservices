export interface UserAgentInfo {
  browser: {
    name: string;
    version: string;
  };
  device: {
    type: string;
    vendor: string;
    model: string;
  };
  os: {
    name: string;
    version: string;
  };
}
