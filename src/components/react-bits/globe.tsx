import { useEffect, useMemo, useRef, useState } from 'react'
import GlobeView from 'react-globe.gl'
import type { GlobeMethods } from 'react-globe.gl'
import * as THREE from 'three'

import { prefersReducedMotion } from '@/lib/motion'

import './globe.css'

export type GlobeArc = {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  color?: string | string[]
  altitude?: number
}

export type GlobeMarker = {
  id: string
  lat: number
  lng: number
  label?: string
  headquarters?: boolean
}

type GlobeProps = {
  width?: number | 'auto'
  height?: number | 'auto'
  primaryColor?: string
  neutralColor?: string
  atmosphereColor?: string
  showAtmosphere?: boolean
  autoRotateSpeed?: number
  enableZoom?: boolean
  interactive?: boolean
  arcAnimationDuration?: number
  cameraAltitude?: number
  pointSize?: number
  pointResolution?: number
  atmosphereAltitude?: number
  globeOpacity?: number
  landDotRows?: number
  landMapUrl?: string
  className?: string
  arcs?: GlobeArc[]
  markers?: GlobeMarker[]
  focus?: { lat: number; lng: number }
  activeId?: string
  onReady?: () => void
  onGlobeClick?: (coords: { lat: number; lng: number }, event: MouseEvent) => void
  onMarkerActivate?: (id: string) => void
}

type LandDot = { lat: number; lng: number }

const landCache = new Map<string, Promise<LandDot[]>>()

function loadLandDots(url: string, rows: number) {
  const key = `${url}:${rows}`
  const cached = landCache.get(key)
  if (cached) return cached

  const next = new Promise<LandDot[]>((resolve) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) {
        resolve([])
        return
      }
      context.drawImage(image, 0, 0)
      const pixels = context.getImageData(0, 0, image.width, image.height).data
      const dots: LandDot[] = []
      const step = 180 / rows

      for (let lat = -90 + step / 2; lat < 90; lat += step) {
        const cols = Math.max(1, Math.round(rows * 2 * Math.cos((lat * Math.PI) / 180)))
        const lngStep = 360 / cols
        for (let lng = -180 + lngStep / 2; lng < 180; lng += lngStep) {
          const x = Math.min(image.width - 1, Math.floor(((lng + 180) / 360) * image.width))
          const y = Math.min(image.height - 1, Math.floor(((90 - lat) / 180) * image.height))
          if (pixels[(y * image.width + x) * 4] > 16) dots.push({ lat, lng })
        }
      }
      resolve(dots)
    }
    image.onerror = () => resolve([])
    image.src = url
  })

  landCache.set(key, next)
  return next
}

function arcAltitude(arc: object) {
  const item = arc as GlobeArc
  if (item.altitude != null) return item.altitude
  const distance = Math.hypot(item.startLat - item.endLat, item.startLng - item.endLng)
  return Math.min(0.38, 0.05 + distance / 220)
}

