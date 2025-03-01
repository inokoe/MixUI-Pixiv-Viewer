import { useCallback, useState } from 'react';
import { useRankData, isRankMode } from './useRankData';
import { Illust, PixivRankParams } from '@/api/http/base.types';

interface UseWaterFlowDataProps {
  mode: PixivRankParams['mode'] | 'search' | 'history';
  date: string;
  propData?: Illust[];
  observerFunc?: () => void;
}

export const useWaterFlowData = ({
  mode,
  date,
  propData,
  observerFunc,
}: UseWaterFlowDataProps) => {
  const [page, setPage] = useState<number>(1);

  const rankData = useRankData(mode, date, page);
  const data = !isRankMode(mode) ? propData || [] : rankData || [];
  const lastIndex = data.length - 1;

  // 通知父级组件加载更多数据
  const loadMoreData = useCallback(() => {
    setPage(prev => prev + 1);
    if (observerFunc) {
      observerFunc();
    }
  }, [observerFunc]);

  return {
    data,
    lastIndex,
    loadMoreData,
    page,
  };
};
