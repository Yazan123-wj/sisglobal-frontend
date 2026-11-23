import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'

import { SEARCH_MIN_LENGTH, SEARCH_WORD_START_UNDER, searchSolutions, searchTokens } from '@/data/searchIndex'

function SearchIcon() {
  return (
    <svg className="site-search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <circle cx="9" cy="9" r="5.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="m13.4 13.4 3.85 3.85" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="site-search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/** Matches each typed word, tolerating the punctuation the search ignores ("wifi" finds "Wi-Fi"). */
function tokenPattern(tokens: string[]) {
  if (!tokens.length) return null
  const parts = [...tokens]
    .sort((a, b) => b.length - a.length)
    .map((token) => {
      const body = token.split('').join("[-'’.]*")
      return token.length < SEARCH_WORD_START_UNDER ? `\\b${body}` : body
    })
  return new RegExp(`(${parts.join('|')})`, 'gi')
}

function mark(text: string, pattern: RegExp | null) {
  if (!pattern) return text
  return text.split(pattern).map((part, index) => (index % 2 ? <mark key={index}>{part}</mark> : part))
}

export default function SiteSearch({ onOpen }: { onOpen?: () => void }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const listId = useId()

  const results = useMemo(() => searchSolutions(query), [query])
  const pattern = useMemo(() => tokenPattern(searchTokens(query)), [query])
  const typed = query.trim()
  const showPanel = open && searchTokens(query).join(' ').length >= SEARCH_MIN_LENGTH
  const activeId = showPanel && results[active] ? `${listId}-${active}` : undefined

  const show = () => {
    if (open) return
    setOpen(true)
    onOpen?.()
  }

  const reset = () => {
    setOpen(false)
    setQuery('')
    setActive(0)
    input.current?.blur()
  }

  // Layout effect so the focus call stays inside the tap that opened the bar (phones need that to show the keyboard).
  useLayoutEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const leave = (event: Event) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', leave)
    document.addEventListener('focusin', leave)
    return () => {
      document.removeEventListener('pointerdown', leave)
      document.removeEventListener('focusin', leave)
    }
  }, [open])

  // Keep the keyboard-selected result in view by scrolling the panel only, never the page.
  useEffect(() => {
    const list = panel.current
    const option = activeId ? document.getElementById(activeId) : null
    if (!list || !option) return
    const top = option.offsetTop
    const bottom = top + option.offsetHeight
    if (top < list.scrollTop) list.scrollTop = top - 8
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight + 8
  }, [activeId])

  const openActive = () => {
    if (activeId) document.getElementById(activeId)?.click()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      reset()
      return
    }
    if (!showPanel || !results.length) return
    if (event.key === 'Enter') {
      event.preventDefault()
      openActive()
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActive((index) => (index + step + results.length) % results.length)
    }
  }

  return (
    <div ref={root} className={`site-search${open ? ' is-open' : ''}${query ? ' has-query' : ''}`}>
      <button
        type="button"
        className="site-search-toggle"
        aria-label="Search solutions"
        aria-expanded={open}
        onClick={show}
      >
        <SearchIcon />
      </button>
      <div className="site-search-bar">
        <form
          className="site-search-box"
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            openActive()
          }}
        >
          <SearchIcon />
          <input
            ref={input}
            type="text"
            role="combobox"
            aria-label="Search solutions"
            aria-autocomplete="list"
            aria-expanded={showPanel}
            aria-controls={showPanel ? listId : undefined}
            aria-activedescendant={activeId}
            placeholder="Search solutions"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
            value={query}
            onFocus={show}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
              show()
            }}
            onKeyDown={onKeyDown}
          />
          <button type="button" className="site-search-close" aria-label="Close search" onClick={reset}>
            <CloseIcon />
          </button>
        </form>
      </div>
      {showPanel ? (
        <div ref={panel} className="site-search-panel">
          {results.length ? (
            <div id={listId} className="site-search-list" role="listbox" aria-label="Solutions">
              {results.map((result, index) => (
                <Link
                  key={result.to}
                  id={`${listId}-${index}`}
                  to={result.to}
                  role="option"
                  aria-selected={index === active}
                  tabIndex={-1}
                  className={index === active ? 'site-search-option is-active' : 'site-search-option'}
                  onMouseEnter={() => setActive(index)}
                  onClick={reset}
                >
                  <strong>{mark(result.title, pattern)}</strong>
                  <span>
                    {result.hit ? <>{result.unit} · {mark(result.hit, pattern)}</> : result.context}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p id={listId} className="site-search-empty" role="status">
              No solutions match “{typed}”.
            </p>
          )}
        </div>
      ) : null}
    </div>
  )
}
