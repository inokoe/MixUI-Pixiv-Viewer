import { useSidebarMenu } from '@/hooks/useSidebarMenu';
import PageLayout from '../Layout/PageLayout';
import PerformanceBody from '@/components/Performance/Body';
import { useNProgress } from '@/hooks/useNProgress';

const Performance = () => {
  useNProgress();
  useSidebarMenu(2);
  return (
    <PageLayout>
      <>
        <PerformanceBody />
      </>
    </PageLayout>
  );
};
export default Performance;
