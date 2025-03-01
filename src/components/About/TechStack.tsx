import { memo } from 'react';
import PhotoList from './PhotoList';

interface TechStackSection {
  description: string;
  images: string[];
}

const techStacks: TechStackSection[] = [
  {
    description:
      '项目开发基于Vite + React + TypeScript + TailwindCSS + aceternity/Shadcn/radix UI开发；',
    images: [
      '/vite.svg',
      '/react.svg',
      '/ts.svg',
      '/tailwind.svg',
      '/aceternity.webp',
      '/shadcn.svg',
      '/radix-ui.svg',
    ],
  },
  {
    description: '反向代理以及图片代理服务由Vercel、Cloudflare提供；',
    images: ['vercel.svg', 'cf.svg', 'cfworker.svg'],
  },
];

const TechStack = memo(() => {
  return (
    <div className="space-y-4">
      {techStacks.map((stack, index) => (
        <div key={index}>
          {stack.description}
          <PhotoList list={stack.images} />
        </div>
      ))}
    </div>
  );
});

TechStack.displayName = 'TechStack';

export default TechStack;
