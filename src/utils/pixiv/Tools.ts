import dayjs from 'dayjs';
import dayjsTz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/zh-cn';
import { Illust } from '@/api/http/base.types';
import { toast } from 'sonner';

dayjs.extend(utc);
dayjs.extend(dayjsTz);
dayjs.locale('zh-cn');

// 获取排行榜日期
export const getRankDate = (time: number) => {
  const now = dayjs();
  if (time > 1) {
    return now.subtract(time, 'day').format('YYYY-MM-DD');
  }
  const noon = now.hour() >= 12;
  return noon
    ? now.subtract(1, 'day').format('YYYY-MM-DD')
    : now.subtract(2, 'day').format('YYYY-MM-DD');
};

export const buildFullPath = (path: string, params: object) => {
  // 替换路径中的参数占位符
  return Object.entries(params).reduce((acc, [_, value]) => {
    return acc + `/${value}`;
  }, path);
};

// 根据id去重的函数
export const deduplicateById = <T extends { id: number }>(
  oldData: T[],
  newData: T[]
): T[] => {
  const seen = new Set(oldData.map(item => item.id));
  const uniqueNewData = newData.filter(item => !seen.has(item.id));
  return [...oldData, ...uniqueNewData];
};

export const isEarlyMorning = () => {
  const now = dayjs().tz('Asia/Shanghai');
  const hour = now.hour();
  return hour >= 8 && hour < 12; // 返回true表示在8:00-12:59之间
};

// 获取当前网站的域名，包括端口号等信息
export const getCurrentDomain = () => {
  return `${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
};

export const getImageSrcLength = (data?: Illust) => {
  if (!data) return 0;
  if (data.meta_pages && data.meta_pages.length > 0) {
    return data.meta_pages.length;
  }
  return 1;
};

export const toastMsg = (msg: string, description?: string) => {
  if (msg) {
    toast(msg, {
      description,
    });
  }
};
