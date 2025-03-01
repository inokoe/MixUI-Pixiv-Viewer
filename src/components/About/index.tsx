import { memo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ReferenceLinks from './ReferenceLinks';
import TechStack from './TechStack';
import { IconHome, IconBuildingFactory2, IconRun } from '@tabler/icons-react';

/**
 * 关于页面主体组件
 * 使用手风琴组件展示项目信息、技术栈和鸣谢
 */

interface AccordionSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

const accordionSections: AccordionSection[] = [
  {
    id: 'item-1',
    title: '关于该项目',
    icon: <IconHome className="w-4 h-4" />,
    content:
      '该项目的数据是基于Pixiv的API进行开发的，旨在提供一个方便的工具来查看和下载Pixiv上的图片。',
    defaultOpen: true,
  },
  {
    id: 'item-2',
    title: '开发组件',
    icon: <IconBuildingFactory2 className="w-4 h-4" />,
    content: <TechStack />,
  },
  {
    id: 'item-3',
    title: '鸣谢',
    icon: <IconRun className="w-4 h-4" />,
    content: <ReferenceLinks />,
  },
];

const AboutBody = memo(() => {
  return (
    <Accordion
      type="multiple"
      defaultValue={accordionSections.map(section => section.id)}
      className="w-full"
    >
      {accordionSections.map(section => (
        <AccordionItem
          key={section.id}
          value={section.id}
          data-state={section.defaultOpen ? 'open' : undefined}
        >
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              {section.icon}
              <span>{section.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>{section.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
});

AboutBody.displayName = 'AboutBody';

export default AboutBody;
