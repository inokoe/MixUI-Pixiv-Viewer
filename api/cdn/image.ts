import { getResponseImage } from '../utils.js'

export async function GET(request: Request) {
  // 从 URL 中获取目标图片地址
  const urlInfo = new URL(request.url)
  const proxyPath = urlInfo.pathname.replace('/cdn/', '')

  if (!proxyPath) {
    return new Response('Missing url parameter', { status: 400 })
  }

  // 构建新的 URL
  const url = `https://i.pixiv.re/${proxyPath}`

  console.log(url)

  // 发起请求获取图片
  const response = await fetch(url, {
    headers: {
      Referer: 'https://www.pixiv.net/',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  })

  const body = await response.blob()

  return getResponseImage(body)
}
