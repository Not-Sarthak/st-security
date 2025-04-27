'use client';

import * as React from 'react';
import { 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip,
  Legend,
  Cell
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { BLOG_POSTS } from '@/app/data';

// Process the blog data to categorize by attack type
const processAttackTypeData = () => {
  const categoryMap: Record<string, number> = {};
  
  // Map common keywords in descriptions to categories
  const categoryKeywords: Record<string, string[]> = {
    'oracle': ['oracle', 'price manipulation', 'price oracle'],
    'flashloan': ['flash loan', 'flashloan'],
    'privkey': ['private key', 'key compromise', 'key leak'],
    'validation': ['account validation', 'validation', 'faulty validation'],
    'rugpull': ['rug pull', 'rugpull', 'scam'],
    'reentrancy': ['reentrancy', 're-entrancy', 'reentrant'],
    'access': ['access control', 'permission', 'unauthorized'],
    'overflow': ['overflow', 'underflow', 'arithmetic']
  };
  
  BLOG_POSTS.forEach(post => {
    let found = false;
    const description = post.description.toLowerCase();
    
    // Try to match keywords to categorize
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => description.includes(keyword.toLowerCase()))) {
        categoryMap[category] = (categoryMap[category] || 0) + 1;
        found = true;
        break;
      }
    }
    
    // If no category matches, put in "logic"
    if (!found) {
      categoryMap['logic'] = (categoryMap['logic'] || 0) + 1;
    }
  });
  
  // Create the data array for the chart
  return Object.entries(categoryMap).map(([attackType, incidents]) => ({
    attackType,
    incidents,
  })).sort((a, b) => b.incidents - a.incidents);
};

const attackData = processAttackTypeData();

// Map attack type names to readable labels
const ATTACK_LABELS: Record<string, string> = {
  'oracle': 'Oracle Manipulation',
  'flashloan': 'Flash Loan Attack',
  'privkey': 'Private Key Compromise',
  'validation': 'Validation Vulnerabilities',
  'rugpull': 'Rug Pulls',
  'reentrancy': 'Reentrancy Attacks',
  'access': 'Access Control Issues',
  'overflow': 'Arithmetic Vulnerabilities',
  'logic': 'Logic Flaws'
};

export function AttackTypes() {
  const totalIncidents = React.useMemo(() => {
    return attackData.reduce((acc, curr) => acc + curr.incidents, 0);
  }, []);

  // Create gradient IDs for each attack type
  const gradientIds = React.useMemo(() => {
    return attackData.map((item, index) => `pieGradient-${index}`);
  }, [attackData]);

  const CustomTooltipContent = React.useCallback(
    (props: any) => {
      const { active, payload } = props;
      
      if (!active || !payload || !payload.length) {
        return null;
      }
      
      const data = payload[0].payload;
      
      return (
        <div className="bg-white dark:bg-zinc-900 px-3 py-2 rounded-md shadow-md">
          <p className="font-medium text-zinc-900 dark:text-white">
            {ATTACK_LABELS[data.attackType]}
          </p>
          <p className="text-sm mt-1 text-zinc-600 dark:text-zinc-300">
            {data.incidents} incidents ({((data.incidents / totalIncidents) * 100).toFixed(0)}%)
          </p>
        </div>
      );
    },
    [totalIncidents]
  );

  // Find the most common attack type
  const mostCommonAttack = React.useMemo(() => {
    if (!attackData.length) return null;
    return attackData[0];
  }, []);

  const renderCustomLegend = React.useCallback(
    (props: any) => {
      const { payload } = props;
      
      if (!payload || !Array.isArray(payload)) {
        return null;
      }
      
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 px-2 mt-2">
          {payload.map((entry: any, index: number) => (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-sm" 
                style={{ 
                  background: `url(#${gradientIds[index]})` 
                }}
              />
              <span className="text-xs text-zinc-800 dark:text-zinc-200">
                {ATTACK_LABELS[entry.value]}
              </span>
            </div>
          ))}
        </div>
      );
    },
    [gradientIds]
  );

  return (
    <Card className='bg-white dark:bg-zinc-900 shadow-sm'>
      <CardHeader>
        <CardTitle className="text-lg font-medium tracking-tight text-zinc-900 dark:text-white">Attack Type Distribution</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='h-[300px] mx-auto mt-4'>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id="pieGradient-0" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="pieGradient-1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="pieGradient-2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="pieGradient-3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="pieGradient-4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="pieGradient-5" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="pieGradient-6" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="pieGradient-7" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="pieGradient-8" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eab308" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#eab308" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              
              <Pie
                data={attackData}
                dataKey="incidents"
                nameKey="attackType"
                cx="50%"
                cy="50%"
                outerRadius={120}
                stroke="none"
              >
                {attackData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#${gradientIds[index]})`}
                  />
                ))}
              </Pie>
              
              <Tooltip 
                content={<CustomTooltipContent />}
                cursor={false}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="px-6 py-4">
          <Legend 
            content={renderCustomLegend}
            layout="horizontal"
            verticalAlign="bottom"
          />
        </div>
      </CardContent>
    </Card>
  );
} 