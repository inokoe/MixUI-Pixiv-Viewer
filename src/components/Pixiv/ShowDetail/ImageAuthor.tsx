import { IconId, IconUser } from '@tabler/icons-react';
import { memo } from 'react';
import SkeletonImage from '@/components/common/Image/SkeletonImage';
import { Illust } from '@/api/http/base.types';

const ImageAuthor = memo(({ user }: { user: Illust['user'] }) => {
  return (
    <div className="w-full flex gap-3 items-center">
      <div className="h-8 w-8 rounded-full overflow-hidden">
        <SkeletonImage src={user.profile_image_urls.medium} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <IconUser className="w-4 h-4" />
            {user.name}
          </div>
          <div className="flex items-center gap-1">
            <IconId className="w-4 h-4" />
            {user.id}
          </div>
        </div>
      </div>
    </div>
  );
});

ImageAuthor.displayName = 'ImageAuthor';

export default ImageAuthor;
