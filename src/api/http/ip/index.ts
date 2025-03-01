import request from '@/api/request';
import { IpResponse } from './types';

async function getIp(): Promise<IpResponse | null> {
  try {
    const result = await request({
      url: `/api/ip`,
      method: 'get',
    });
    // 检查响应状态
    if (result.status === 200) {
      if (
        result.data &&
        (result.data.vercel ||
          (result.data.api && result.data.api.status === 'success'))
      ) {
        return result.data;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export default getIp;
