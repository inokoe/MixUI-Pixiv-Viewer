import { IpResponse } from '@/api/http/ip/types';

/** 图片质量等级 */
export type QualityLevel = 'high' | 'mid' | 'low';

/** 图片加载信息接口 */
export interface ImageLoadInfo {
  /** 加载成功次数 */
  successCount: number;
  /** 加载失败次数 */
  errorCount: number;
  /** 图片加载时间列表 */
  imageLoadTimeList: number[];
  /** 图片加载平均时间 */
  imageLoadTimeAvg: number;
  /** 列表长度限制 */
  listLimit: number;
  /** 最后更新时间 */
  lastUpdateTime: number;
}

/** API代理加载信息接口 */
export interface ApiProxyLoadInfo {
  /** API代理加载时间列表 */
  apiProxyLoadTimeList: number[];
  /** API代理加载平均时间 */
  apiProxyLoadTimeAvg: number;
  /** API代理状态码列表 */
  apiProxyStatusCodeList: number[];
  /** 服务器状态码列表 */
  serverStatusCodeList: number[];
  /** 服务器加载时间列表 */
  serverLoadTimeList: number[];
  /** 服务器加载平均时间 */
  serverLoadTimeAvg: number;
  /** 列表长度限制 */
  listLimit: number;
}

/** 性能状态接口 */
export interface PerformanceState {
  /** 图片加载信息 */
  imageLoadInfo: ImageLoadInfo;
  /** API加载信息 */
  apiLoadInfo: ApiProxyLoadInfo;
  /** 图片加载质量设置 */
  imageLoadQuality: {
    quality: QualityLevel;
  };
  /** IP信息 */
  ipInfo: IpResponse;
}

/** 图片加载信息更新载荷 */
export interface ImageLoadPayload {
  /** 图片加载时间 */
  imageLoadTime: number;
  /** 成功次数增量 */
  success: number;
  /** 失败次数增量 */
  error: number;
}

/** API加载信息更新载荷 */
export interface ApiLoadPayload {
  /** API代理加载时间 */
  apiProxyLoadTimeList: number;
  /** API代理状态码 */
  apiProxyStatusCodeList: number;
  /** 服务器状态码 */
  serverStatusCodeList: number;
  /** 服务器加载时间 */
  serverLoadTimeList: number;
}
