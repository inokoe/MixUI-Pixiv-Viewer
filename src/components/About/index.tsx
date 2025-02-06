import { memo } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import PhotoList from './PhotoList'

/**
 * 开发相关的技术栈图标配置
 */
const configDev = [
  '/vite.svg',
  '/react.svg',
  '/ts.svg',
  '/tailwind.svg',
  '/aceternity.webp',
  '/shadcn.svg',
  '/radix-ui.svg',
]

/**
 * 服务相关的技术栈图标配置
 */
const configServe = ['vercel.svg', 'cf.svg', 'cfworker.svg']

/**
 * 关于页面主体组件
 * 使用手风琴组件展示项目信息、技术栈和鸣谢
 */
const AboutBody = memo(() => {
  return (
    <Accordion
      type='multiple'
      defaultValue={['item-1', 'item-2', 'item-3']}
      className='w-full'
    >
      {/* 项目介绍部分 */}
      <AccordionItem
        value='item-1'
        data-state='open'
      >
        <AccordionTrigger>🏠 关于该项目</AccordionTrigger>
        <AccordionContent>
          该项目的数据是基于Pixiv的API进行开发的，旨在提供一个方便的工具来查看和下载Pixiv上的图片。
        </AccordionContent>
      </AccordionItem>

      {/* 技术栈展示部分 */}
      <AccordionItem value='item-2'>
        <AccordionTrigger>🧱 开发组件</AccordionTrigger>
        <AccordionContent>
          <div className='space-y-4'>
            <div>
              项目开发基于Vite + React + TypeScript + TailwindCSS + aceternity/Shadcn/radix UI开发；
              <PhotoList list={configDev} />
            </div>
            <div>
              反向代理以及图片代理服务由Vercel、Cloudflare提供；
              <PhotoList list={configServe} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 鸣谢部分 */}
      <AccordionItem value='item-3'>
        <AccordionTrigger>🏃 鸣谢</AccordionTrigger>
        <AccordionContent>
          <div className='space-y-2'>
            <div>
              <a
                href='https://github.com/mixmoe/HibiAPI'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline'
              >
                Pixiv Api : https://github.com/mixmoe/HibiAPI
              </a>
            </div>
            <div>
              <a
                href='https://github.com/journey-ad/pixiv-viewer'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline'
              >
                ✨ Pixiv Viewer : https://github.com/journey-ad/pixiv-viewer
              </a>
            </div>
            <div>
              <a
                href='https://github.com/journey-ad/pixiv-viewer'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline'
              >
                🪐 Pixiv Viewer : https://github.com/asadahimeka/pixiv-viewer
              </a>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
})

AboutBody.displayName = 'AboutBody'

export default AboutBody
