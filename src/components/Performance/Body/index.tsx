import { Tabs } from '@/components/Performance/Body/Tags';
import MyLineChart from '@/components/Performance/Charts/MyLineChart';
import { ChartConfig } from '@/components/ui/chart';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import PerformanceIp from '../Ip';
import { useEffect, useMemo } from 'react';
import getIp from '@/api/http/ip';
import { setIpInfo } from '@/store/reducers/performance';
import H1Title from '@/components/common/Text/H1Title';

const selectImagePerformanceData = createSelector(
  (state: RootState) => state.performance.imageLoadInfo,
  imageLoadInfo => ({
    chartData: imageLoadInfo.imageLoadTimeList.map((item, index) => ({
      id: index.toString(),
      UseTime: item,
      AvgTime: imageLoadInfo.imageLoadTimeAvg,
      SuccessRate: (
        (imageLoadInfo.successCount /
          (imageLoadInfo.successCount + imageLoadInfo.errorCount)) *
        100
      ).toFixed(2),
    })),
    chartConfig: {
      UseTime: {
        label: '加载耗时',
        color: 'hsl(var(--chart-1))',
      },
      AvgTime: {
        label: '平均耗时',
        color: 'hsl(var(--chart-2))',
      },
      SuccessRate: {
        label: '成功率',
        color: 'hsl(var(--chart-3))',
      },
    } as ChartConfig,
  })
);

const selectInterfacePerformanceData = createSelector(
  (state: RootState) => state.performance.apiLoadInfo,
  apiLoadInfo => ({
    chartData: apiLoadInfo.serverLoadTimeList.map((item, index) => ({
      id: index.toString(),
      UseTime: item,
      AvgTime: apiLoadInfo.serverLoadTimeAvg,
      ProxyUseTime: apiLoadInfo.apiProxyLoadTimeList[index],
      AvgProxyUseTime: apiLoadInfo.apiProxyLoadTimeAvg,
      AvgRequestServerTime: item - apiLoadInfo.apiProxyLoadTimeList[index],
    })),
    chartConfig: {
      UseTime: {
        label: '加载耗时',
        color: 'hsl(var(--chart-1))',
      },
      AvgTime: {
        label: '平均耗时',
        color: 'hsl(var(--chart-2))',
      },
      ProxyUseTime: {
        label: '服务器耗时',
        color: 'hsl(var(--chart-3))',
      },
      AvgProxyUseTime: {
        label: '平均服务器耗时',
        color: 'hsl(var(--chart-4))',
      },
      AvgRequestServerTime: {
        label: '到达服务端耗时',
        color: 'hsl(var(--chart-5))',
      },
    } as ChartConfig,
  })
);

const TabsContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-auto">{children}</div>;
};

const PerformanceBody = () => {
  const imageData = useSelector(selectImagePerformanceData);
  const interfaceData = useSelector(selectInterfacePerformanceData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchIp = async () => {
      const result = await getIp();
      if (result) {
        dispatch(setIpInfo(result));
      }
    };
    fetchIp();
  }, [dispatch]);

  const tabs = useMemo(
    () => [
      {
        title: '🖼️ 图片性能',
        value: 'image',
        content: (
          <TabsContent>
            <MyLineChart
              className="h-96 w-full"
              chartData={imageData.chartData}
              chartConfig={imageData.chartConfig}
              info={{
                CardTitle: 'Pixiv 图片加载性能',
                CardDescription: '🎯 最近100次请求',
                SubTitle: '图片加载耗时',
                SubDescription: '单位：ms',
              }}
            />
          </TabsContent>
        ),
      },
      {
        title: '⚡️ 接口性能',
        value: 'interface',
        content: (
          <TabsContent>
            <MyLineChart
              className="h-96 w-full"
              chartData={interfaceData.chartData}
              chartConfig={interfaceData.chartConfig}
              info={{
                CardTitle: '接口性能',
                CardDescription: '🎯 请求服务器与反向代理信息',
                SubTitle: '接口加载耗时',
                SubDescription: '单位：ms',
              }}
            />
          </TabsContent>
        ),
      },
      {
        title: '🌍 IP 信息',
        value: 'ip',
        content: (
          <TabsContent>
            <PerformanceIp className="h-[30rem] w-full" />
          </TabsContent>
        ),
      },
    ],
    [imageData, interfaceData]
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <H1Title title="性能监控" />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default PerformanceBody;
