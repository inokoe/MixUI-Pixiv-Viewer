import { memo } from 'react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  /** 子元素 */
  children: React.ReactNode;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 页面布局组件
 * 提供统一的页面容器样式和布局
 * 支持暗色模式和响应式设计
 */
const PageLayout = memo<PageLayoutProps>(({ children, className }) => {
  return (
    <div className="flex h-full w-full overflow-x-hidden" role="main">
      <div
        className={cn(
          // 基础样式
          'flex flex-col gap-1 flex-1 w-full h-full',
          // 内边距和圆角
          'p-2 md:p-5 rounded-tl-2xl',
          // 边框和背景
          'border border-neutral-200 dark:border-neutral-700',
          'bg-white dark:bg-neutral-900',
          // 自定义样式
          className
        )}
        role="region"
        aria-label="Page content"
      >
        {children}
      </div>
    </div>
  );
});

PageLayout.displayName = 'PageLayout';

export default PageLayout;
