import { memo } from 'react';
import PageLayout from '../Layout/PageLayout';
import H1Title from '@/components/common/Text/H1Title';
import PageBodyFooter from '@/components/Pixiv/PageBodyFooter';
import SettingBody from '@/components/Setting';
import { useSidebarMenu } from '@/hooks/useSidebarMenu';

/**
 * 设置页面组件
 * 包含页面标题、设置主体和页脚
 */
const Setting = memo(() => {
  useSidebarMenu(4);
  return (
    <PageLayout>
      {/* 页面标题 */}
      <H1Title title="设置" />

      {/* 设置主体内容 */}
      <div className="flex items-center justify-center w-full p-0 lg:p-8 pt-5">
        <div className="flex items-center justify-center w-full p-0 lg:w-3/4 pt-5">
          <SettingBody />
        </div>
      </div>

      {/* 页面页脚 */}
      <PageBodyFooter />
    </PageLayout>
  );
});

Setting.displayName = 'Setting';

export default Setting;
