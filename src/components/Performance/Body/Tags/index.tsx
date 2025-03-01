import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useParams, useNavigate } from 'react-router-dom';

type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
}) => {
  const navigate = useNavigate();
  const path = useParams().tab;
  const [active, setActive] = useState<Tab>(
    path ? propTabs.find(tab => tab.value === path) || propTabs[0] : propTabs[0]
  );

  useEffect(() => {
    const newActiveTab = path
      ? propTabs.find(tab => tab.value === path) || propTabs[0]
      : propTabs[0];
    setActive(newActiveTab);
  }, [path, propTabs]);

  const moveSelectedTabToTop = useCallback(
    (idx: number) => {
      const newTabs = [...propTabs];
      const selectedTab = newTabs.splice(idx, 1);
      newTabs.unshift(selectedTab[0]);
      setActive(newTabs[0]);
      navigate(`/performance/${newTabs[0].value}`, { replace: true });
    },
    [propTabs, navigate]
  );

  return (
    <>
      <div
        className={cn(
          'flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible max-w-full w-full',
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => moveSelectedTabToTop(idx)}
            className={cn('relative px-4 py-2 rounded-full', tabClassName)}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={cn(
                  'absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full',
                  activeTabClassName
                )}
              />
            )}
            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-5 overflow-y-scroll scrollbar-hide overflow-x-hidden flex-1">
        {active.content}
      </div>
    </>
  );
};
