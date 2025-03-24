import { IconBrandGithub } from '@tabler/icons-react';
import { ReactElement } from 'react';

export interface ReferenceLink {
  url: string;
  text: string | ReactElement;
}

export const referenceDescLinks: ReferenceLink[] = [
  {
    url: '',
    text: '该项目的数据是基于Pixiv的API进行开发的，旨在提供一个方便的工具来查看和下载Pixiv上的图片。',
  },
  {
    url: 'https://github.com/inokoe/MixUI-Pixiv-Viewer',
    text: (
      <div className="flex items-center gap-2">
        <IconBrandGithub className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        https://github.com/inokoe/MixUI-Pixiv-Viewer
      </div>
    ),
  },
];

export const referenceThanksLinks: ReferenceLink[] = [
  {
    url: 'https://github.com/mixmoe/HibiAPI',
    text: 'Pixiv Api : https://github.com/mixmoe/HibiAPI',
  },
  {
    url: 'https://github.com/journey-ad/pixiv-viewer',
    text: '✨ Pixiv Viewer : https://github.com/journey-ad/pixiv-viewer',
  },
  {
    url: 'https://github.com/asadahimeka/pixiv-viewer',
    text: '🪐 Pixiv Viewer : https://github.com/asadahimeka/pixiv-viewer',
  },
];
