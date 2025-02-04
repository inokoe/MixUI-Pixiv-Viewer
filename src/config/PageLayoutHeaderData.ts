const PageLayoutHeaderData = [
  {
    id: 1,
    label: '推荐',
    path: '/',
    children: [],
    show: true,
  },
  {
    id: 2,
    label: '排行榜',
    path: '/rank',
    show: true,
    children: [
      {
        id: 21,
        label: '日榜',
      },
      {
        id: 22,
        label: '周榜',
      },
      {
        id: 23,
        label: '月榜',
      },
    ],
  },
  {
    id: 3,
    label: '搜索',
    path: '/search',
    show: true,
  },
  {
    id: 4,
    path: '#',
    label: '查看',
    show: false,
  },
]

export const RankTags = [
  {
    id: 0,
    zh: '榜单',
    en: 'Rank',
    path: '#',
  },
  {
    id: 1,
    zh: '日榜',
    en: 'day',
    path: '/rank/day',
  },
  {
    id: 'week',
    zh: '周榜',
    en: 'week',
    path: '/rank/week',
  },
  {
    id: 'month',
    zh: '月榜',
    en: 'month',
    path: '/rank/month',
  },
]

// 搜索模式选项
export const SearchModeOptions = [
  {
    id: 1,
    name: '匹配',
    key: 'mode',
    options: [
      {
        id: 10,
        value: 'partial_match_for_tags',
        label: '标签部分一致',
        description: '搜索包含输入关键词的标签',
      },
      {
        id: 11,
        value: 'exact_match_for_tags',
        label: '标签完全一致',
        description: '搜索与输入完全匹配的标签',
      },
      {
        id: 12,
        value: 'title_and_caption',
        label: '标题说明文',
        description: '搜索作品标题和说明文',
      },
    ],
  },
  {
    id: 2,
    name: '排序',
    key: 'order',
    options: [
      {
        id: 20,
        value: 'date_desc',
        label: '最新发布',
        description: '按发布时间从新到旧排序',
      },
      {
        id: 21,
        value: 'date_asc',
        label: '最早发布',
        description: '按发布时间从旧到新排序',
      },
      {
        id: 22,
        value: 'popular_desc',
        label: '最受欢迎',
        description: '按受欢迎程度排序',
      },
    ],
  },
  {
    id: 3,
    name: '时间',
    key: 'duration',
    options: [
      {
        id: 30,
        value: 'within_last_day',
        label: '一天内',
        description: '仅显示最近24小时内的作品',
      },
      {
        id: 31,
        value: 'within_last_week',
        label: '一周内',
        description: '仅显示最近一周内的作品',
      },
      {
        id: 32,
        value: 'within_last_month',
        label: '一个月内',
        description: '仅显示最近一个月内的作品',
      },
    ],
  },
]

export default PageLayoutHeaderData
