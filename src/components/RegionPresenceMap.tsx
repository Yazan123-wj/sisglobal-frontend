import type { FeatureCollection, Geometry, Position } from 'geojson'

import sisCountries from '@/data/sisCountries.json'
import worldCountries from '@/data/worldCountries.json'
import { globalLocations } from '@/data/locations'

type CountryProps = { id: string; name: string }

const VIEW_W = 1000
const VIEW_H = 740
const WEST = -22
const EAST = 178
const SOUTH = -48
const NORTH = 76
const PAD = 12

function project(lon: number, lat: number): [number, number] {
  const x = PAD + ((lon - WEST) / (EAST - WEST)) * (VIEW_W - PAD * 2)
  const y = PAD + ((NORTH - lat) / (NORTH - SOUTH)) * (VIEW_H - PAD * 2)
  return [x, y]
}

function inView(lon: number, lat: number) {
  return lon >= WEST - 4 && lon <= EAST + 4 && lat >= SOUTH - 4 && lat <= NORTH + 4
}

function ringPath(ring: Position[]) {
  if (ring.length < 3 || !inView(ring[0][0], ring[0][1])) return ''
  const [sx, sy] = project(ring[0][0], ring[0][1])
  let d = `M${sx.toFixed(1)} ${sy.toFixed(1)}`
  for (let i = 1; i < ring.length; i++) {
    const [lon, lat] = ring[i]
    if (!inView(lon, lat)) continue
    const [x, y] = project(lon, lat)
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
  return (
    <div className="region-presence-map" onPointerLeave={onLeave}>
      <svg
        className="presence-world"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="SIS Global countries across Europe, the Middle East, and Africa"
      >
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
              onClick={() => onActivate(country.id)}
            />
          ))}
        </g>
        <g className="presence-pins">
          {globalLocations.map((location) => {
            const [x, y] = project(location.lng, location.lat)
            const active = location.id === hoveredId
            return (
              <g
                key={location.id}
                className={active ? 'presence-pin is-active' : 'presence-pin'}
                transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                onPointerEnter={() => onHover(location.id)}
                onClick={() => onActivate(location.id)}
              >
                <circle className="presence-pin-ring presence-pin-ring-outer" r={location.headquarters ? 26 : 22} />
                <circle className="presence-pin-ring presence-pin-ring-mid" r={location.headquarters ? 16 : 13} />
                <circle className="presence-pin-core" r={location.headquarters ? 8 : 6.5} />
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
