'use client';

import * as React from 'react';
import { TWITTER_HACKS } from '@/app/data';
import { cn } from "@/lib/utils";
import { AnimatedList } from '@/components/stats-ui/animated-list';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const TwitterItem = ({ title, link }: { title: string; link: string }) => {
  return (
    <div
      className={cn(
        "w-full cursor-pointer overflow-hidden rounded-lg p-4",
        "transition-all duration-200 ease-in-out hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
        "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-800/50"
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col overflow-hidden">
          <div className="flex flex-row items-center">
            <span className="text-sm font-medium text-zinc-900 dark:text-white">{title}</span>
          </div>
        </div>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-zinc-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export function TwitterHacks() {
  return (
    <Card className="bg-white dark:bg-zinc-900 shadow-sm h-full border-zinc-200 dark:border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium tracking-tight text-zinc-900 dark:text-white">Latest Twitter Hacks</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative h-[350px] overflow-hidden">
          <AnimatedList delay={2000} className="w-full">
            {TWITTER_HACKS.map((hack) => (
              <TwitterItem 
                key={hack.id}
                title={hack.title}
                link={hack.link}
              />
            ))}
          </AnimatedList>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent"></div>
        </div>
      </CardContent>
    </Card>
  );
} 