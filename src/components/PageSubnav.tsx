import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type PageSectionLink = {
  id: string
  label: string
}

export default function PageSubnav({
  items,
  activeId,
  onSelect,
  extra,
  className,
  label = 'On this page',
}: {
  items: PageSectionLink[]
  activeId?: string
  onSelect?: (id: string) => void
  extra?: ReactNode
  className?: string
  label?: string
}) {
  const [observedId, setObservedId] = useState(items[0]?.id ?? '')
  const currentId = activeId ?? observedId
  const itemKey = items.map((item) => item.id).join('|')
  const navRef = useRef<HTMLElement>(null)
  const lockId = useRef<string | null>(null)
  const lockTimer = useRef(0)
  const itemsRef = useRef(items)
  itemsRef.current = items

  useEffect(() => {
    setObservedId(itemKey.split('|')[0] ?? '')
  }, [itemKey])

  useEffect(() => {
    if (onSelect) return

    let spy = 128
    let frame = 0

    const measure = () => {
      const header = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      ) || 76
      spy = header + (navRef.current?.offsetHeight ?? 52) + 4
    }

    const update = () => {
      if (lockId.current) return
      const nodes = itemsRef.current
        .map((item) => document.getElementById(item.id))
        .filter((node): node is HTMLElement => Boolean(node))
      if (!nodes.length) return

      let current = nodes[0].id
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= spy) current = node.id
      }
      setObservedId((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(lockTimer.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [itemKey, onSelect])

  return (
    <nav
      ref={navRef}
      className={cn('page-subnav', extra ? 'page-subnav-stack' : undefined, className)}
      aria-label={label}
    >
      <div className="container">
        <div className="page-subnav-inner">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(item.id === currentId && 'is-active')}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                const row = navRef.current?.querySelector<HTMLElement>('.page-subnav-inner')
                keepRowScroll(row ?? null, () => {
                  if (onSelect) {
                    onSelect(item.id)
                    return
                  }
                  const target = document.getElementById(item.id)
                  if (!target) return
                  lockId.current = item.id
                  setObservedId(item.id)
                  window.clearTimeout(lockTimer.current)
                  target.scrollIntoView({ block: 'start' })
                  lockTimer.current = window.setTimeout(() => {
                    lockId.current = null
                  }, 900)
                })
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        {extra}
      </div>
    </nav>
  )
}

function keepRowScroll(row: HTMLElement | null, run: () => void) {
  const left = row?.scrollLeft ?? 0
  run()
  if (!row) return
  row.scrollLeft = left
  requestAnimationFrame(() => {
    row.scrollLeft = left
  })
}

export function PageSubnavPills({
  items,
  label,
  activeId,
  onSelect,
}: {
  items: PageSectionLink[]
  label: string
  activeId: string
  onSelect: (id: string) => void
}) {
  const rowRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={rowRef} className="page-subnav-pills" role="navigation" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={cn(item.id === activeId && 'is-active')}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => keepRowScroll(rowRef.current, () => onSelect(item.id))}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
