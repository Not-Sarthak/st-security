'use client'
import { motion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import { EMAIL, SOCIAL_LINKS, BLOG_POSTS } from './data'
import React from 'react'
import { HackStats } from '@/components/stats-ui/hack-stats'
import dynamic from 'next/dynamic'

const AttackTypes = dynamic(
  () =>
    import('@/components/stats-ui/attack-types').then((mod) => mod.AttackTypes),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] animate-pulse rounded-lg bg-zinc-900/50" />
    ),
  },
)

const TwitterHacks = dynamic(
  () =>
    import('@/components/stats-ui/twt-hacks').then((mod) => mod.TwitterHacks),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] animate-pulse rounded-lg bg-zinc-900/50" />
    ),
  },
)

const ProtocolFailures = dynamic(
  () =>
    import('@/components/stats-ui/protocol-failures').then(
      (mod) => mod.ProtocolFailures,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] animate-pulse rounded-lg bg-zinc-900/50" />
    ),
  },
)

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Home() {
  return (
    <motion.main
      className="space-y-16"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <HackStats />
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="grid grid-cols-1 gap-6">
          <AttackTypes />
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="grid grid-cols-1 gap-6">
          <TwitterHacks />
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="grid grid-cols-1 gap-6">
          <ProtocolFailures />
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Connect</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Proudly Built by{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
