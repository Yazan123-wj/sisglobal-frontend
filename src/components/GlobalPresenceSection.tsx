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
        <div className="presence-map-col">
          <DottedWorldMap activeId={activeId} onActivate={setActiveId} />
        </div>

        <div className="presence-copy">
          <p className="presence-index">Global presence</p>
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

          <div className="presence-detail">
            <p className="presence-meta">Established {active.year}</p>
            <p className="presence-blurb">{active.blurb}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
