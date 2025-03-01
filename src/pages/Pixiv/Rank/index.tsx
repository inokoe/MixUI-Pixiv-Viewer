import { PixivRankParams } from '@/api/http/base.types';
import WaterFlowContainer from '@/components/Pixiv/WaterFlowContainer';
import { getRankDate } from '@/utils/pixiv/Tools';
import { useParams } from 'react-router-dom';

const PixivRank = () => {
  const { mode } = useParams();
  return (
    <>
      <WaterFlowContainer
        mode={(mode || 'day') as PixivRankParams['mode']}
        date={getRankDate(1)}
      />
    </>
  );
};

export default PixivRank;
