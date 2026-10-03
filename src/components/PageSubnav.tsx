import { useEffect, useState } from 'react'

import { cn } from '@/lib/cn'

export type PageSectionLink = {
  id: string
  label: string
}

export default function PageSubnav({
  items,
  activeId,
  onSelect,
}: {
  items: PageSectionLink[]
  activeId?: string
  onSelect?: (id: string) => void
}) {
  const [observedId, setObservedId] = useState(items[0]?.id ?? '')
  const currentId = activeId ?? observedId

  useEffect(() => {
    if (onSelect) return

    const observed = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node))
    if (!observed.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setObservedId(visible.target.id)
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.15, 0.35, 0.6] },
    )

    observed.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [items, onSelect])

  return (
    <nav className="page-subnav" aria-label="On this page">
      <div className="container page-subnav-inner">
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
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
