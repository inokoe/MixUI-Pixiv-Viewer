import { AxiosResponse, AxiosRequestConfig } from 'axios';
import {
  PixivRankResponse,
  PixivRankErrorResponse,
  PixivShowResponse,
} from './base.types';
import store from '@/store';
import { toastMsg } from '@/utils/pixiv/Tools';

export const createErrorResponse = (
  msg: string,
  description: string
): PixivRankErrorResponse => ({
  api: {
    illusts: [],
    next_url: '',
    status: NaN,
  },
  apiTime: -1,
  status: false,
  msg,
  description,
});

export const createRequestConfig = <T extends object>(
  url: string,
  params: T
): AxiosRequestConfig => ({
  url,
  method: 'get',
  params,
  paramsSerializer: {
    serialize: params => {
      return Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&');
    },
  },
});

export const handleApiResponse = (
  res: AxiosResponse
): PixivRankResponse | PixivShowResponse | PixivRankErrorResponse => {
  if (
    res.status === 200 &&
    res.data.status === true &&
    !res.data.api.error &&
    res.data.api.illusts
  ) {
    if (res.data.api.illusts.length > 0) {
      const isSafeMode = store.getState().setting.safeMode.checked;
      if (isSafeMode) {
        return RankSearchSafeMode(res.data) as PixivRankResponse;
      }
      return res.data as PixivRankResponse;
    } else if (typeof res.data.api.illusts === 'object') {
      return res.data as PixivShowResponse;
    }
  }
  return createErrorResponse(
    '数据返回失败',
    '代理服务器已经连接，但返回了未知的结果'
  );
};

export const handleApiError = (): PixivRankErrorResponse => {
  return createErrorResponse(
    '网络连接错误',
    '网络未连接，或代理服务器无法连接'
  );
};

export const showResponseMessage = (
  result: PixivRankResponse | PixivShowResponse | PixivRankErrorResponse
) => {
  if (result.msg) {
    toastMsg(result.msg, result.description);
  }
};

const RankSearchSafeMode = (result: PixivRankResponse) => {
  if (Array.isArray(result.api.illusts) && result.api.illusts.length > 0) {
    const filterIllusts = result.api.illusts.filter(
      item => !JSON.stringify(item.tags).includes('R-18')
    );
    return {
      ...result,
      api: {
        ...result.api,
        illusts: filterIllusts,
      },
    };
  }
  return result;
};
