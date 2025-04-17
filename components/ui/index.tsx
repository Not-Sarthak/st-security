'use client'

import * as React from 'react'
import { BarGraph } from './bar-graph'
import { PieGraph } from './pie-graph'
import { AreaGraph } from './area-graph'
import { RecentActivity } from './recent-activity'

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-1 md:col-span-2">
        <BarGraph />
      </div>
      <div>
        <PieGraph />
      </div>
      <div>
        <AreaGraph />
      </div>
      <div className="col-span-1 md:col-span-2">
        <RecentActivity />
      </div>
    </div>
  )
} 