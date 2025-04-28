'use client'

import { cn } from '@/app/lib/utils'

interface TypingIndicatorProps {
  className?: string
}

export const TypingIndicator = ({ className }: TypingIndicatorProps) => {
  return (
    <div className="flex max-w-[85%] sm:max-w-[75%]">
      <div className="flex items-end gap-1.5">
        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-blue-600 dark:text-blue-400">
          ST
        </div>
        <div className={cn('py-2.5 px-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 rounded-bl-none', className)}>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 animate-bounce" style={{ animationDuration: '1.2s' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 animate-bounce" style={{ animationDuration: '1.2s', animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 animate-bounce" style={{ animationDuration: '1.2s', animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
} 