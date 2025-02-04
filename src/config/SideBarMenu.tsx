import {
  IconPhoto,
  IconSettings,
  IconBrandSpeedtest,
  IconHistory,
  IconBrandGit,
} from '@tabler/icons-react'

const links = [
  {
    id: 1,
    label: 'Pixiv Viewer',
    href: '/',
    icon: <IconPhoto className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />,
  },
  {
    id: 2,
    label: 'Performance',
    href: '/performance',
    icon: (
      <IconBrandSpeedtest className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
  {
    id: 3,
    label: 'History',
    href: '/history',
    icon: <IconHistory className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />,
  },
  {
    id: 4,
    label: 'Settings',
    href: '/setting',
    icon: <IconSettings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />,
  },
  {
    id: 5,
    label: 'About Project',
    href: '/about',
    icon: <IconBrandGit className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />,
  },
]

export default links
