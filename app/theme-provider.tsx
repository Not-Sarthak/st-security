'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import React from 'react'
import { MenuBar } from '@/components/ui/menu-bar'

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Reports',
    href: '/reports',
  },
  {
    label: 'Assistant',
    href: '/assistant',
  },
]

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      enableSystem={true}
      attribute="class"
      storageKey="theme"
      defaultTheme="system"
    >
      <div className="fixed top-5 left-0 w-full flex justify-center z-50">
        <MenuBar items={NAV_ITEMS} />
      </div>
      {children}
    </NextThemeProvider>
  )
} 