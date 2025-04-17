"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export interface MenuBarItem {
  icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement
  label: string
  href?: string
}

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuBarItem[]
}

export function MenuBar({ items, className, ...props }: MenuBarProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  return (
    <div className={cn("relative", className)} {...props}>
      <div 
        ref={menuRef}
        className={cn(
          "h-10 px-3 inline-flex justify-center items-center gap-2.5 overflow-hidden z-10",
          "rounded-full bg-background/95 backdrop-blur",
          "border border-border/50",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.1)]",
          "dark:border-border/50 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_16px_-4px_rgba(0,0,0,0.2)]"
        )}
      >
        {items.map((item, index) => {
          const isActive = item.href === pathname;
          const ButtonOrLink = item.href ? Link : 'button';
          
          return (
            <ButtonOrLink 
              key={index}
              href={item.href || '#'}
              className={cn(
                "relative px-3 py-1 rounded-full flex justify-center items-center text-sm transition-all duration-200",
                isActive 
                  ? "font-semibold text-black dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {item.label}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
              )}
            </ButtonOrLink>
          );
        })}
      </div>
    </div>
  )
} 