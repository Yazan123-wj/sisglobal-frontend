import { memo, useMemo, useRef } from 'react'

import { globalLocations } from '@/data/locations'
import type { GlobalLocation } from '@/data/locations'
import regionMap from '@/data/regionMap.json'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

const PIN_W = 18
const PIN_H = 25
const HIT_R = 22
const SIS_IDS = new Set(globalLocations.map((location) => location.id))

type MapLocation = GlobalLocation & { x: number; y: number }

type DottedWorldMapProps = {
  activeId: string
  onActivate: (id: string) => void
}

const CountryShapes = memo(function CountryShapes({
  activeId,
  onActivate,
}: {
  activeId: string
  onActivate: (id: string) => void
}) {
  const rest = regionMap.countries.filter((country) => !(country.id && SIS_IDS.has(country.id)))
  const sis = regionMap.countries.filter((country) => country.id && SIS_IDS.has(country.id))

  return (
    <g className="region-countries">
      {rest.map((country) => (
        <path
          key={country.iso}
          d={country.d}
          fill="#e7eef4"
          stroke="#a9b9c8"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
      ))}
      {sis.map((country) => {
        const selected = country.id === activeId
        return (
          <path
            key={country.iso}
            d={country.d}
            fill={selected ? '#0A4A9C' : '#4F9AD0'}
            stroke={selected ? '#092046' : '#1A6EC4'}
            strokeWidth={selected ? 1.65 : 1.1}
            strokeLinejoin="round"
            className="map-hit"
            onPointerEnter={() => onActivate(country.id!)}
            onClick={() => onActivate(country.id!)}
          />
        )
      })}
    </g>
  )
})

export default function DottedWorldMap({ activeId, onActivate }: DottedWorldMapProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  const locations = useMemo<MapLocation[]>(
    () =>
      globalLocations.flatMap((location) => {
        const point = regionMap.locations[location.id as keyof typeof regionMap.locations]
        if (!point || point.x < -20 || point.x > regionMap.width + 20 || point.y < -20 || point.y > regionMap.height + 20) {
          return []
        }
        return [{ ...location, ...point }]
      }),
    [],
  )

  const active = locations.find((location) => location.id === activeId) ?? locations[0]

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const reduced = prefersReducedMotion()
      const pins = root.querySelectorAll<SVGGElement>('[data-map-pin]')

      gsap.set(pins, { autoAlpha: reduced ? 1 : 0, scale: reduced ? 1 : 0.7, transformOrigin: '50% 100%' })
      if (reduced) return

      gsap.to(pins, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        delay: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 78%', once: true },
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="dotted-world-map">
      <div className="map-frame">
        <svg
          viewBox={`0 0 ${regionMap.width} ${regionMap.height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Map of SIS Global locations across the Middle East and Africa"
        >
          <defs>
            <filter id="map-pin-shadow" x="-40%" y="-20%" width="180%" height="180%">
              <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="#092046" floodOpacity="0.28" />
            </filter>
          </defs>

          <CountryShapes activeId={activeId} onActivate={onActivate} />

          <g className="sis-locations">
            {locations.map((location) => {
              const selected = location.id === active?.id
              return (
                <g key={location.id} transform={`translate(${location.x - PIN_W / 2} ${location.y - PIN_H})`}>
                  {selected ? (
                    <circle cx={PIN_W / 2} cy={PIN_H} r="17" fill="#092046" opacity="0.16" pointerEvents="none" />
                  ) : null}
                  <g
                    data-map-pin={location.id}
                    className={selected ? 'map-pin is-active' : 'map-pin'}
                    pointerEvents="none"
                    filter="url(#map-pin-shadow)"
                  >
                    <path
                      d={`M${PIN_W / 2} ${PIN_H}C${PIN_W / 2} ${PIN_H} 0 ${PIN_H * 0.58} 0 ${PIN_H * 0.36}A${PIN_W / 2} ${PIN_W / 2} 0 1 1 ${PIN_W} ${PIN_H * 0.36}C${PIN_W} ${PIN_H * 0.58} ${PIN_W / 2} ${PIN_H} ${PIN_W / 2} ${PIN_H}Z`}
                      fill={selected ? '#092046' : '#0A4A9C'}
                      stroke="#ffffff"
                      strokeWidth="1.35"
                      strokeLinejoin="round"
                    />
                    <circle cx={PIN_W / 2} cy={PIN_H * 0.34} r="2.85" fill="#ffffff" />
                  </g>
                  <circle
                    cx={PIN_W / 2}
                    cy={PIN_H}
                    r={HIT_R}
                    fill="transparent"
                    className="map-hit"
                    aria-label={location.country}
                    onPointerEnter={() => onActivate(location.id)}
                    onFocus={() => onActivate(location.id)}
                    onClick={() => onActivate(location.id)}
                  />
                </g>
              )
            })}
          </g>
        </svg>
      </div>
    </div>
  )
}
