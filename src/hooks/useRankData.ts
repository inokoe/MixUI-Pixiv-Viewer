import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { requestNewData } from '@/lib/pixiv/intial';
import { Illust, PixivRankParams } from '@/api/http/base.types';
import { createSelector } from '@reduxjs/toolkit';
import { MyNProgress } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

const selectRankData = createSelector(
  [
    (state: RootState) => state.pixiv.rank,
    (_: RootState, mode: string) => mode,
  ],
  (rankData, mode) => rankData[mode] || []
);

// 类型守卫函数
export const isRankMode = (mode: string): mode is PixivRankParams['mode'] => {
  const rankModes = [
    'day',
    'week',
    'month',
    'day_male',
    'day_female',
    'week_original',
    'week_rookie',
    'day_ai',
    'day_manga',
    'week_manga',
    'month_manga',
    'week_rookie_manga',
    'day_r18',
    'day_male_r18',
    'day_female_r18',
    'week_r18',
    'week_r18g',
    'day_r18_ai',
    'day_r18_manga',
    'week_r18_manga',
  ];
  return rankModes.includes(mode);
};

export const useRankData = (
  mode: string,
  date: string,
  page: number
): Illust[] => {
  const location = useLocation();
  const rankInitial = useSelector(
    (state: RootState) => state.pixiv.rankInitial
  );
  const rankData = useSelector((state: RootState) =>
    selectRankData(state, mode)
  );

  useEffect(() => {
    if (!isRankMode(mode)) return;
    if (!rankInitial) return;

    const hasData = rankData.some(
      item =>
        item.date === date && item.page === page && item.illusts.length > 0
    );
    if (!hasData) {
      (async () => {
        MyNProgress.start();
        await requestNewData(mode, date, page);
        MyNProgress.done();
      })();
    }
  }, [rankInitial, page, location.pathname]);

  if (!isRankMode(mode)) {
    return [];
  }

  return rankData
    .filter(item => item.date === date && item.page <= page)
    .sort((a, b) => a.page - b.page)
    .reduce((acc, item) => {
      acc.push(...item.illusts);
      return acc;
    }, [] as Illust[]);
};
