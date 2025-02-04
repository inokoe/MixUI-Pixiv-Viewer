import { SidebarLink } from '../ui/sidebar'
import SkeletonImage from '@/components/common/Image/SkeletonImage'
import MyHoverBorderGradient from '@components/common/HoverBorderGradient'
import DarkModelSwitch from './DarkModelSwitch'
import { IconBrightnessUp } from '@tabler/icons-react'

const SideBarFooter = () => {
  // Vite注入变量，在vite.config.ts中定义
  const appVersion: string = `Version ${__APP_VERSION__}`

  return (
    <div className='overflow-hidden flex flex-col justify-center space-y-2'>
      <SidebarLink
        labelNode={<DarkModelSwitch className='h-6' />}
        link={{
          id: 100,
          label: '',
          href: '#',
          icon: (
            <IconBrightnessUp className='text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0' />
          ),
        }}
      />
      <SidebarLink
        labelNode={
          <MyHoverBorderGradient
            text={appVersion}
            className='h-6'
          />
        }
        link={{
          id: 101,
          label: '',
          href: '#',
          icon: (
            <div className='h-6 w-6 flex-shrink-0 rounded-full overflow-hidden animate-hysteria2-wiggle'>
              <SkeletonImage src='/vite.svg' />
            </div>
          ),
        }}
      />
    </div>
  )
}

export default SideBarFooter
