// Logos come in every shape: a long wordmark, a square badge, a thin outline, a solid block.
// Giving them all the same height makes the wide and heavy ones look far bigger than the rest,
// so each logo gets its own height: every logo covers about the same area, and heavier marks
// are drawn a little smaller than light ones. The result is a multiplier of --logo-mark-height.

const BASE = 1.4
const MIN_SCALE = 0.42
// Keep in step with the row height of `.logo-track li` in index.css.
const MAX_SCALE = 1.3
const REFERENCE_DENSITY = 0.3
const SAMPLE_SIZE = 240
const INK_THRESHOLD = 0.08

type Ink = { ratio: number; density: number; trim: number }

const scales = new Map<string, number | null>()
const pending = new Map<string, Promise<void>>()

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function load(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

// Finds the drawn part of the logo: its box, and how much of that box is filled.
function readInk(image: HTMLImageElement): Ink | null {
  const fit = Math.min(1, SAMPLE_SIZE / Math.max(image.naturalWidth, image.naturalHeight))
  const width = Math.max(1, Math.round(image.naturalWidth * fit))
  const height = Math.max(1, Math.round(image.naturalHeight * fit))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return null
  context.drawImage(image, 0, 0, width, height)
  const { data } = context.getImageData(0, 0, width, height)

  // A file with no transparency sits on a background, so anything close to white is empty.
  let opaque = true
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 250) { opaque = false; break }
  }

  let left = width
  let right = -1
  let top = height
  let bottom = -1
  let ink = 0

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4
      const amount = opaque
        ? Math.min(1, (255 - Math.min(data[i], data[i + 1], data[i + 2])) / 64)
        : data[i + 3] / 255
      if (amount <= INK_THRESHOLD) continue
      ink += amount
      if (x < left) left = x
      if (x > right) right = x
      if (y < top) top = y
      if (y > bottom) bottom = y
    }
  }

  if (right < 0) return null
  const boxWidth = right - left + 1
  const boxHeight = bottom - top + 1
  return { ratio: boxWidth / boxHeight, density: ink / (boxWidth * boxHeight), trim: height / boxHeight }
}

function scaleFor(image: HTMLImageElement) {
  if (!image.naturalWidth || !image.naturalHeight) return null

  let ink: Ink | null = null
  try {
    ink = readInk(image)
  } catch {
    // The pixels cannot be read (a logo served from another origin): size it by shape alone.
  }
  const { ratio, density, trim } = ink ?? {
    ratio: image.naturalWidth / image.naturalHeight,
    density: REFERENCE_DENSITY,
    trim: 1,
  }

  const weight = clamp((REFERENCE_DENSITY / density) ** 0.25, 0.8, 1.25)
  const scale = clamp((BASE * weight) / Math.sqrt(ratio), MIN_SCALE, MAX_SCALE)
  // `trim` makes up for empty space around the logo inside its file.
  return Math.round(scale * trim * 1000) / 1000
}

export function hasLogoScale(src: string) {
  return scales.has(src)
}

export function logoScale(src: string) {
  return scales.get(src) ?? undefined
}

// Never rejects: a logo that cannot be measured keeps the default height.
export function measureLogo(src: string) {
  let job = pending.get(src)
  if (!job) {
    job = load(src)
      .then((image) => { scales.set(src, scaleFor(image)) })
      .catch(() => { scales.set(src, null) })
    pending.set(src, job)
  }
  return job
}
