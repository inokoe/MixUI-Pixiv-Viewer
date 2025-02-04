export const PIXIV_HTTP_API_DOMAIN = '/'
// Source: https://rainchan.win/projects/pximg => https://px.s.rainchan.win
// Scoure:https://pixiv.cat/ => https://i.pixiv.re | https://i.pixiv.cat
// Cloudflare Worker 多域名分流，防止单域名并发限制

const CLOUDFLARE_WORKER_DOMAIN = [
  'pi.0002523.xyz',
  'pii.0002523.xyz',
  'piii.0002523.xyz',
  'piiii.0002523.xyz',
]

// 白天使用cloudflare worker，夜晚使用vercel代理，节约Vercel流量
export const MY_PROXY_API = CLOUDFLARE_WORKER_DOMAIN

export const PIXIV_IMAGE_PROXY_DOMAIN = MY_PROXY_API[0]
export const AXIOS_DEFAULT_HEADERS = {
  'Cache-Control': 'no-cache',
}
export const AXIOS_DEFAULT_TIMEOUT = 10000
export const AXIOS_DEFAULT_RETRIES = 3
export const AXIOS_DEFAULT_RETRY_DELAY = 1000
