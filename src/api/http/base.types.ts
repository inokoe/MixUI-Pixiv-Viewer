// 定义图片 URL 接口
interface ImageUrls {
  square_medium: string
  medium: string
  large: string
  original?: string
}

// 定义用户信息接口
interface User {
  id: number
  name: string
  account: string
  profile_image_urls: {
    medium: string
  }
  is_followed: boolean
}

// 定义标签接口
interface Tag {
  name: string
  translated_name: string | null
}

// 定义系列信息接口
interface Series {
  id: number
  title: string
}

// 定义单页图片信息接口
interface MetaSinglePage {
  original_image_url?: string
}

// 定义多页图片信息接口
interface MetaPage {
  image_urls: ImageUrls
}

// 定义作品信息接口
interface Illust {
  id: number
  title: string
  type: 'illust' | 'manga'
  image_urls: ImageUrls
  caption: string
  restrict: number
  user: User
  tags: Tag[]
  tools: string[]
  create_date: string
  page_count: number
  width: number
  height: number
  sanity_level: number
  x_restrict: number
  series: Series | null
  meta_single_page: MetaSinglePage
  meta_pages: MetaPage[]
  total_view: number
  total_bookmarks: number
  is_bookmarked: boolean
  visible: boolean
  is_muted: boolean
  illust_ai_type: number
  illust_book_style: number
  restriction_attributes?: string[]
}

interface PixivRank {
  illusts: Illust[]
  next_url: string
  status: number
}

// 定义排行榜响应接口
interface PixivRankResponse {
  api: PixivRank
  apiTime: number
  status: boolean
  msg?: string
  description?: string
}

// 定义排行榜错误响应接口
interface PixivRankErrorResponse {
  api: PixivRank
  apiTime: number
  status: false
  msg: string
  description: string
}

// 定义排行榜请求参数接口
interface PixivRankParams {
  type: string
  mode:
    | 'day'
    | 'week'
    | 'month'
    | 'day_male'
    | 'day_female'
    | 'week_original'
    | 'week_rookie'
    | 'day_ai'
    | 'day_manga'
    | 'week_manga'
    | 'month_manga'
    | 'week_rookie_manga'
    | 'day_r18'
    | 'day_male_r18'
    | 'day_female_r18'
    | 'week_r18'
    | 'week_r18g'
    | 'day_r18_ai'
    | 'day_r18_manga'
    | 'week_r18_manga'
  page: number
  date: string
  size?: number
}

interface PixivShow {
  illusts: Illust
}

interface PixivShowResponse
  extends Pick<PixivRankResponse, 'apiTime' | 'status' | 'msg' | 'description'> {
  api: PixivShow
}

export type {
  Illust,
  PixivRankResponse,
  PixivRankErrorResponse,
  PixivRankParams,
  PixivRank,
  PixivShowResponse,
}
