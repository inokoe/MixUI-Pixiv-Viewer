import { Illust } from '@/api/http/base.types';
import { memo } from 'react';

const ImageTagList = memo(({ tags }: { tags: Illust['tags'] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <div
          key={tag.name}
          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
});

ImageTagList.displayName = 'ImageTagList';

export default ImageTagList;
