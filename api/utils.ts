import { DEV_MODE, FAKE_USER_AGENT } from './config.js';

// 允许跨域
export function getResponse(data: object) {
  const response = new Response(JSON.stringify(data));
  response.headers.set('Content-Type', 'application/json');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET');
  return response;
}

export function getResponseImage(data: ArrayBuffer | Blob | string) {
  const response = new Response(data);
  response.headers.set('Content-Type', 'image/jpeg');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  response.headers.set('Access-Control-Max-Age', '86400');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Cache-Control', 'public, max-age=31536000');
  return response;
}

export function getRandomUserAgent() {
  const randomIndex = Math.floor(Math.random() * FAKE_USER_AGENT.length);
  return FAKE_USER_AGENT[randomIndex];
}

export function getRequestPathData(BASE_URL: string, data: string | URL) {
  const urlInfo = new URL(data);
  const proxyPath = urlInfo.pathname;

  // 创建新的 URLSearchParams 并移除 path 参数
  const searchParams = new URLSearchParams(urlInfo.search);
  searchParams.delete('path');
  const proxySearch = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';

  if (DEV_MODE) {
    console.log('Forward URL:');
    console.log(`${BASE_URL}${proxyPath}${proxySearch}`);
  }
  return `${BASE_URL}${proxyPath}${proxySearch}`;
}

export function getRequestHeaders(headers: HeadersInit) {
  const myHeaders = new Headers();

  const userAgent =
    headers instanceof Headers ? headers.get('user-agent') : null;
  myHeaders.set(
    'User-Agent',
    userAgent ||
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  );
  myHeaders.set('Accept', 'application/json, text/plain, */*');
  myHeaders.set(
    'Accept-Language',
    'zh-CN,zh;q=0.9,en;q=0.8,zh-HK;q=0.7,ja;q=0.6'
  );
  myHeaders.set('Accept-Encoding', 'gzip, deflate, br, zstd');
  myHeaders.set('Connection', 'keep-alive');
  myHeaders.set('Cache-Control', 'no-cache');
  myHeaders.set('Pragma', 'no-cache');
  myHeaders.set('DNT', '1');
  myHeaders.set('Origin', 'https://pixiv.pictures');
  myHeaders.set('Referer', 'https://pixiv.pictures/');
  myHeaders.set('Sec-Fetch-Dest', 'empty');
  myHeaders.set('Sec-Fetch-Mode', 'cors');
  myHeaders.set('Sec-Fetch-Site', 'cross-site');
  myHeaders.set(
    'Sec-Ch-Ua',
    '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"'
  );
  myHeaders.set('Sec-Ch-Ua-Mobile', '?0');
  myHeaders.set('Sec-Ch-Ua-Platform', '"macOS"');
  myHeaders.set('Priority', 'u=1, i');

  // 如果原始headers中有其他需要的头，可以保留
  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      if (key.toLowerCase() === 'cookie') {
        myHeaders.set(key, value);
      }
    });
  }

  if (DEV_MODE) {
    console.log('Request Headers');
    console.log(myHeaders);
  }

  return myHeaders;
}
