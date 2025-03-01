import request from '@/api/request';
import { PixivRankErrorResponse, PixivShowResponse } from '../base.types';
import {
  handleApiResponse,
  handleApiError,
  showResponseMessage,
  createRequestConfig,
} from '../api-helpers';

const getShow = async (
  id: string
): Promise<PixivShowResponse | PixivRankErrorResponse> => {
  let result: PixivShowResponse | PixivRankErrorResponse;

  try {
    const res = await request(createRequestConfig('/api/pixiv/illust', { id }));
    result = handleApiResponse(res) as
      | PixivShowResponse
      | PixivRankErrorResponse;
  } catch {
    result = handleApiError() as PixivRankErrorResponse;
  }
  showResponseMessage(result);
  return result;
};

export default getShow;
