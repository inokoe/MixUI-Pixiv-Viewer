import { getCurrentDomain } from '@/utils/pixiv/Tools'
import { Illust } from './http/base.types'

export const PIXIV_HTTP_API_DOMAIN = '/'
// Source: https://rainchan.win/projects/pximg => https://px.s.rainchan.win
// Scoure:https://pixiv.cat/ => https://i.pixiv.re | https://i.pixiv.cat
// Cloudflare Worker 多域名分流，防止单域名并发限制

// Cloudflare CNAME优选IP，多域名分流
export const CLOUDFLARE_WORKER_DOMAIN = [
  'picdn.0002523.xyz',
  'piicdn.0002523.xyz',
  'piiicdn.0002523.xyz',
]

// Vercel 部署代理
export const SERVER_DOMAIN = [`${getCurrentDomain()}/cdn`]

// 策略一、白天使用cloudflare worker，夜晚使用vercel代理，节约Vercel流量
// export const MY_PROXY_API = isEarlyMorning() ? CLOUDFLARE_WORKER_DOMAIN : SERVER_DOMAIN
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

export const DEV_MODE_DATA: Illust = {
  id: 126073046,
  title: 'りんご飴の工場',
  type: 'illust',
  image_urls: {
    square_medium:
      'https://i.pximg.net/c/360x360_70/img-master/img/2025/01/10/07/30/03/126073046_p0_square1200.jpg',
    medium:
      'https://i.pximg.net/c/540x540_70/img-master/img/2025/01/10/07/30/03/126073046_p0_master1200.jpg',
    large:
      'https://i.pximg.net/c/600x1200_90/img-master/img/2025/01/10/07/30/03/126073046_p0_master1200.jpg',
  },
  caption:
    'りんご飴<br /><br />今見たら今年はクリスマス絵よりお正月絵のほうを多く描いていて驚きました。',
  restrict: 0,
  user: {
    id: 33333,
    name: 'ポ～ン（出水ぽすか）',
    account: 'pone',
    profile_image_urls: {
      medium:
        'https://i.pximg.net/user-profile/img/2013/06/12/00/22/23/6360780_71641d1f5f7ec7c73f9ce6ed1b6443cf_170.jpg',
    },
    is_followed: false,
  },
  tags: [
    {
      name: '創作',
      translated_name: '原创',
    },
    {
      name: 'Apple',
      translated_name: null,
    },
    {
      name: 'Яблоко',
      translated_name: null,
    },
    {
      name: 'りんご飴',
      translated_name: '苹果糖',
    },
    {
      name: '食べ物',
      translated_name: '食物',
    },
    {
      name: '工場見学',
      translated_name: null,
    },
  ],
  tools: [],
  create_date: '2025-01-10T07:30:03+09:00',
  page_count: 1,
  width: 994,
  height: 1403,
  sanity_level: 2,
  x_restrict: 0,
  series: null,
  meta_single_page: {
    original_image_url: 'https://i.pximg.net/img-original/img/2025/01/10/07/30/03/126073046_p0.jpg',
  },
  meta_pages: [],
  total_view: 68550,
  total_bookmarks: 10395,
  is_bookmarked: false,
  visible: true,
  is_muted: false,
  total_comments: 32,
  illust_ai_type: 1,
  illust_book_style: 0,
  comment_access_control: 0,
}
