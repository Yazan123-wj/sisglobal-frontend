import { useEffect, useState } from 'react'
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

  useEffect(() => {
    setObservedId(itemKey.split('|')[0] ?? '')
  }, [itemKey])

  useEffect(() => {
    if (onSelect) return

    const update = () => {
      const nodes = items
        .map((item) => document.getElementById(item.id))
        .filter((node): node is HTMLElement => Boolean(node))
      if (!nodes.length) return

      const header = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      ) || 76
      const nav = document.querySelector('.page-subnav')
      const spy = header + (nav instanceof HTMLElement ? nav.offsetHeight : 52) + 4

      let current = nodes[0].id
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= spy) current = node.id
      }
      setObservedId((prev) => (prev === current ? prev : current))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [itemKey, items, onSelect])

  return (
    <nav className={cn('page-subnav', extra ? 'page-subnav-stack' : undefined, className)} aria-label={label}>
      <div className="container">
        <div className="page-subnav-inner">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(item.id === currentId && 'is-active')}
              onClick={() => {
                if (onSelect) {
                  onSelect(item.id)
                  return
                }
                setObservedId(item.id)
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
