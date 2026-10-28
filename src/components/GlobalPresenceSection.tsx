import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

import RegionPresenceMap from '@/components/RegionPresenceMap'
import { globalLocations } from '@/data/locations'
import { cn } from '@/lib/cn'

export default function GlobalPresenceSection({
  sectionId = 'presence',
  heading,
  lead,
}: {
  sectionId?: string
  heading?: ReactNode
  lead?: string
}) {
  const [activeId, setActiveId] = useState(globalLocations[1]?.id ?? globalLocations[0].id)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const hoverTimer = useRef<number>(0)
  const active = globalLocations.find((location) => location.id === activeId) ?? globalLocations[0]

  const hover = (id: string) => {
    window.clearTimeout(hoverTimer.current)
    setHoveredId(id)
    setActiveId(id)
  }

  const leave = () => {
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setHoveredId(null), 60)
  }

  return (
    <section id={sectionId} className="presence-section" aria-labelledby="global-presence-heading">
      <div className="presence-shell">
        <div className="presence-map-col">
          <RegionPresenceMap
            hoveredId={hoveredId}
            onHover={hover}
            onLeave={leave}
            onActivate={setActiveId}
          />
        </div>

        <div className="presence-copy">
          <p className="presence-index">Global presence</p>
          <h2 id="global-presence-heading">{heading ?? <>Local expertise.<br /><em>International reach.</em></>}</h2>
          {lead ? <p className="presence-lead-copy">{lead}</p> : null}

          <ul
            className="map-country-list"
            aria-label="SIS Global operating locations"
            onPointerLeave={leave}
          >
            {globalLocations.map((location) => {
              const selected = location.id === (hoveredId ?? activeId)
              return (
                <li key={location.id}>
                  <button
                    type="button"
                    onPointerEnter={() => hover(location.id)}
                    onFocus={() => hover(location.id)}
                    onClick={() => setActiveId(location.id)}
                    aria-pressed={location.id === activeId}
                    className={cn('map-country', selected && 'is-active')}
                  >
                    {location.country}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="presence-detail">
            <p className="presence-meta">Established {active.year}</p>
            <p className="presence-blurb">{active.blurb}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
