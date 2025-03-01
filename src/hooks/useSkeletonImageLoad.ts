import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setImageLoadInfo } from '@/store/reducers/performance';
import { MyNProgress } from '@/lib/utils';

interface UseSkeletonImageLoadProps {
  src: string;
  isObserver: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  imageObserver: IntersectionObserver;
}

const useSkeletonImageLoad = ({
  src,
  isObserver,
  containerRef,
  imageObserver,
}: UseSkeletonImageLoadProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  // 处理图片加载完成事件
  const handleImageLoaded = useCallback(
    (e: CustomEvent) => {
      if (e.detail.success) {
        setLoading(true);
      }
      // 只记录非base64图片的加载信息
      if (!src.includes('base64')) {
        dispatch(
          setImageLoadInfo({
            imageLoadTime: e.detail.time,
            success: e.detail.success ? 1 : 0,
            error: e.detail.success ? 0 : 1,
          })
        );
      }
      // 图片加载完成后立即移除事件监听器
      const container = containerRef.current;
      if (container) {
        container.removeEventListener(
          'imageLoaded',
          handleImageLoaded as EventListener
        );
      }
    },
    [src, dispatch, containerRef]
  );

  // 设置图片懒加载和加载事件监听
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isObserver) return;

    container.addEventListener(
      'imageLoaded',
      handleImageLoaded as EventListener
    );
    imageObserver.observe(container);

    return () => {
      container.removeEventListener(
        'imageLoaded',
        handleImageLoaded as EventListener
      );
      imageObserver.unobserve(container);
    };
  }, [containerRef]);

  // 处理非懒加载的情况
  useEffect(() => {
    if (!isObserver) {
      MyNProgress.start();
      const img = containerRef.current?.querySelector('img');
      if (img) {
        img.addEventListener('load', () => {
          setLoading(true);
          MyNProgress.done();
        });
      }
    }
  }, [isObserver]);

  return {
    isLoading,
    setLoading,
  };
};

export default useSkeletonImageLoad;
