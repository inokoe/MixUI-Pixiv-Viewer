import { getCurrentDomain, isEarlyMorning } from '@/utils/pixiv/Tools'

export const PIXIV_HTTP_API_DOMAIN = '/'
// Source: https://rainchan.win/projects/pximg => https://px.s.rainchan.win
// Scoure:https://pixiv.cat/ => https://i.pixiv.re | https://i.pixiv.cat
// Cloudflare Worker 多域名分流，防止单域名并发限制

// Cloudflare CNAME优选IP
const CLOUDFLARE_WORKER_DOMAIN = ['picdn.0002523.xyz', 'piicdn.0002523.xyz', 'piiicdn.0002523.xyz']

// Vercel CDN
const VERCEL_PROXY_API = [
  'mui.cdn1.0002523.xyz/cdn',
  'mui.cdn2.0002523.xyz/cdn',
  'mui.cdn3.0002523.xyz/cdn',
  'mui.cdn4.0002523.xyz/cdn',
]

// Vercel 部署代理
const SERVER_DOMAIN = [`${getCurrentDomain()}/cdn`]

// 策略一、白天使用cloudflare worker，夜晚使用vercel代理，节约Vercel流量
// export const MY_PROXY_API = isEarlyMorning() ? CLOUDFLARE_WORKER_DOMAIN : VERCEL_PROXY_API
// 策略二、使用Vercel部署代理
// export const MY_PROXY_API = SERVER_DOMAIN
// 策略三、使用cloudflare worker
export const MY_PROXY_API = CLOUDFLARE_WORKER_DOMAIN

export const PIXIV_IMAGE_PROXY_DOMAIN = MY_PROXY_API[0]
export const AXIOS_DEFAULT_HEADERS = {
  'Cache-Control': 'no-cache',
}
export const AXIOS_DEFAULT_TIMEOUT = 10000
export const AXIOS_DEFAULT_RETRIES = 3
export const AXIOS_DEFAULT_RETRY_DELAY = 1000
