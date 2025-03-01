// API 完整模板
/**
{
  vercel: {
    "city": "New York",
    "country": "US",
    "flag": "🇺🇸",
    "countryRegion": "NY",
    "region": "iad1",
    "latitude": "40.7128",
    "longitude": "-74.0060"
  },
  api: {
    status: 'success',
    country: 'China',
    countryCode: 'CN',
    region: 'SD',
    regionName: 'Shandong',
    city: 'Weifang',
    zip: '261000',
    lat: 36.7069,
    lon: 119.162,
    timezone: 'Asia/Shanghai',
    isp: 'China Unicom Shandong Province network',
    org: 'NanJing XinFeng Information Technologies, Inc.',
    as: 'AS4837 CHINA UNICOM China169 Backbone',
    query: '114.114.114.114'
  }
}
 */
interface responseData {
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

export { responseData };
