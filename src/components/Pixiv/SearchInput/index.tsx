import { cn } from '@/lib/utils';
import router from '@/router';
import { PlaceholdersAndVanishInput } from '@components/ui/placeholders-and-vanish-input';
import { memo, useCallback, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

/**
 * 搜索输入组件的属性接口
 */
interface Props {
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 搜索输入组件
 * 提供动态占位符和消失效果的搜索输入框
 * 支持搜索历史和默认搜索建议
 */
const MyPlaceholdersAndVanishInput = memo<Props>(({ className }) => {
  // 默认的搜索建议
  const defaultPlaceholders = useMemo(
    () => ['千与千寻 👘', '天空之城 🌤️', '龙猫 🐼', '哈尔的移动城堡 🏰'],
    []
  );

  // 获取路由参数和路径
  const { word } = useParams();
  const path = useLocation().pathname;

  /**
   * 根据当前路径和搜索词动态生成占位符
   * 如果在搜索页面且有搜索词，显示当前搜索词
   * 否则显示默认建议
   */
  const placeholders = useMemo(() => {
    if (path.includes('search') && word?.trim()) {
      return [word.trim()];
    }
    return defaultPlaceholders;
  }, [path, word, defaultPlaceholders]);

  /**
   * 处理输入变化
   * 当前仅返回事件对象，可扩展为实现输入建议等功能
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    return e;
  }, []);

  /**
   * 处理搜索提交
   * 阻止默认表单提交行为
   * 获取搜索词并导航到搜索结果页面
   */
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = new FormData(e.target as HTMLFormElement).get(
      'search'
    ) as string;
    if (search?.trim()) {
      router.navigate(`/search/${search.trim()}`);
    }
  }, []);

  return (
    <div
      className={cn(
        'h-[40rem] flex flex-col justify-center items-center px-4',
        className
      )}
      role="search"
      aria-label="Pixiv 作品搜索"
    >
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
});

MyPlaceholdersAndVanishInput.displayName = 'MyPlaceholdersAndVanishInput';

export default MyPlaceholdersAndVanishInput;
