'use client'

import { cn } from '@/app/lib/utils'
import { useEffect, useState } from 'react'
import { MarkdownContent } from './markdown-content'

interface ChatBubbleProps {
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  animateIn?: boolean
  isStreaming?: boolean
}

export const ChatBubble = ({
  content,
  role,
  timestamp,
  animateIn = true,
  isStreaming = false,
}: ChatBubbleProps) => {
  const [visible, setVisible] = useState(!animateIn)

  useEffect(() => {
    if (animateIn) {
      const timer = setTimeout(() => setVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [animateIn])

  return (
    <div
      className={cn(
        'flex flex-col max-w-[85%] sm:max-w-[75%] transition-opacity duration-200',
        role === 'user'
          ? 'ml-auto'
          : '',
        animateIn && 
          (visible 
            ? 'opacity-100' 
            : 'opacity-0')
      )}
    >
      {role === 'assistant' && (
        <div className="flex items-end gap-1.5">
          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-blue-600 dark:text-blue-400">
            ST
          </div>
          
          <div className={cn(
            'py-2.5 px-3.5 rounded-2xl min-w-[40px] bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-bl-none',
            isStreaming && 'border-l-[3px] border-l-blue-500'
          )}>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <MarkdownContent content={content} />
              {isStreaming && (
                <span className="inline-block w-1.5 h-4 bg-blue-500 animate-pulse ml-[1px]" />
              )}
            </div>
          </div>
        </div>
      )}
      
      {role === 'user' && (
        <div className="flex flex-row-reverse items-end gap-1.5">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
            <span className="text-xs">You</span>
          </div>
          
          <div className="py-2.5 px-3.5 rounded-2xl min-w-[40px] bg-blue-500 text-white rounded-br-none">
            <div className="whitespace-pre-wrap">{content}</div>
          </div>
        </div>
      )}
      
      <div
        className={cn(
          'text-xs pt-1 flex text-zinc-500 dark:text-zinc-400',
          role === 'user' ? 'justify-end pr-8' : 'pl-8'
        )}
      >
        {timestamp.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  )
} 