export interface IpResponse {
  vercel: {
    ip?: string;
    city?: string;
    country?: string;
    flag?: string;
    countryRegion?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
    vercelTime?: number;
  };
  api?: {
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: string;
    lon: string;
    timezone: string;
    isp: string;
    org: string;
    as: string;
    query: string;
    useTime: number;
  };
}
