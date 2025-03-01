import ScrollContainer from '@/components/Pixiv/ScrollContainer';
import PageBodyTitle from '@/components/Pixiv/PageBodyTitle';
import WaterFlowContainer from '@/components/Pixiv/WaterFlowContainer';
import { getRankDate } from '@/utils/pixiv/Tools';

const PixivHome = () => {
  return (
    <>
      <PageBodyTitle title={'今日排行榜'} />
      <ScrollContainer mode={'day'} date={getRankDate(1)} />
      <PageBodyTitle title={'推荐'} />
      <WaterFlowContainer mode={'month'} date={getRankDate(1)} />
    </>
  );
};

export default PixivHome;
