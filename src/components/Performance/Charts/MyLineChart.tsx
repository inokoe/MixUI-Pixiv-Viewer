'use client';

import { memo, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface ChartDataItem {
  id: string;
  [key: string]: string | number;
}

interface MyLineChartProps {
  info: {
    CardTitle: string;
    CardDescription: string;
    SubTitle: string;
    SubDescription: string;
  };
  chartData: ChartDataItem[];
  chartConfig: ChartConfig;
  className?: string;
}

const MyLineChart = memo(
  ({ info, className, chartData, chartConfig }: MyLineChartProps) => {
    const lines = useMemo(() => {
      return Object.keys(chartConfig).map(key => (
        <Line
          key={key}
          dataKey={key}
          type="monotone"
          stroke={chartConfig[key].color}
          strokeWidth={2}
          dot={false}
        />
      ));
    }, [chartConfig]);

    return (
      <Card>
        <CardHeader>
          <CardTitle>{info.CardTitle}</CardTitle>
          <CardDescription>{info.CardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className={className}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="id"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              {lines}
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                {info.SubTitle} <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {info.SubDescription}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

MyLineChart.displayName = 'MyLineChart';

export default MyLineChart;
