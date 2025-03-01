import { Illust, PixivRankParams } from '@/api/http/base.types';

export interface rankMark
  extends Pick<PixivRankParams, 'size' | 'page' | 'date'> {
  illusts: Illust[];
}

export interface rankDataPayload
  extends rankMark,
    Pick<PixivRankParams, 'mode' | 'type'> {}

export interface PixivState {
  rank: Record<string, Array<rankMark>>;
  rankInitial: boolean;
  searchParams: SearchParams;
  showHistory: {
    data: Illust[];
    limit: number;
  };
}

// 搜索模式类型
export type SearchModeType =
  | 'partial_match_for_tags'
  | 'exact_match_for_tags'
  | 'title_and_caption';

// 搜索排序类型
export type SearchSortType = 'date_desc' | 'date_asc' | 'popular_desc';

// 搜索时间范围类型
export type SearchDurationType =
  | 'within_last_day'
  | 'within_last_week'
  | 'within_last_month';

// 搜索参数类型
// https://api.obfs.dev/docs#tag/Pixiv/operation/search_api_pixiv_search_get
export interface SearchParams {
  word?: string;
  originWord?: string;
  mode?: SearchModeType;
  order?: SearchSortType;
  page?: number;
  duration?: SearchDurationType;
  size?: number;
  include_translated_tag_results?: boolean;
  search_ai_type?: boolean;
  start_date?: string;
  end_date?: string;
}
