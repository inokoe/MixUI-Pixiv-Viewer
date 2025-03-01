import links from '@/config/SideBarMenu';
import { SidebarLink } from '../ui/sidebar';
import SideBarHeader from './SideBarHeader';
import React from 'react';

interface SideBarMenuProps {
  open: boolean;
}

const SideBarMenu = React.memo(({ open }: SideBarMenuProps) => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <SideBarHeader open={open} />

      <div className="mt-8 flex flex-col gap-2">
        {links.map((link, idx) => (
          <SidebarLink key={idx} link={link} />
        ))}
      </div>
    </div>
  );
});

export default SideBarMenu;
