import Skeleton from '@/components/ui/skeleton';
import H2Title from '../Text/H2Title';
import { memo } from 'react';
import { cn } from '@/lib/utils';
const SkeletonLoading = memo(
  ({
    msg,
    className,
    showMsg = false,
  }: {
    msg?: string;
    className?: string;
    showMsg?: boolean;
  }) => {
    return (
      <Skeleton
        className={cn(
          'h-full w-full flex justify-center items-center',
          className
        )}
      >
        {showMsg && (
          <H2Title className="animate-pulse">{msg || '🍉 Loading...'}</H2Title>
        )}
      </Skeleton>
    );
  }
);

SkeletonLoading.displayName = 'SkeletonLoading';

export default SkeletonLoading;
