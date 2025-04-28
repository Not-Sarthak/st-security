'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/app/lib/utils'

interface MarkdownContentProps {
  content: string
  className?: string
}

export const MarkdownContent = ({ content, className }: MarkdownContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Function to highlight code blocks
  useEffect(() => {
    if (!containerRef.current) return

    // Simple markdown-like processing for code blocks and links
    const processContent = () => {
      let processed = content
        // Convert code blocks 
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => 
          `<pre class="rounded bg-zinc-200 dark:bg-zinc-900 p-3 my-2 overflow-x-auto text-sm"><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`
        )
        // Convert inline code
        .replace(/`([^`]+)`/g, '<code class="bg-zinc-200 dark:bg-zinc-900 px-1 py-0.5 rounded font-mono text-sm">$1</code>')
        // Convert links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 dark:text-blue-400 underline">$1</a>')
        // Convert bullet points
        .replace(/^\s*-\s+(.+)$/gm, '<li class="ml-4">$1</li>')
        // Convert numbered lists
        .replace(/^\s*(\d+)\.\s+(.+)$/gm, '<li class="ml-4">$2</li>')
        // Convert paragraphs (ensure double line breaks create new paragraphs)
        .replace(/\n\n/g, '</p><p>')
      
      return processed
    }

    containerRef.current.innerHTML = `<p>${processContent()}</p>`
  }, [content])

  return (
    <div ref={containerRef} className={cn('whitespace-pre-wrap', className)} />
  )
}

// Helper function to escape HTML
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
} 