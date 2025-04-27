'use client';

import * as React from 'react';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip as ChartTooltip,
  ResponsiveContainer
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { BLOG_POSTS } from '@/app/data';

const parseAmount = (amount: string | number): number => {
  if (amount === '-' || !amount) return 0;
  
  let amountStr = typeof amount === 'number' ? amount.toString() : amount;
  
  let value = 0;
  
  amountStr = amountStr.replace(/[$,~]/g, '');
  
  if (amountStr.includes('Million') || amountStr.includes('Millions')) {
    value = parseFloat(amountStr.replace(/(Million|Millions)/i, '').trim()) * 1000000;
  } else if (amountStr.includes('Billion')) {
    value = parseFloat(amountStr.replace(/Billion/i, '').trim()) * 1000000000;
  } else if (amountStr.includes('K')) {
    value = parseFloat(amountStr.replace(/K/i, '').trim()) * 1000;
  } else {
    value = parseFloat(amountStr);
  }
  
  return isNaN(value) ? 0 : value;
};

const processDataByYear = () => {
  const yearlyData: { [year: string]: { incidents: number; valueUSD: number } } = {};
  
  BLOG_POSTS.forEach(post => {
    const dateStr = post.date;
    if (!dateStr) return;
    
    const year = dateStr.substring(0, 4);
    if (!yearlyData[year]) {
      yearlyData[year] = { incidents: 0, valueUSD: 0 };
    }
    
    yearlyData[year].incidents += 1;
    yearlyData[year].valueUSD += parseAmount(post.stolen);
  });
  
  return Object.keys(yearlyData)
    .map(year => ({
      year,
      incidents: yearlyData[year].incidents,
      valueUSD: Math.max(yearlyData[year].valueUSD, 1000)
    }))
    .sort((a, b) => a.year.localeCompare(b.year));
};

const chartData = processDataByYear();

const chartConfig = {
  incidents: {
    label: 'Incidents',
    color: '#3b82f6'
  },
  valueUSD: {
    label: 'Value Lost',
    color: '#10b981'
  }
};

type ChartKey = 'incidents' | 'valueUSD';

export function HackStats() {
  const [activeChart, setActiveChart] = React.useState<ChartKey>('valueUSD');

  const total = React.useMemo(
    () => ({
      incidents: chartData.reduce((acc, curr) => acc + curr.incidents, 0),
      valueUSD: chartData.reduce((acc, curr) => acc + (curr.valueUSD > 1000 ? curr.valueUSD : 0), 0)
    }),
    []
  );

  const chartKeys = ['incidents', 'valueUSD'] as const;

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const formatValue = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  // Function to create custom axis ticks for the log scale
  const formatYAxis = (value: any): string => {
    if (activeChart === 'incidents') {
      return value.toString();
    }
    return formatValue(value);
  };

  // Calculate max value for domain
  const maxValue = React.useMemo(() => {
    if (activeChart === 'incidents') {
      return Math.max(...chartData.map(d => d.incidents)) * 1.2;
    } else {
      return Math.max(...chartData.map(d => d.valueUSD)) * 1.2;
    }
  }, [activeChart, chartData]);

  // Calculate a reasonable minimum value for log scale
  const minValue = React.useMemo(() => {
    if (activeChart === 'incidents') {
      return 0;
    } else {
      // For log scale, find the smallest non-zero value or use 1000
      const min = Math.min(...chartData.filter(d => d.valueUSD > 0).map(d => d.valueUSD));
      return min > 0 ? min / 10 : 1000;
    }
  }, [activeChart, chartData]);

  const CustomTooltipContent = React.useCallback(
    (props: any) => {
      const { active, payload, label } = props;
      
      if (!active || !payload || !payload.length) {
        return null;
      }
      
      const data = payload[0];
      
      return (
        <div className="bg-white dark:bg-zinc-800 px-3 py-2 rounded-md shadow-md border border-zinc-200 dark:border-zinc-700">
          <p className="font-medium text-zinc-900 dark:text-white">{label}</p>
          <p className="text-sm mt-1 text-zinc-600 dark:text-zinc-300">
            {data.name === 'valueUSD' 
              ? formatValue(data.value)
              : `${data.value} incident${data.value !== 1 ? 's' : ''}`}
          </p>
        </div>
      );
    },
    [formatValue]
  );

  if (!isClient) {
    return null;
  }

  return (
    <Card className='@container/card bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm'>
      <CardHeader className='flex items-center justify-between border-b dark:border-zinc-800 px-6 py-4 sm:flex-row'>
        <div>
          <CardTitle className="text-lg font-medium tracking-tight text-zinc-900 dark:text-white">Security Incidents</CardTitle>
        </div>
        <div className='flex gap-2 mt-2 sm:mt-0 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-full'>
          {chartKeys.map(
            (key) => {
              return (
                <button
                  key={key}
                  data-active={activeChart === key}
                  className={`
                    relative px-4 py-1.5 text-sm font-medium text-center rounded-full
                    transition-all duration-200 ease-in-out
                    ${activeChart === key 
                      ? 'text-white bg-zinc-900 dark:bg-zinc-950 shadow-sm transform scale-100' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:dark:text-white transform scale-95 hover:scale-100'
                    }
                  `}
                  onClick={() => setActiveChart(key)}
                >
                  {chartConfig[key].label}
                </button>
              );
            }
          )}
        </div>
      </CardHeader>
      
      <div className="px-6 pt-6 flex justify-between items-baseline">
        <CardDescription className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
          {activeChart === 'incidents' ? 'Total incidents' : 'Total value lost'}
        </CardDescription>
        <div className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white tabular-nums">
          {activeChart === 'incidents'
            ? total[activeChart].toLocaleString()
            : formatValue(total[activeChart])}
        </div>
      </div>
      
      <CardContent className='px-2 pt-6 sm:px-6'>
        <div className='aspect-auto h-[250px] w-full'>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 16,
                bottom: 5
              }}
            >
              <defs>
                <linearGradient id='fillBarIncidents' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='0%'
                    stopColor='#3b82f6' // Tailwind blue-500
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='100%'
                    stopColor='#3b82f6' // Tailwind blue-500
                    stopOpacity={0.2}
                  />
                </linearGradient>
                <linearGradient id='fillBarValue' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='0%'
                    stopColor='#10b981' // Tailwind emerald-500 (green)
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='100%'
                    stopColor='#10b981'
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="4 4" opacity={0.3} />
              <XAxis
                dataKey='year'
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickMargin={8}
                minTickGap={32}
              />
              <YAxis 
                hide={false}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={formatYAxis}
                domain={[activeChart === 'valueUSD' ? 'auto' : 0, 'auto']}
                scale={activeChart === 'valueUSD' ? 'log' : 'linear'}
                allowDataOverflow={true}
              />
              <ChartTooltip
                cursor={{
                  fill:
                    activeChart === 'incidents'
                      ? '#3b82f6'
                      : '#10b981',
                  opacity: 0.1
                }}
                content={<CustomTooltipContent />}
                wrapperStyle={{ zIndex: 1000 }}
              />
              <Bar
                dataKey={activeChart as string}
                fill={
                  activeChart === 'incidents'
                    ? 'url(#fillBarIncidents)'
                    : 'url(#fillBarValue)'
                }
                radius={[4, 4, 0, 0]}
                minPointSize={3}
                animationDuration={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 