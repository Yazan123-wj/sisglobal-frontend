import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { FeatureCollection, Geometry, Position } from 'geojson'

import sisCountries from '@/data/sisCountries.json'
import worldCountries from '@/data/worldCountries.json'
import { globalLocations, headquarters } from '@/data/locations'

type CountryProps = { id: string; name: string }

const VIEW_W = 1000
const VIEW_H = 740
const PAD = 28
const INNER_W = VIEW_W - PAD * 2
const INNER_H = VIEW_H - PAD * 2
const FRAME_SOUTH = -36
const FRAME_NORTH = 62
const FRAME_MID_LON = 17
const FRAME_LAT = FRAME_NORTH - FRAME_SOUTH
const FRAME_LON = FRAME_LAT * (INNER_W / INNER_H)
const FRAME_WEST = FRAME_MID_LON - FRAME_LON / 2
const FRAME_EAST = FRAME_MID_LON + FRAME_LON / 2
const WORLD_WEST = -170
const WORLD_EAST = 190
const WORLD_SOUTH = -58
const WORLD_NORTH = 84
const DEFAULT_ZOOM = 1
const MIN_ZOOM = 0.32
const MAX_ZOOM = 12
const ZOOM_FACTOR = 1.45
const DEGREE = INNER_H / FRAME_LAT
const ORIGIN_X = PAD
const ORIGIN_Y = PAD

const labelOffset: Record<string, { dx: number; dy: number; short?: string }> = {
  'united-kingdom': { dx: 14, dy: -8 },
  'saudi-arabia': { dx: 18, dy: 6 },
  egypt: { dx: -14, dy: 16 },
  'united-arab-emirates': { dx: 16, dy: 14, short: 'UAE' },
  palestine: { dx: -58, dy: -6 },
  jordan: { dx: 14, dy: 12 },
  tanzania: { dx: 14, dy: 6 },
  syria: { dx: 14, dy: -12 },
}

function project(lon: number, lat: number): [number, number] {
  return [ORIGIN_X + (lon - FRAME_WEST) * DEGREE, ORIGIN_Y + (FRAME_NORTH - lat) * DEGREE]
}

const [HQ_X, HQ_Y] = project(headquarters.lng, headquarters.lat)
const [WORLD_X0, WORLD_Y0] = project(WORLD_WEST, WORLD_NORTH)
const [WORLD_X1, WORLD_Y1] = project(WORLD_EAST, WORLD_SOUTH)

