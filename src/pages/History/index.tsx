import H1Title from '@/components/common/Text/H1Title';
import PageLayout from '../Layout/PageLayout';
import PageBodyFooter from '@/components/Pixiv/PageBodyFooter';
import PageBodyTitle from '@/components/Pixiv/PageBodyTitle';
import H2Title from '@/components/common/Text/H2Title';
import { memo, useMemo } from 'react';
import Skeleton from '@/components/ui/skeleton';
import { useSelector } from 'react-redux';
import { RootReducer } from '@/store';
import WaterFlowContainer from '@/components/Pixiv/WaterFlowContainer';
import { getRankDate } from '@/utils/pixiv/Tools';
import { useSidebarMenu } from '@/hooks/useSidebarMenu';

const NoMoreHistory = memo(() => {
  return (
    <Skeleton className="h-full w-full flex justify-center items-center">
      <H2Title className="animate-pulse">🍉 没有浏览记录...</H2Title>
    </Skeleton>
  );
});

const History = memo(() => {
  const rawData = useSelector(
    (state: RootReducer) => state.pixiv.showHistory.data
  );
  const isDevMode = useSelector(
    (state: RootReducer) => state.setting.developmentMode.checked
  );

  const filteredData = useMemo(() => {
    if (!rawData) return null;
    return isDevMode
      ? rawData.filter(item => item.title === 'DevMode')
      : rawData;
  }, [isDevMode, rawData]);

  useSidebarMenu(3);
  return (
    <PageLayout>
      <H1Title title="History" />
      <PageBodyTitle title={'最近50条记录'} />

      <div className="w-full flex-1 overflow-y-scroll overflow-x-hidden flex flex-col scrollbar-hide">
        {filteredData && filteredData.length > 0 ? (
          <WaterFlowContainer
            mode="search"
            date={getRankDate(1)}
            propData={filteredData}
          />
        ) : (
          <NoMoreHistory />
        )}

        <PageBodyFooter />
      </div>
    </PageLayout>
  );
});

History.displayName = 'History';

export default History;
