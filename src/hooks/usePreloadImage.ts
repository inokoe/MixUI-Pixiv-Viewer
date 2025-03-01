import { startTransition, useEffect } from 'react';

const usePreloadImage = (preload: string, isLoading: boolean) => {
  useEffect(() => {
    if (!preload || !isLoading) return;

    const preloadImg = new Image();

    const preloadImage = () => {
      preloadImg.onload = () => {
        preloadImg.decode().finally(() => {
          preloadImg.onload = null;
        });
      };
      preloadImg.src = preload;
    };

    startTransition(() => {
      preloadImage();
    });

    return () => {
      preloadImg.src = '';
    };
  }, [preload, isLoading]);
};

export default usePreloadImage;
