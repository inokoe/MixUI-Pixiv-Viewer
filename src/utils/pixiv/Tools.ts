import dayjs from 'dayjs'
import dayjsTz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/zh-cn'

dayjs.extend(utc)
dayjs.extend(dayjsTz)
dayjs.locale('zh-cn')

// 获取排行榜日期
export const getRankDate = (time: number) => {
  const now = dayjs()
  if (time > 1) {
    return now.subtract(time, 'day').format('YYYY-MM-DD')
  }
  const noon = now.hour() >= 12
  return noon
    ? now.subtract(1, 'day').format('YYYY-MM-DD')
    : now.subtract(2, 'day').format('YYYY-MM-DD')
}

export const buildFullPath = (path: string, params: object) => {
  // 替换路径中的参数占位符
  return Object.entries(params).reduce((acc, [_, value]) => {
    return acc + `/${value}`
  }, path)
}

// 根据id去重的函数
export const deduplicateById = <T extends { id: number }>(oldData: T[], newData: T[]): T[] => {
  const seen = new Set(oldData.map(item => item.id))
  const uniqueNewData = newData.filter(item => !seen.has(item.id))
  return [...oldData, ...uniqueNewData]
}
