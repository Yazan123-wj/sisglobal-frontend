import { useId, useMemo, useRef } from 'react'

import DotField from '@/components/DotField'
import { globalLocations } from '@/data/locations'
import type { GlobalLocation } from '@/data/locations'
import regionMap from '@/data/regionMap.json'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

const PIN_W = 44
const PIN_H = 60
const HIT_R = 46

type MapLocation = GlobalLocation & { x: number; y: number }

type DottedWorldMapProps = {
  activeId: string
  onActivate: (id: string) => void
}

export default function DottedWorldMap({ activeId, onActivate }: DottedWorldMapProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const rawId = useId().replace(/:/g, '')
  const landClipId = `land-clip-${rawId}`
  const pinShadowId = `map-pin-shadow-${rawId}`

  const locations = useMemo<MapLocation[]>(
    () =>
      globalLocations.flatMap((location) => {
        const point = regionMap.locations[location.id as keyof typeof regionMap.locations]
        if (!point) return []
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
          aria-label="Map of SIS Global locations across the Middle East, Africa and Europe"
        >
          <defs>
            <clipPath id={landClipId}>
              {regionMap.countries.map((country) => (
                <path key={country.iso} d={country.d} />
              ))}
            </clipPath>
            <filter id={pinShadowId} x="-40%" y="-20%" width="180%" height="180%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor="#0B234A" floodOpacity="0.22" />
            </filter>
            <radialGradient id={`${rawId}-pin-glow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B234A" stopOpacity="0.2" />
              <stop offset="55%" stopColor="#0B234A" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0B234A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${rawId}-side-fade`} cx="38%" cy="36%" r="78%">
              <stop offset="42%" stopColor="#f7f8fa" stopOpacity="0" />
              <stop offset="66%" stopColor="#f7f8fa" stopOpacity="0.4" />
              <stop offset="86%" stopColor="#f7f8fa" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#f7f8fa" stopOpacity="1" />
            </radialGradient>
          </defs>

          <rect width={regionMap.width} height={regionMap.height} fill="#f7f8fa" />

          <foreignObject
            width={regionMap.width}
            height={regionMap.height}
            clipPath={`url(#${landClipId})`}
            pointerEvents="none"
          >
            <div className="map-dotfield">
              <DotField
                lightMode
                pattern="grid"
                gradientFrom="#b8c5d3"
                gradientTo="#7d90a6"
                gradientAngle={135}
                glowColor="#1a6ec4"
                dotRadius={0.8}
                dotSpacing={4}
                cursorRadius={110}
                bulgeStrength={0.55}
                glowRadius={80}
                glowIntensity={0.7}
                baseOpacity={0.7}
                holdToZoom={false}
                intro
              />
            </div>
          </foreignObject>

          <rect
            className="map-side-fade"
            width={regionMap.width}
            height={regionMap.height}
            fill={`url(#${rawId}-side-fade)`}
            pointerEvents="none"
          />

          <g className="sis-locations">
            {locations.map((location) => {
              const selected = location.id === active?.id
              const pinFill = selected || location.headquarters ? '#0B234A' : '#1a6ec4'

              return (
                <g
                  key={location.id}
                  className={selected ? 'map-pin-group is-active' : 'map-pin-group'}
                  transform={`translate(${location.x - PIN_W / 2} ${location.y - PIN_H})`}
                >
                  <circle
                    className="map-pin-halo"
                    cx={PIN_W / 2}
                    cy={PIN_H}
                    r="40"
                    fill={`url(#${rawId}-pin-glow)`}
                    pointerEvents="none"
                  />
                  <g className={selected ? 'map-pin-wrap is-active' : 'map-pin-wrap'}>
                    <g
                      data-map-pin={location.id}
                      className={selected ? 'map-pin is-active' : 'map-pin'}
                      pointerEvents="none"
                      filter={`url(#${pinShadowId})`}
                    >
                      <path
                        d={`M${PIN_W / 2} ${PIN_H}C${PIN_W / 2} ${PIN_H} 0 ${PIN_H * 0.58} 0 ${PIN_H * 0.36}A${PIN_W / 2} ${PIN_W / 2} 0 1 1 ${PIN_W} ${PIN_H * 0.36}C${PIN_W} ${PIN_H * 0.58} ${PIN_W / 2} ${PIN_H} ${PIN_W / 2} ${PIN_H}Z`}
                        fill={pinFill}
                        stroke="#ffffff"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                      />
                      <circle cx={PIN_W / 2} cy={PIN_H * 0.34} r="6" fill="#ffffff" />
                    </g>
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
