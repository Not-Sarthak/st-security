type BlogPost = {
  title: string
  category: string
  description: string
  link: string
  date: string
  stolen: number | string
  uid: string
  auditedBy?: string
  writtenBy?: string
}

type SocialLink = {
  label: string
  link: string
}

type ProtocolFailure = {
  id: string
  title: string
  date: string
  duration: string
  description: string
  details: string
}

export const PROTOCOL_FAILURES: ProtocolFailure[] = [
  {
    id: "turbine-block-propagation",
    title: "Turbine Block Propagation Failure",
    date: "December 2020",
    duration: "~6 hours",
    description: "Vulnerability in the Turbine protocol caused by duplicate block broadcasts leading to network desynchronization.",
    details: "Solana's first major disruption stemmed from a vulnerability in the Turbine protocol, responsible for block propagation across validators. The incident occurred when a validator mistakenly ran two identical nodes, resulting in duplicate block broadcasts. Due to a flaw in how Turbine tracked blocks — by position rather than by hash — validators were unable to distinguish between legitimate and duplicate blocks. The resulting desynchronization brought the network to a complete halt for approximately six hours. This early outage revealed foundational weaknesses in Solana's propagation mechanism."
  },
  {
    id: "bot-driven-transaction-flood",
    title: "Bot-Driven Transaction Flood",
    date: "September 2021",
    duration: "~17 hours",
    description: "Memory overflows from aggressive bot traffic during a token launch led to consensus failure.",
    details: "An aggressive influx of bot-generated traffic during a token launch overwhelmed Solana's transaction processing pipeline. The flood of transactions caused memory overflows on validator nodes, leading to consensus failure and a 17-hour network outage. A coordinated validator restart was required. This event exposed the network's limited spam mitigation measures and emphasized the need for robust rate-limiting strategies."
  },
  {
    id: "transaction-spam-overload",
    title: "Transaction Spam Overload",
    date: "April 2022",
    duration: "~8 hours",
    description: "NFT mint triggered 6M+ TPS load, overwhelming validators and causing a halt in block production.",
    details: "A highly anticipated NFT mint triggered a bot surge that pushed the network to a peak of over 6 million transactions per second. Validators were unable to keep up with the load, leading to a complete halt of block production for roughly eight hours. Although previous improvements had been made to handle spam, a voting transaction issue prevented effective recovery. A full restart was again necessary. This incident further illustrated the systemic risk posed by unbounded throughput under adversarial conditions."
  },
  {
    id: "durable-nonce-consensus-breakdown",
    title: "Durable Nonce Consensus Breakdown",
    date: "June 2022",
    duration: "~4.5 hours",
    description: "Bug in the 'durable nonce' feature caused validators to diverge due to inconsistent nonce logic handling.",
    details: "A bug in the \"durable nonce\" transaction feature — used for enabling pre-signed transactions — caused validators to diverge in state due to inconsistencies in how different versions of the software handled nonce logic. This consensus failure led to a ~4.5-hour outage and required temporary deactivation of the feature. A fix was scheduled for a later software release. The event revealed the potential fragility introduced by mismatched node implementations and evolving feature sets."
  },
  {
    id: "fork-choice-rule-disruption",
    title: "Fork Choice Rule Disruption",
    date: "September 2022",
    duration: "~8.5 hours",
    description: "Bug in fork choice algorithm created inconsistent chain views among validators.",
    details: "A subtle bug in the fork choice algorithm created inconsistent views of the canonical chain among validators. One validator broadcasting duplicate blocks triggered diverging forks, which the rest of the network was unable to reconcile. The resulting instability persisted for approximately 8.5 hours, requiring a validator upgrade to reestablish consensus. This incident emphasized the criticality of rigorous fork choice logic in high-throughput consensus systems."
  },
  {
    id: "turbine-large-block-overload",
    title: "Turbine Large Block Overload",
    date: "February 2023",
    duration: "~19 hours",
    description: "Unusually large block overwhelmed Turbine protocol's propagation capacity, causing processing loops.",
    details: "A block of unusually large size overwhelmed the Turbine protocol's capacity to propagate data across the network. This resulted in a cascading failure where validators entered a processing loop and were unable to progress. The network remained offline for ~19 hours until patched versions (v1.13.7 and v1.14.17) were deployed to improve duplicate data handling. Once again, Turbine's design limitations under high-stress scenarios were brought to the forefront."
  },
  {
    id: "jit-cache-recompile-loop-crash",
    title: "JIT Cache Recompile Loop Crash",
    date: "February 2024",
    duration: "~5 hours",
    description: "Flaw in JIT cache mechanism caused infinite recompilation loops, leading to validator crashes.",
    details: "A flaw in the Just-In-Time (JIT) cache mechanism used for program execution caused validators to repeatedly recompile the same contract. This infinite recompilation loop led to validator crashes and a ~5-hour outage. A patch was issued to enhance caching efficiency and prevent redundant execution cycles. This event underscored the importance of runtime stability in environments optimized for rapid execution."
  }
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "LoopScale",
    category: "DeFi",
    description: "Oracle Manipulation",
    link: "/blog/loopscale",
    uid: "blog-1",
    date: "2025-04-27",
    stolen: "$5.8 Million",
    auditedBy: "OShield, Sec3",
    writtenBy: "0xSarthak13",
  },
  {
    title: 'DogWif',
    category: 'Tooling',
    description: 'Private Key Leak',
    link: '/blog/dogwif',
    uid: 'blog-2',
    date: '2025-01-28',
    stolen: '$10 Million',
    auditedBy: '-',
    writtenBy: '0xSarthak13',
  },
  {
    title: 'Solana web3.js',
    category: 'Tooling',
    description: 'Supply Chain Attack',
    link: '/blog/solana-web3-js',
    uid: 'blog-3',
    date: '2024-12-02',
    stolen: '$160K',
    auditedBy: '-',
    writtenBy: '0xSarthak13',
  },
  {
    title: 'PumpSci',
    category: 'DeSci',
    description: 'Private Key Leak',
    link: '/blog/pump-sci',
    uid: 'blog-4',
    date: '2024-11-25',
    stolen: '-',
    auditedBy: '-',
    writtenBy: '0xSarthak13',
  },
  {
    title: 'Parcl',
    category: 'RWA Tokenization',
    description: 'Supply Chain Manipulation',
    link: '/blog/parcl',
    uid: 'blog-6',
    date: '2024-08-20',
    stolen: '$60K',
    auditedBy: 'OtterSec',
    writtenBy: '0xSarthak13',
  },
  {
    title: 'Pump.fun',
    category: 'DeFi',
    description: 'Flashloan Exploit',
    link: '/blog/pump-fun',
    uid: 'blog-9',
    date: '2024-05-16',
    stolen: '~2 Million',
    auditedBy: '-',
    writtenBy: '0xSarthak13',
  },
  {
    title: 'Solareum',
    category: 'Trading',
    description: 'Unknown',
    link: '/blog/solareum',
    uid: 'blog-10',
    date: '2024-03-30',
    stolen: '$1 Million',
    auditedBy: '-',
    writtenBy: '0xSarthak13',
  },
  {
    title: 'Saga DAO',
    category: 'DAO',
    description: 'Unknown',
    link: '/blog/saga-dao',
    uid: 'blog-11',
    date: '2024-01-25',
    stolen: '$0.065 Million',
    auditedBy: '-',
    writtenBy: '0xSarthak13',
  },
  {
    title: 'SVT Token',
    category: 'DeFi',
    description: 'Flash Loan Attack',
    link: '/blog/svt-token',
    uid: 'blog-13',
    date: '2023-08-26',
    stolen: '$400K',
    auditedBy: 'Certik',
    writtenBy: '0xSarthak13',
  },
  {
    title: 'Cypher Protocol',
    category: 'DeFi',
    description: 'Exploit',
    link: '/blog/cypher-protocol',
    uid: 'blog-14',
    date: '2023-07-08',
    stolen: '$1 Million',
    auditedBy: '-',
    writtenBy: '0xSarthak13',
  },
  {
    title: 'Raydium',
    category: 'DEX',
    description: 'Private Key Compromise',
    link: '/blog/raydium',
    uid: 'blog-15',
    date: '2022-12-16',
    stolen: '$4.4 Million',
    auditedBy: '-',
    writtenBy: 'Prastut and 0xDeep',
  },
  {
    title: 'FTX',
    category: 'Exchange',
    description: 'Bankruptcy',
    link: '/blog/ftx',
    uid: 'blog-16',
    date: '2022-11-02',
    stolen: '$8.7 Billion',
    auditedBy: '-',
    writtenBy: '0xSarthak13',
  },
  {
    title: 'Solend',
    category: 'DeFi',
    description: 'Price Oracle Attack',
    link: '/blog/solend',
    uid: 'blog-17',
    date: '2022-11-02',
    stolen: '$1.3 Million',
    auditedBy: '-',
    writtenBy: 'Prastut and 0xDeep',
  },
  {
    title: 'Mango Markets',
    category: 'DeFi',
    description: 'Price Manipulation',
    link: '/blog/mango-markets',
    uid: 'blog-18',
    date: '2022-10-11',
    stolen: '$115 Million',
    auditedBy: '-',
    writtenBy: 'Prastut and 0xDeep',
  },
  {
    title: 'Slope Wallet',
    category: 'Wallet',
    description: 'Private Key Leak',
    link: '/blog/slope-wallet',
    uid: 'blog-19',
    date: '2022-08-02',
    stolen: '$5 Million',
    auditedBy: '-',
    writtenBy: 'Prastut and 0xDeep',
  },
  {
    title: 'Nirvana',
    category: 'Stablecoin',
    description: 'Flash Loan Attack',
    link: '/blog/nirvana',
    uid: 'blog-20',
    date: '2022-07-28',
    stolen: '$3.5 Million',
    auditedBy: 'Sec3 Auto Audit Software',
    writtenBy: 'Prastut and 0xDeep',
  },
  {
    title: 'Crema',
    category: 'DeFi',
    description: 'Faulty Account Validation',
    link: '/blog/crema',
    uid: 'blog-21',
    date: '2022-07-03',
    stolen: '$8.8 Million',
    auditedBy: 'Bramah Systems',
    writtenBy: 'Prastut and 0xDeep',
  },
  {
    title: 'Cashio',
    category: 'Stablecoin',
    description: 'Faulty Account Validation',
    link: '/blog/cashio',
    uid: 'blog-22',
    date: '2022-03-23',
    stolen: '$48 Million',
    auditedBy: 'Unaudited',
    writtenBy: 'Prastut and 0xDeep',
  },
  {
    title: 'Wormhole',
    category: 'Bridge',
    description: 'Spoofed Signature Attack',
    link: '/blog/wormhole',
    uid: 'blog-23',
    date: '2022-02-02',
    stolen: '$325 Million',
    auditedBy: 'Neodyme',
    writtenBy: 'Prastut and 0xDeep',
  },
  {
    title: 'Jet',
    category: 'DeFi',
    description: 'Vulnerability',
    link: '/blog/jet',
    uid: 'blog-24',
    date: '2021-12-21',
    stolen: '-',
    auditedBy: '-',
    writtenBy: 'Prastut and 0xDeep',
  },
  {
    title: 'Solend',
    category: 'DeFi',
    description: 'Faulty Account Validation',
    link: '/blog/solend',
    uid: 'blog-25',
    date: '2021-08-19',
    stolen: '-',
    auditedBy: '-',
    writtenBy: 'Prastut and 0xDeep',
  },
]

export const TWITTER_HACKS = [
  {
    id: 1,
    title: 'DAWN',
    link: 'https://x.com/realScamSniffer/status/1879390837496537466',
  },
  {
    id: 2,
    title: 'HoloWorld AI',
    link: 'https://x.com/HoloworldAI/status/1877763633796768224',
  },
  {
    id: 3,
    title: 'DogWif Coin',
    link: 'https://dailycoin.com/solana-dogwifhat-wif-hacked-on-x-shills-random-meme-coins/',
  },
  {
    id: 4,
    title: 'IO.Net',
    link: 'https://x.com/shadid_io/status/1829024547900924118',
  },
  {
    id: 5,
    title: 'BorpaToken',
    link: 'https://x.com/Entanglefi/status/1807329476130312652',
  },
  {
    id: 6,
    title: 'Saber DAO',
    link: 'https://x.com/thesaberdao/status/1698550070206251303',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/Not-Sarthak',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/0xSarthak13',
  },
]

export const EMAIL = 'notsarthakshah@gmail.com'
