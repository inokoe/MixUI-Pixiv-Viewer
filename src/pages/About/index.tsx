import H1Title from '@/components/common/Text/H1Title';
import PageLayout from '../Layout/PageLayout';
import AboutBody from '@/components/About';
import PageBodyFooter from '@/components/Pixiv/PageBodyFooter';
import { useSidebarMenu } from '@/hooks/useSidebarMenu';
import { memo } from 'react';

const About = memo(() => {
  useSidebarMenu(5);
  return (
    <PageLayout>
      <H1Title title="关于" />
      <div className="w-full p-8 pt-5">
        <AboutBody />
      </div>
      <PageBodyFooter />
    </PageLayout>
  );
});

About.displayName = 'About';

export default About;
