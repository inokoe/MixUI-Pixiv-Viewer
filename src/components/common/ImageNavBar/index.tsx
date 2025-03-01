import { memo, useCallback } from 'react';
import { IconDownload } from '@tabler/icons-react';
import { toast } from 'sonner';

/**
 * 图片下载导航栏组件
 * @param imgDownloadInfo 包含不同质量图片URL的对象
 */
const ImageNavBar = memo(
  ({
    imgDownloadInfo,
  }: {
    imgDownloadInfo?: { original: string; large: string; medium: string };
  }) => {
    /**
     * 处理图片下载的函数
     * @param url 图片URL
     *
     * 下载流程：
     * 1. 通过 fetch 获取图片数据
     * 2. 转换为 blob 对象
     * 3. 创建临时 URL
     * 4. 通过临时 <a> 标签触发下载
     * 5. 清理临时资源
     */
    const handleDownload = useCallback(
      async (url: string | undefined) => {
        if (!url) return;
        try {
          // 使用 fetch 获取图片数据（支持跨域请求）
          const response = await fetch(url);
          // 将响应数据转换为 Blob 对象（二进制数据）
          const blob = await response.blob();
          // 创建一个指向 blob 数据的临时 URL
          const blobUrl = window.URL.createObjectURL(blob);

          // 创建一个临时的 <a> 标签用于下载
          const a = document.createElement('a');
          a.href = blobUrl;
          // 设置下载文件名（从URL中提取）
          a.download = url.split('/').pop() || 'image';

          // 将临时标签添加到页面并模拟点击
          document.body.appendChild(a);
          a.click();
          // 移除临时标签
          document.body.removeChild(a);

          // 释放 blob URL 占用的内存
          window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
          console.error('Download failed:', error);
          const newWindow = window.open(url, '_blank');
          if (newWindow) {
            toast.info('已在新窗口打开原图，请手动保存图片');
          }
        }
      },
      [imgDownloadInfo]
    );

    return (
      <div className="absolute w-full flex justify-center items-center h-10 bottom-10 left-0 animate-slide-up duration-500 ease-in-out">
        <div className="px-3 py-2 flex items-center gap-4 bg-gray-900/50 rounded-full backdrop-blur-sm">
          {/* 下载图标和文字 */}
          <div className="flex items-center gap-1.5 px-2">
            <IconDownload className="w-4 h-4 text-gray-200" />
            <span className="text-sm font-medium text-gray-200">选项</span>
          </div>
          {/* 分隔线 */}
          <div className="h-4 w-px bg-gray-700/50" />
          {/* 下载质量选项 */}
          <div className="flex items-center gap-2">
            <a
              onClick={() => handleDownload(imgDownloadInfo?.medium)}
              className="px-3 py-1 text-sm font-medium text-gray-300 rounded-full hover:bg-gray-700/50 hover:text-gray-100 transition-all cursor-pointer"
            >
              中等
            </a>
            <a
              onClick={() => handleDownload(imgDownloadInfo?.large)}
              className="px-3 py-1 text-sm font-medium text-gray-300 rounded-full hover:bg-gray-700/50 hover:text-gray-100 transition-all cursor-pointer"
            >
              高清
            </a>
            <a
              onClick={() => handleDownload(imgDownloadInfo?.original)}
              className="px-3 py-1 text-sm font-medium text-gray-300 rounded-full hover:bg-gray-700/50 hover:text-gray-100 transition-all cursor-pointer"
            >
              原图
            </a>
          </div>
        </div>
      </div>
    );
  }
);

ImageNavBar.displayName = 'ImageNavBar';

export default ImageNavBar;
