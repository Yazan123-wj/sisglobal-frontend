import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'

import Arrow from '@/components/Arrow'
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
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const currentId = activeId ?? observedId
  const itemKey = items.map((item) => item.id).join('|')
  const navRef = useRef<HTMLElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const lockId = useRef<string | null>(null)
  const lockTimer = useRef(0)
  const itemsRef = useRef(items)
  itemsRef.current = items

  const updateOverflow = () => {
    const row = rowRef.current
    if (!row) return
    const max = Math.max(0, row.scrollWidth - row.clientWidth)
    setCanPrev(row.scrollLeft > 4)
    setCanNext(row.scrollLeft < max - 4)
  }

  useEffect(() => {
    setObservedId(itemKey.split('|')[0] ?? '')
  }, [itemKey])

  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row || !currentId) return
    const run = () => scrollChildIntoRow(row, 'button.is-active')
    run()
    const frame = window.requestAnimationFrame(run)
    return () => window.cancelAnimationFrame(frame)
  }, [currentId, itemKey])

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const page = nav.closest('.work-page, .about-page') as HTMLElement | null

    const apply = () => {
      const height = `${Math.round(nav.getBoundingClientRect().height)}px`
      nav.style.setProperty('--subnav-height', height)
      page?.style.setProperty('--subnav-height', height)
    }

    apply()
    updateOverflow()
    const frame = window.requestAnimationFrame(() => {
      apply()
      updateOverflow()
    })
    const observer = new ResizeObserver(() => {
      apply()
      updateOverflow()
    })
    observer.observe(nav)
    nav.querySelectorAll(':scope > *').forEach((node) => observer.observe(node))
    window.addEventListener('resize', apply)
    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', apply)
    }
  }, [extra, itemKey])

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

  const allowArrows = items.length > 6
  const scrolling = allowArrows && (canPrev || canNext)
  const move = (direction: -1 | 1) => {
    const row = rowRef.current
    if (!row) return
    row.scrollBy({ left: direction * Math.max(row.clientWidth * 0.65, 160), behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      className={cn('page-subnav', extra ? 'page-subnav-stack' : undefined, className)}
      aria-label={label}
    >
      <div className="container">
        <div className={cn(allowArrows && 'page-subnav-scroll', scrolling && 'is-overflow')}>
          {allowArrows ? (
            <button
              type="button"
              className="page-subnav-pills-nav"
              aria-label="Previous"
              disabled={!canPrev}
              onClick={() => move(-1)}
            >
              <Arrow dir="left" />
            </button>
          ) : null}
          <div ref={rowRef} className="page-subnav-inner" onScroll={allowArrows ? updateOverflow : undefined}>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(item.id === currentId && 'is-active')}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  keepRowScroll(rowRef.current, () => {
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
          {allowArrows ? (
            <button
              type="button"
              className="page-subnav-pills-nav"
              aria-label="Next"
              disabled={!canNext}
              onClick={() => move(1)}
            >
              <Arrow dir="right" />
            </button>
          ) : null}
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

function scrollChildIntoRow(row: HTMLElement | null, selector: string) {
  const child = row?.querySelector<HTMLElement>(selector)
  if (!row || !child) return
  const rowRect = row.getBoundingClientRect()
  const childRect = child.getBoundingClientRect()
  const pad = 16
  let delta = 0
  if (childRect.left < rowRect.left + pad) {
    delta = childRect.left - rowRect.left - pad
  } else if (childRect.right > rowRect.right - pad) {
    delta = childRect.right - rowRect.right + pad
  }
  if (Math.abs(delta) > 1) {
    row.scrollTo({ left: row.scrollLeft + delta, behavior: 'smooth' })
  }
}

export type PageSectionGroup = PageSectionLink & { children?: PageSectionLink[] }

export function PageSubnavPills({
  items,
  label,
  activeId,
  onSelect,
  activeChildId,
  onSelectChild,
}: {
  items: PageSectionGroup[]
  label: string
  activeId: string
  onSelect: (id: string) => void
  activeChildId?: string
  onSelectChild?: (parentId: string, childId: string) => void
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [menuLeft, setMenuLeft] = useState(0)
  const open = onSelectChild ? items.find((item) => item.id === openId && item.children?.length) : undefined

  const update = () => {
    const row = rowRef.current
    if (!row) return
    const max = Math.max(0, row.scrollWidth - row.clientWidth)
    setCanPrev(row.scrollLeft > 4)
    setCanNext(row.scrollLeft < max - 4)
  }

  const itemKey = items.map((item) => item.id).join('|')

  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row) return
    update()
    const onScroll = () => {
      update()
      setOpenId(null)
    }
    row.addEventListener('scroll', onScroll, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(row)
    window.addEventListener('resize', update)
    return () => {
      row.removeEventListener('scroll', onScroll)
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [itemKey])

  // The row scrolls sideways, so the menu lives outside it and is lined up under its pill here.
  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const menu = menuRef.current
    if (!wrap || !menu || !openId) return
    const pill = wrap.querySelector<HTMLElement>(`[data-pill="${openId}"]`)
    if (!pill) return
    const wrapRect = wrap.getBoundingClientRect()
    // Pull back by the menu's inner padding so its text lines up with the pill label.
    const left = pill.getBoundingClientRect().left - wrapRect.left - 21
    setMenuLeft(Math.max(0, Math.min(left, wrapRect.width - menu.offsetWidth)))
  }, [openId])

  useEffect(() => {
    setOpenId(null)
  }, [activeId, activeChildId])

  useEffect(() => {
    if (!openId) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenId(null)
    }
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpenId(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [openId])

  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row || !activeId) return
    const run = () => {
      scrollChildIntoRow(row, 'button.is-active')
      update()
    }
    run()
    const frame = window.requestAnimationFrame(run)
    return () => window.cancelAnimationFrame(frame)
  }, [activeId, itemKey])

  const move = (direction: -1 | 1) => {
    const row = rowRef.current
    if (!row) return
    row.scrollBy({ left: direction * Math.max(row.clientWidth * 0.65, 160), behavior: 'smooth' })
  }

  const allowArrows = items.length > 3
  const scrolling = allowArrows && (canPrev || canNext)

  const hoverOpen = (id: string | null) => (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse') setOpenId(id)
  }

  return (
    <div
      ref={wrapRef}
      className={cn('page-subnav-pills-wrap', scrolling && 'is-scroll')}
      onPointerLeave={hoverOpen(null)}
    >
      {allowArrows ? (
        <button
          type="button"
          className="page-subnav-pills-nav"
          aria-label="Previous services"
          disabled={!canPrev}
          onClick={() => move(-1)}
        >
          <Arrow dir="left" />
        </button>
      ) : null}
      <div ref={rowRef} className="page-subnav-pills" role="navigation" aria-label={label}>
        {items.map((item) => {
          const pill = (
            <button
              key={item.id}
              type="button"
              className={cn(item.id === activeId && 'is-active')}
              onMouseDown={(event) => event.preventDefault()}
              onPointerEnter={onSelectChild && !item.children?.length ? hoverOpen(null) : undefined}
              onClick={() => keepRowScroll(rowRef.current, () => onSelect(item.id))}
            >
              {item.label}
            </button>
          )
          if (!onSelectChild || !item.children?.length) return pill
          return (
            <span
              key={item.id}
              className={cn('page-subnav-pill', openId === item.id && 'is-open')}
              data-pill={item.id}
              onPointerEnter={hoverOpen(item.id)}
            >
              {pill}
              <button
                type="button"
                className="page-subnav-pill-caret"
                aria-label={`${item.label} pages`}
                aria-haspopup="true"
                aria-expanded={openId === item.id}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
              >
                <span className="nav-caret" aria-hidden="true" />
              </button>
            </span>
          )
        })}
      </div>
      {allowArrows ? (
        <button
          type="button"
          className="page-subnav-pills-nav"
          aria-label="Next services"
          disabled={!canNext}
          onClick={() => move(1)}
        >
          <Arrow dir="right" />
        </button>
      ) : null}
      {open && onSelectChild ? (
        <div ref={menuRef} className="page-subnav-menu" style={{ left: menuLeft }}>
          {open.children?.map((child) => (
            <button
              key={child.id}
              type="button"
              className={cn(open.id === activeId && child.id === activeChildId && 'is-current')}
              onClick={() => {
                setOpenId(null)
                onSelectChild(open.id, child.id)
              }}
            >
              {child.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
