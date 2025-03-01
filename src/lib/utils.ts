import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function concurrentRun<T>(
  tasks: (() => Promise<T>)[],
  maxConcurrent = 3
): Promise<T[]> {
  const results: T[] = [];
  const running: Promise<void>[] = [];

  for (const task of tasks) {
    if (running.length >= maxConcurrent) {
      await Promise.race(running);
    }

    const promise = task().then(result => {
      results.push(result);
      running.splice(running.indexOf(promise), 1);
    });
    running.push(promise);
  }

  await Promise.allSettled(running);
  return results;
}

// 全局配置
export const MyNProgress = NProgress.configure({
  minimum: 0.1,
  showSpinner: false,
  easing: 'ease',
  speed: 500,
});
