import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type SurfaceTone = 'paper' | 'mist' | 'navy'

export function SurfaceBand({
  tone,
  children,
  className,
}: {
  tone: SurfaceTone
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('surface-band', `surface-${tone}`, className)}>
      <div className="container">{children}</div>
    </div>
  )
}

export function createSurfaceTones() {
  let light: Exclude<SurfaceTone, 'navy'> = 'mist'
  return {
    next(navy = false): SurfaceTone {
      if (navy) return 'navy'
      const tone = light
      light = light === 'mist' ? 'paper' : 'mist'
      return tone
    },
  }
}