export default function Globe({
  width = 'auto',
  height = 'auto',
  primaryColor = 'rgb(26, 110, 196)',
  neutralColor = 'rgb(138, 151, 168)',
  atmosphereColor,
  showAtmosphere = true,
  autoRotateSpeed = 0.45,
  enableZoom = false,
  interactive = true,
  arcAnimationDuration = 2200,
  cameraAltitude = 2.05,
  pointSize = 0.22,
  pointResolution = 5,
  atmosphereAltitude = 0.1,
  globeOpacity = 1,
  landDotRows = 140,
  landMapUrl = '/globe/earth-topology.png',
  className,
  arcs,
  markers = [],
  focus,
  activeId,
  onReady,
  onGlobeClick,
  onMarkerActivate,
}: GlobeProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const activateRef = useRef(onMarkerActivate)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [landDots, setLandDots] = useState<LandDot[]>([])
  const reduced = prefersReducedMotion()
  const globeMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: '#d5dde6',
    emissive: '#000000',
    shininess: 0,
    transparent: globeOpacity < 1,
    opacity: globeOpacity,
  }), [globeOpacity])

  activateRef.current = onMarkerActivate

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const measure = () => {
      const nextWidth = width === 'auto' ? root.clientWidth : width
      const nextHeight = height === 'auto' ? root.clientHeight || nextWidth : height
      setSize((prev) => (
        prev.width === nextWidth && prev.height === nextHeight
          ? prev
          : { width: nextWidth, height: nextHeight }
      ))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [height, width])

  useEffect(() => {
    let alive = true
    loadLandDots(landMapUrl, landDotRows).then((dots) => {
      if (alive) setLandDots(dots)
    })
    return () => {
      alive = false
    }
  }, [landDotRows, landMapUrl])

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return
    const controls = globe.controls()
    controls.autoRotate = !reduced && autoRotateSpeed > 0
    controls.autoRotateSpeed = autoRotateSpeed
    controls.enableZoom = enableZoom
    controls.enablePan = false
  }, [autoRotateSpeed, enableZoom, reduced, landDots, size])

  useEffect(() => {
    const globe = globeRef.current
    if (!globe || !focus) return
    globe.pointOfView({ ...focus, altitude: cameraAltitude }, reduced ? 0 : 900)
  }, [cameraAltitude, focus, reduced])

  const pinData = useMemo(
    () => markers.map((marker) => ({ ...marker, active: marker.id === activeId })),
    [activeId, markers],
  )

  const rings = useMemo(
    () => pinData.filter((marker) => marker.active || marker.headquarters),
    [pinData],
  )

  return (
    <div ref={rootRef} className={className ? `react-bits-globe ${className}` : 'react-bits-globe'}>
      {size.width > 0 && size.height > 0 ? (
        <GlobeView
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          globeMaterial={globeMaterial}
          showGlobe
          showAtmosphere={showAtmosphere}
          atmosphereColor={atmosphereColor ?? neutralColor}
          atmosphereAltitude={atmosphereAltitude}
          rendererConfig={{ antialias: true, alpha: true }}
          onGlobeReady={() => {
            const globe = globeRef.current
            if (!globe) return
            globe.pointOfView({
              lat: focus?.lat ?? 24.7,
              lng: focus?.lng ?? 38,
              altitude: cameraAltitude,
            })
            const controls = globe.controls()
            controls.autoRotate = !reduced && autoRotateSpeed > 0
            controls.autoRotateSpeed = autoRotateSpeed
            controls.enableZoom = enableZoom
            controls.enablePan = false
            onReady?.()
          }}
          onGlobeClick={onGlobeClick}
          pointsData={landDots}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => neutralColor}
          pointAltitude={0.002}
          pointRadius={pointSize}
          pointResolution={pointResolution}
          pointsMerge
          pointsTransitionDuration={0}
          arcsData={arcs ?? []}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={(arc: object) => (arc as GlobeArc).color ?? [primaryColor, primaryColor]}
          arcAltitude={arcAltitude}
          arcStroke={0.42}
          arcDashLength={0.35}
          arcDashGap={0.55}
          arcDashAnimateTime={reduced ? 0 : arcAnimationDuration}
          arcsTransitionDuration={0}
          ringsData={rings}
          ringLat="lat"
          ringLng="lng"
          ringColor={(marker: object) => (
            (marker as GlobeMarker & { active?: boolean }).active
              ? 'rgba(26, 110, 196, 0.45)'
              : 'rgba(9, 32, 70, 0.28)'
          )}
          ringMaxRadius={3.2}
          ringPropagationSpeed={reduced ? 0 : 1.6}
          ringRepeatPeriod={reduced ? 0 : 1800}
          htmlElementsData={pinData}
          htmlLat="lat"
          htmlLng="lng"
          htmlElement={(marker) => {
            const pin = marker as GlobeMarker & { active?: boolean }
            const button = document.createElement('button')
            button.type = 'button'
            button.className = [
              'globe-pin',
              pin.headquarters ? 'is-hq' : '',
              pin.active ? 'is-active' : '',
            ].filter(Boolean).join(' ')
            button.setAttribute('aria-label', pin.label ?? pin.id)
            button.addEventListener('pointerenter', () => activateRef.current?.(pin.id))
            button.addEventListener('focus', () => activateRef.current?.(pin.id))
            button.addEventListener('click', () => activateRef.current?.(pin.id))
            return button
          }}
          htmlElementVisibilityModifier={(element, visible) => {
            element.style.opacity = visible ? '1' : '0'
          }}
          enablePointerInteraction={interactive}
        />
      ) : null}
    </div>
  )
}
