import { DataContext } from '@/pages/Pixiv/Show/context';
import { useContext } from 'react';
import { memo } from 'react';
import ImageTagList from './ImageTagList';
import ImagePixivLink from './ImagePixivLink';
import ImageStats from './ImageStats';
import ImageTitle from './ImageTitle';
import ImageAuthor from './ImageAuthor';
import Skeleton from '@/components/ui/skeleton';
import RichText from '@/components/common/RichText';
import Divider from '@/components/common/Divider';

const PixivShowDetail = memo(() => {
  const data = useContext(DataContext);
  return data ? (
    <div className="w-full h-full flex flex-col gap-2 p-4 animate-slide-up animate-duration-300 ease-in-out">
      <ImageAuthor user={data.user} />
      <ImageTitle title={data.title} />
      <Divider variant="dotted" thickness="medium" />
      {data.caption && <RichText content={data.caption} className="text-sm" />}
      <ImageTagList tags={data.tags} />
      <ImageStats
        totalView={data.total_view}
        totalBookmarks={data.total_bookmarks}
        createDate={data.create_date}
      />
      <ImagePixivLink id={data.id} />
    </div>
  ) : (
    <Skeleton className="w-full h-full" />
  );
});

PixivShowDetail.displayName = 'PixivShowDetail';

export default PixivShowDetail;
