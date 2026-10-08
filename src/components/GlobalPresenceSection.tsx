import { useState } from 'react'
import type { ReactNode } from 'react'

import DottedWorldMap from '@/components/DottedWorldMap'
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
  const active = globalLocations.find((location) => location.id === activeId) ?? globalLocations[0]

  return (
    <section id={sectionId} className="presence-section" aria-labelledby="global-presence-heading">
      <div className="presence-shell">
        <div className="presence-head">
          <div className="presence-detail">
            <p className="presence-index">Global presence</p>
            <p className="presence-country">{active.country}</p>
            <p className="presence-meta">Established {active.year}</p>
            <p className="presence-blurb">{active.blurb}</p>
          </div>

          <div className="presence-lead">
            <h2 id="global-presence-heading">{heading ?? <>Local expertise.<br />International reach.</>}</h2>
            {lead ? <p className="presence-lead-copy">{lead}</p> : null}
            <ul className="map-country-list" aria-label="SIS Global operating locations">
              {globalLocations.map((location) => {
                const selected = location.id === activeId
                return (
                  <li key={location.id}>
                    <button
                      type="button"
                      onPointerEnter={() => setActiveId(location.id)}
                      onFocus={() => setActiveId(location.id)}
                      onClick={() => setActiveId(location.id)}
                      aria-pressed={selected}
                      className={cn('map-country', selected && 'is-active')}
                    >
                      {location.country}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="presence-map-slot">
          <DottedWorldMap activeId={activeId} onActivate={setActiveId} />
        </div>

        <p className="presence-hint">
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M5 3.2 18.4 12l-6.2 1.4 2.3 6.6-2.8 1-2.3-6.5L5 18.8V3.2Z" fill="currentColor" />
            </svg>
          </span>
          Hover over the map for more information.
        </p>
      </div>
    </section>
  )
}
