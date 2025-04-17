'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="flex items-center gap-3 font-medium text-black dark:text-white">
          <Image
            src="/logo.svg"
            alt="Superteam Security"
            width={50}
            height={50}
          />
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">Superteam Security</span>
            <span className="text-sm text-gray-500">Solana Exploits for Security Nerds</span>
          </div>
        </Link>
      </div>
    </header>
  )
}
