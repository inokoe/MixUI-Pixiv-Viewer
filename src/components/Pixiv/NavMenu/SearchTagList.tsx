'use client';

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setClearSearchParams,
  setSearchParams,
} from '@/store/reducers/pixiv/index';
import { SearchParams } from '@/store/reducers/pixiv/types';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import DateRangePicker from './DateRangePicker';
import { SearchModeOptions } from '@/config/PageLayoutHeaderData';
import { RootState } from '@/store';
import { toastMsg } from '@/utils/pixiv/Tools';

export function SearchTagList() {
  const searchParams = useSelector(
    (state: RootState) => state.pixiv.searchParams
  );
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(setClearSearchParams());
    toastMsg('参数重置', '搜索参数已重置');
  };
  return (
    <NavigationMenu className="z-50 mb-2 w-full">
      <NavigationMenuList className="w-full">
        {SearchModeOptions.map(item => (
          <NavigationMenuItem key={item.id} className="">
            <NavigationMenuTrigger className="dark:bg-transparent p-2">
              {item.key in searchParams ? '*' : ''}
              {item.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-4 w-[250px]  ">
                {item.options.map(option => (
                  <ListItem
                    key={option.id}
                    title={item.name}
                    label={option.label}
                    value={{ [item.key]: option.value }}
                  >
                    {option.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem className="">
          <DateRangePicker />
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <div
            onClick={handleReset}
            className="flex justify-center items-center pl-2 cursor-pointer text-sm whitespace-nowrap"
          >
            重置
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  title: string;
  label: string;
  value: { [key: string]: string };
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, ListItemProps>(
  ({ className, title, label, children, value, ...props }, ref) => {
    const dispatch = useDispatch();
    const key = Object.keys(value)[0];
    const isSelected = useSelector(
      (state: RootState) => state.pixiv.searchParams[key as keyof SearchParams]
    );
    const handleClick = () => {
      dispatch(setSearchParams(value));
      toastMsg(`${title}规则已更新`, `${label}`);
    };
    return (
      <li onClick={handleClick}>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
              isSelected === value[key]
                ? 'bg-accent text-accent-foreground'
                : ''
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{label}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export default SearchTagList;
