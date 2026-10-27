import { useMemo } from 'react'

import Globe from '@/components/react-bits/globe'
import { globalLocations, headquarters } from '@/data/locations'

type DottedWorldMapProps = {
  activeId: string
  onActivate: (id: string) => void
}

function nearestOffice(lat: number, lng: number) {
  return globalLocations.reduce((best, location) => {
    const distance = Math.hypot(location.lat - lat, location.lng - lng)
    if (!best || distance < best.distance) return { location, distance }
    return best
  }, null as { location: (typeof globalLocations)[number]; distance: number } | null)
}

export default function DottedWorldMap({ activeId, onActivate }: DottedWorldMapProps) {
  const hq = headquarters
  const active = globalLocations.find((location) => location.id === activeId) ?? hq

  const arcs = useMemo(
    () =>
      globalLocations
        .filter((location) => location.id !== hq.id)
        .map((location) => ({
          startLat: hq.lat,
          startLng: hq.lng,
          endLat: location.lat,
          endLng: location.lng,
          color: location.id === activeId
            ? ['#0a4a9c', '#4f9ad0']
            : ['#0a4a9c', '#1a6ec4'],
          altitude: location.id === activeId ? 0.28 : undefined,
        })),
    [activeId, hq],
  )

  const markers = useMemo(
    () =>
      globalLocations.map((location) => ({
        id: location.id,
        lat: location.lat,
        lng: location.lng,
        label: location.country,
        headquarters: location.headquarters,
      })),
    [],
  )

  return (
    <div className="dotted-world-map" aria-label="SIS Global locations on a 3D globe">
      <div className="map-frame">
        <Globe
          primaryColor="#1a6ec4"
          neutralColor="#5d6f84"
          atmosphereColor="#7d8b99"
          atmosphereAltitude={0.08}
          autoRotateSpeed={0.28}
          cameraAltitude={2.15}
          pointSize={0.28}
          landDotRows={160}
          arcs={arcs}
          markers={markers}
          activeId={activeId}
          focus={{ lat: active.lat, lng: active.lng }}
          onMarkerActivate={onActivate}
          onGlobeClick={({ lat, lng }) => {
            const match = nearestOffice(lat, lng)
            if (match && match.distance < 12) onActivate(match.location.id)
          }}
        />
      </div>
    </div>
  )
}
