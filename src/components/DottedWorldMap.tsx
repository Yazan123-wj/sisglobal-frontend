import { memo, useMemo, useRef } from 'react'

import { globalLocations } from '@/data/locations'
import type { GlobalLocation } from '@/data/locations'
import worldMap from '@/data/worldDots.json'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

const WORLD_DOT = '#E2E7EC'
const WORLD_R = 1.85
const PIN_W = 16
const PIN_H = 22
const HIT_R = 22
const CROP_X = 520
const CROP_Y = 90
const VIEW_W = 1400 - CROP_X
const VIEW_H = 400

type MapLocation = GlobalLocation & { x: number; y: number }

type DottedWorldMapProps = {
  activeId: string
  onActivate: (id: string) => void
}

const WorldDots = memo(function WorldDots() {
  return (
    <g className="world-dots" clipPath="url(#sis-world-reveal)">
      {worldMap.dots.map(([x, y], index) => (
        x < CROP_X - 8 || y < CROP_Y - 8 || y > CROP_Y + VIEW_H + 8
          ? null
          : <circle key={index} cx={x} cy={y} r={WORLD_R} fill={WORLD_DOT} />
      ))}
    </g>
  )
})

function nearestLinks(locations: MapLocation[], active: MapLocation, count = 3) {
  return [...locations]
    .filter((location) => location.id !== active.id)
    .sort((a, b) => {
      const da = (a.x - active.x) ** 2 + (a.y - active.y) ** 2
      const db = (b.x - active.x) ** 2 + (b.y - active.y) ** 2
      return da - db
    })
    .slice(0, count)
}

export default function DottedWorldMap({ activeId, onActivate }: DottedWorldMapProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  const locations = useMemo<MapLocation[]>(
    () =>
      globalLocations.flatMap((location) => {
        const point = worldMap.locations[location.id as keyof typeof worldMap.locations]
        return point ? [{ ...location, ...point }] : []
      }),
    [],
  )

  const active = locations.find((location) => location.id === activeId) ?? locations[0]
  const links = active ? nearestLinks(locations, active) : []

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const reduced = prefersReducedMotion()
      const reveal = root.querySelector<SVGRectElement>('[data-world-reveal]')
      const pins = root.querySelectorAll<SVGGElement>('[data-map-pin]')

      gsap.set(pins, { autoAlpha: reduced ? 1 : 0, scale: reduced ? 1 : 0.7, transformOrigin: '50% 100%' })

      if (reduced) {
        if (reveal) gsap.set(reveal, { attr: { width: VIEW_W + 32 } })
        return
      }

      gsap.fromTo(
        reveal,
        { attr: { width: 0 } },
        {
          attr: { width: VIEW_W + 32 },
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 78%', once: true },
        },
      )

      gsap.to(pins, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.06,
        delay: 0.38,
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
          viewBox={`${CROP_X} ${CROP_Y} ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Dotted world map of SIS Global locations"
        >
          <defs>
            <clipPath id="sis-world-reveal">
              <rect data-world-reveal x={CROP_X - 16} y={CROP_Y - 16} width="0" height={VIEW_H + 32} />
            </clipPath>
          </defs>

          <WorldDots />

          {active ? (
            <g className="map-links" pointerEvents="none">
              {links.map((location) => (
                <line
                  key={location.id}
                  x1={active.x}
                  y1={active.y}
                  x2={location.x}
                  y2={location.y}
                  stroke="#9AA7B4"
                  strokeWidth="1.1"
                  strokeDasharray="3 5"
                />
              ))}
            </g>
          ) : null}

          <g className="sis-locations">
            {locations.map((location) => {
              const selected = location.id === active?.id
              return (
                <g key={location.id} transform={`translate(${location.x - PIN_W / 2} ${location.y - PIN_H})`}>
                  <g
                    data-map-pin={location.id}
                    className={selected ? 'map-pin is-active' : 'map-pin'}
                    pointerEvents="none"
                  >
                    <path
                      d={`M${PIN_W / 2} ${PIN_H}C${PIN_W / 2} ${PIN_H} 0 ${PIN_H * 0.58} 0 ${PIN_H * 0.36}A${PIN_W / 2} ${PIN_W / 2} 0 1 1 ${PIN_W} ${PIN_H * 0.36}C${PIN_W} ${PIN_H * 0.58} ${PIN_W / 2} ${PIN_H} ${PIN_W / 2} ${PIN_H}Z`}
                      fill={selected ? '#101820' : '#C5CDD4'}
                    />
                    <circle cx={PIN_W / 2} cy={PIN_H * 0.36} r="3.1" fill="#fff" />
                  </g>
                  <circle
                    cx={PIN_W / 2}
                    cy={PIN_H - 8}
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

        {active ? (
          <p
            className="map-pin-label"
            style={{
              left: `${((active.x - CROP_X) / VIEW_W) * 100}%`,
              top: `${((active.y - CROP_Y) / VIEW_H) * 100}%`,
            }}
          >
            {active.country}
          </p>
        ) : null}
      </div>
    </div>
  )
}
