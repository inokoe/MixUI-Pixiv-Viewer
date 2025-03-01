import {
  Illust,
  PixivRankErrorResponse,
  PixivRankResponse,
} from '@/api/http/base.types';
import getSearch from '@/api/http/search';
import { HeroHighlightDemo } from '@/components/Pixiv/HeroHighlight';
import WaterFlowContainer from '@/components/Pixiv/WaterFlowContainer';
import { MyNProgress } from '@/lib/utils';
import store, { RootState } from '@/store';
import { setSearchParams } from '@/store/reducers/pixiv';
import { SearchParams } from '@/store/reducers/pixiv/types';
import { deduplicateById, getRankDate, toastMsg } from '@/utils/pixiv/Tools';
import { useEffect, useState, useCallback, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/**
 * 获取搜索结果，包含重试逻辑
 * @param params 搜索参数
 * @returns 搜索结果
 */
const getSearchParams = async (params: SearchParams) => {
  let maxRetry = 3;
  let response: PixivRankResponse | PixivRankErrorResponse | undefined;

  while (maxRetry > 0) {
    const result = await getSearch(params);
    response = result;

    if ('illusts' in result.api && result.api.illusts.length > 0) {
      return response;
    }

    toastMsg('请求失败', '⚠️将在1秒后重试');

    maxRetry--;

    if (maxRetry <= 0) {
      toastMsg('请求次数限制', '⚠️无法获取更多数据，可能已经全部加载了喔');
      break;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // 返回一个空的响应对象
  return {
    api: {
      illusts: [],
      next_url: '',
      status: 200,
    },
    apiTime: Date.now(),
    status: false,
    msg: '无搜索结果',
    description: '未找到相关作品',
  } as PixivRankErrorResponse;
};

/**
 * Pixiv搜索页面组件
 * 处理搜索逻辑和结果展示
 */
const PixivSearch = memo(() => {
  const dispatch = useDispatch();
  const searchParams = useSelector(
    (state: RootState) => state.pixiv.searchParams
  );
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Illust[]>([]);
  const { word } = useParams();
  const waterFlowContainerRef = useRef<HTMLDivElement>(null);
  const initalFuncMark = useRef(true);

  // 获取搜索数据
  const getData = useCallback(async () => {
    MyNProgress.start();

    // 获取最新的搜索参数
    let updatedParams = store.getState().pixiv.searchParams;
    let currentIsLoading = false;

    setIsLoading(prev => {
      currentIsLoading = prev;
      return prev;
    });

    // 处理加载更多的情况
    if (currentIsLoading) {
      if (updatedParams.page) {
        await dispatch(setSearchParams({ page: updatedParams.page + 1 }));
      }
      updatedParams = store.getState().pixiv.searchParams;
    }

    const result = await getSearchParams(updatedParams);
    setIsLoading(true);
    MyNProgress.done();

    return result.api.illusts || [];
  }, [dispatch]);

  // 重置搜索数据
  const resetData = useCallback(() => {
    setIsLoading(false);
    setData([]);
  }, []);

  // 初始化搜索数据
  const initalData = useCallback(
    async (realWord: string) => {
      resetData();
      await dispatch(setSearchParams({ word: realWord, page: 1 }));
      const result = await getData();
      setData(result);

      // 滚动到顶部
      if (waterFlowContainerRef.current) {
        waterFlowContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [getData]
  );

  // 加载更多数据
  const loadMoreData = useCallback(async () => {
    const result = await getData();
    setData(prev => deduplicateById(prev, result));
  }, [getData]);

  // 处理搜索词变化
  useEffect(() => {
    const realWord = word?.trim();
    if (!realWord) return;

    if (initalFuncMark.current || isLoading) {
      initalFuncMark.current = false;
      initalData(realWord);
    }
  }, [word]);

  // 处理搜索参数变化
  useEffect(() => {
    if (searchParams.word && word && searchParams.word.includes(word)) {
      initalData(word);
    }
  }, [
    searchParams.mode,
    searchParams.order,
    searchParams.duration,
    searchParams.start_date,
    searchParams.end_date,
  ]);

  return (
    <div className="w-full h-full flex rounded-2xl">
      {/* 未加载时显示高亮效果 */}
      {!isLoading && (
        <div className="flex-1 flex justify-center items-center w-full rounded-2xl overflow-hidden">
          <HeroHighlightDemo />
        </div>
      )}

      {/* 加载完成后显示搜索结果 */}
      {isLoading && (
        <div
          ref={waterFlowContainerRef}
          className="flex-1 flex w-full rounded-2xl overflow-auto scrollbar-hide"
        >
          <WaterFlowContainer
            mode="search"
            date={getRankDate(1)}
            propData={data}
            observerFunc={loadMoreData}
          />
        </div>
      )}
    </div>
  );
});

PixivSearch.displayName = 'PixivSearch';

export default PixivSearch;