function ringPath(ring: Position[]) {
  if (ring.length < 3) return ''
  const avgLat = ring.reduce((sum, point) => sum + point[1], 0) / ring.length
  if (avgLat < -56) return ''
  const [sx, sy] = project(ring[0][0], ring[0][1])
  let d = `M${sx.toFixed(1)} ${sy.toFixed(1)}`
  for (let i = 1; i < ring.length; i++) {
    const [x, y] = project(ring[i][0], ring[i][1])
    d += `L${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return `${d}Z`
}

function polygonPath(rings: Position[][]) {
  return rings.map(ringPath).join('')
}

function geometryPath(geometry: Geometry) {
  if (geometry.type === 'Polygon') return polygonPath(geometry.coordinates)
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.map(polygonPath).join('')
  return ''
}

function clampAxis(value: number, start: number, end: number, view: number) {
  const margin = Math.min(120, Math.max(40, (end - start) * 0.15))
  return Math.max(-end + margin, Math.min(view - start - margin, value))
}

function clampPan(x: number, y: number, zoom: number) {
  const left = HQ_X + (WORLD_X0 - HQ_X) * zoom
  const right = HQ_X + (WORLD_X1 - HQ_X) * zoom
  const top = HQ_Y + (WORLD_Y0 - HQ_Y) * zoom
  const bottom = HQ_Y + (WORLD_Y1 - HQ_Y) * zoom
  return {
    x: clampAxis(x, left, right, VIEW_W),
    y: clampAxis(y, top, bottom, VIEW_H),
  }
}

function mapped(x: number, y: number, zoom: number, panX: number, panY: number): [number, number] {
  return [HQ_X + (x - HQ_X) * zoom + panX, HQ_Y + (y - HQ_Y) * zoom + panY]
}

const worldPaths = (worldCountries as FeatureCollection<Geometry>).features
  .map((feature) => geometryPath(feature.geometry))
  .filter(Boolean)

const sisPaths = (sisCountries as FeatureCollection<Geometry, CountryProps>).features.map((feature) => ({
  id: feature.properties.id,
  name: feature.properties.name,
  d: geometryPath(feature.geometry),
}))

type RegionPresenceMapProps = {
  hoveredId: string | null
  onHover: (id: string) => void
  onLeave: () => void
  onActivate: (id: string) => void
}

export default function RegionPresenceMap({ hoveredId, onHover, onLeave, onActivate }: RegionPresenceMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef<{ id: number; x: number; y: number; panX: number; panY: number; moved: boolean } | null>(null)
  const skipClick = useRef(false)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [grabbing, setGrabbing] = useState(false)

  const viewPoint = (event: ReactPointerEvent) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * VIEW_W,
      y: ((event.clientY - rect.top) / rect.height) * VIEW_H,
    }
  }

  const zoomTo = (next: number) => {
    const value = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next))
    setZoom(value)
    setPan(clampPan(pan.x, pan.y, value))
  }

  const onPointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return
    const point = viewPoint(event)
    drag.current = { id: event.pointerId, x: point.x, y: point.y, panX: pan.x, panY: pan.y, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const current = drag.current
    if (!current || current.id !== event.pointerId) return
    const point = viewPoint(event)
    const dx = point.x - current.x
    const dy = point.y - current.y
    if (!current.moved && dx * dx + dy * dy > 16) {
      current.moved = true
      setGrabbing(true)
    }
    if (current.moved) setPan(clampPan(current.panX + dx, current.panY + dy, zoom))
  }

  const onPointerUp = (event: ReactPointerEvent<SVGSVGElement>) => {
    const current = drag.current
    if (!current || current.id !== event.pointerId) return
    skipClick.current = current.moved
    drag.current = null
    setGrabbing(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const activate = (id: string) => {
    if (skipClick.current) {
      skipClick.current = false
      return
    }
    onActivate(id)
  }

  return (
    <div
      className={`region-presence-map is-pannable${grabbing ? ' is-grabbing' : ''}`}
      onPointerLeave={() => { if (!drag.current) onLeave() }}
    >
      <svg
        ref={svgRef}
        className="presence-world"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="SIS Global countries across Europe, the Middle East, and Africa"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <g transform={`translate(${HQ_X + pan.x} ${HQ_Y + pan.y}) scale(${zoom}) translate(${-HQ_X} ${-HQ_Y})`}>
          <g className="presence-world-land">
            {worldPaths.map((d, index) => (
              <path key={index} d={d} fillRule="evenodd" />
            ))}
          </g>
          <g className="presence-world-hits">
            {sisPaths.map((country) => (
              <path
                key={country.id}
                d={country.d}
                fillRule="evenodd"
                className={country.id === hoveredId ? 'is-active' : undefined}
                aria-label={country.name}
                onPointerEnter={() => onHover(country.id)}
                onFocus={() => onHover(country.id)}
                onClick={() => activate(country.id)}
              />
            ))}
          </g>
        </g>
        <g className="presence-pins">
          {globalLocations.map((location) => {
            const [x, y] = project(location.lng, location.lat)
            const [mx, my] = mapped(x, y, zoom, pan.x, pan.y)
            const active = location.id === hoveredId
            const hq = Boolean(location.headquarters)
            const offset = labelOffset[location.id]
            const label = offset?.short ?? location.country
            return (
              <g
                key={location.id}
                className={`presence-pin${active ? ' is-active' : ''}${hq ? ' is-hq' : ''}`}
                transform={`translate(${mx.toFixed(1)} ${my.toFixed(1)})`}
                onPointerEnter={() => onHover(location.id)}
                onClick={() => activate(location.id)}
              >
                <circle className="presence-pin-ring presence-pin-ring-outer" r={hq ? 28 : 22} />
                <circle className="presence-pin-ring presence-pin-ring-mid" r={hq ? 17 : 13} />
                <circle className="presence-pin-core" r={hq ? 8.5 : 6.5} />
                {hq ? (
                  <g className="presence-hq-badge" transform="translate(18 -22)">
                    <rect x={0} y={-9} width={34} height={18} rx={3} />
                    <text x={17} y={0} textAnchor="middle" dominantBaseline="middle">HQ</text>
                  </g>
                ) : null}
                {offset ? (
                  <text
                    className="presence-country-label"
                    x={offset.dx}
                    y={offset.dy}
                    textAnchor={offset.dx < 0 ? 'end' : 'start'}
                  >
                    {label}
                  </text>
                ) : null}
              </g>
            )
          })}
        </g>
      </svg>
      <div className="presence-map-zoom" role="group" aria-label="Map zoom">
        <button type="button" aria-label="Zoom in" onClick={() => zoomTo(zoom * ZOOM_FACTOR)} disabled={zoom >= MAX_ZOOM}>+</button>
        <button type="button" aria-label="Zoom out" onClick={() => zoomTo(zoom / ZOOM_FACTOR)} disabled={zoom <= MIN_ZOOM}>−</button>
      </div>
    </div>
  )
}
