'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IconSend, IconRefresh } from '@tabler/icons-react'
import { cn } from '@/app/lib/utils'
import { BLOG_POSTS } from '@/app/data'
import { ChatBubble } from '@/components/ui/chat-bubble'
import { TypingIndicator } from '@/components/ui/typing-indicator'

type Message = {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export default function AssistantPage() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi there! Ask me anything about Solana security, exploits, and vulnerabilities.',
      timestamp: new Date(),
    },
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  // Auto-scroll to bottom on new messages or streaming updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingContent])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [input])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    
    // Add an empty assistant message that will be streamed
    setMessages(prev => [
      ...prev, 
      {
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true
      }
    ])
    setStreamingContent('')

    try {
      // Simulating streaming in this example
      // In a real implementation, you would use a streaming API endpoint
      const mockStream = async () => {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(m => ({
              role: m.role,
              content: m.content,
            })),
            blogPosts: BLOG_POSTS,
          }),
        })
  
        if (!response.ok) {
          throw new Error('Failed to get response')
        }
  
        const data = await response.json()
        const fullContent = data.content
        
        // Simulate streaming by adding characters gradually
        let currentContent = ''
        const words = fullContent.split(' ')
        
        for (let i = 0; i < words.length; i++) {
          currentContent += (i > 0 ? ' ' : '') + words[i]
          setStreamingContent(currentContent)
          
          // Wait for a short random delay to simulate natural typing
          await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 10))
        }
        
        // Update the final message when streaming is done
        setMessages(prev => prev.map((msg, idx) => 
          idx === prev.length - 1 ? { ...msg, content: fullContent, isStreaming: false } : msg
        ))
      }
      
      await mockStream()
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => prev.map((msg, idx) => 
        idx === prev.length - 1 
          ? { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date(), isStreaming: false }
          : msg
      ))
    } finally {
      setIsLoading(false)
      setStreamingContent('')
    }
  }

  const resetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hi there! Ask me anything about Solana security, exploits, and vulnerabilities.',
        timestamp: new Date(),
      },
    ])
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden w-full max-w-full sm:max-w-4xl mx-auto">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-lg font-medium text-zinc-900 dark:text-white">Solana Security Assistant</h1>
        <button
          onClick={resetChat}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-600 bg-white hover:bg-zinc-100 transition-colors rounded-full border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:border-zinc-700"
        >
          <IconRefresh size={14} stroke={2.5} />
          <span className="hidden sm:inline">New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="space-y-4 overflow-y-auto p-3 sm:p-4 md:p-6 h-full">
          {messages.map((message, i) => (
            <ChatBubble
              key={i}
              content={message.isStreaming ? streamingContent : message.content}
              role={message.role}
              timestamp={message.timestamp}
              animateIn={i === messages.length - 1 && !message.isStreaming}
              isStreaming={message.isStreaming}
            />
          ))}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      <div className="px-3 sm:px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            placeholder="Ask about Solana security..."
            className="w-full px-4 py-3 pr-12 bg-zinc-100 dark:bg-zinc-800 border-none rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            rows={1}
            maxLength={500}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all',
              !input.trim() 
                ? 'opacity-50 cursor-not-allowed text-zinc-400 dark:text-zinc-600' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            )}
          >
            <IconSend size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
