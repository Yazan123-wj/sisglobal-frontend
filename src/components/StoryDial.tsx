import { useRef, useState } from 'react'

import Arrow from '@/components/Arrow'
import { Draggable, gsap, useGSAP } from '@/lib/gsap'

type StoryItem = {
  year: string
  title: string
  copy: string
}

function pad(index: number) {
  return String(index + 1).padStart(2, '0')
}

function wrapIndex(value: number, count: number) {
  return ((value % count) + count) % count
}

function shortestRotation(from: number, to: number) {
  const delta = ((to - from + 540) % 360) - 180
  return from + delta
}

export default function StoryDial({ items }: { items: StoryItem[] }) {
  const root = useRef<HTMLDivElement>(null)
  const wheel = useRef<HTMLDivElement>(null)
  const ticks = useRef<HTMLButtonElement[]>([])
  const activeRef = useRef(0)
  const goToRef = useRef<(index: number) => void>(() => {})
  const [active, setActive] = useState(0)
  const count = items.length
  const step = 360 / Math.max(count, 1)
  const item = items[active] ?? items[0]

  useGSAP(() => {
    const wheelEl = wheel.current
    const stage = wheelEl?.parentElement
    const rootEl = root.current
    if (!wheelEl || !stage || !rootEl || count < 2) return

    const nodes = ticks.current.filter(Boolean)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let paused = false
    let inView = true
    let autoPlay: gsap.core.Tween | undefined
    let move: gsap.core.Tween | undefined

    const measure = () => {
      const radius = Math.max(240, Math.min(stage.clientWidth * 0.36, 340))
      const cap = radius * 0.62
      stage.style.setProperty('--dial-r', `${-radius}px`)
      stage.style.setProperty('--dial-shift', `${radius - cap}px`)
      stage.style.height = `${cap + 80}px`
    }

    const layout = () => {
      const rotation = Number(gsap.getProperty(wheelEl, 'rotation')) || 0
      nodes.forEach((node, index) => {
        let delta = (index * step + rotation) % 360
        if (delta > 180) delta -= 360
        if (delta < -180) delta += 360
        const dist = Math.abs(delta)
        const t = gsap.utils.clamp(0, 1, dist / 95)
        const label = node.querySelector('b')
        if (label) {
          gsap.set(label, {
            opacity: gsap.utils.interpolate(1, 0.22, t),
            scale: gsap.utils.interpolate(1.85, 0.62, Math.min(t * 1.12, 1)),
          })
        }
        node.classList.toggle('is-active', dist < step / 2)
      })

      const next = wrapIndex(Math.round(-rotation / step), count)
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    }

    const schedule = () => {
      autoPlay?.kill()
      if (reduced.matches || paused || !inView) return
      autoPlay = gsap.delayedCall(4.2, () => {
        goTo(wrapIndex(activeRef.current + 1, count))
      })
    }

    const goTo = (index: number) => {
      const current = Number(gsap.getProperty(wheelEl, 'rotation')) || 0
      move?.kill()
      move = gsap.to(wheelEl, {
        rotation: shortestRotation(current, -index * step),
        duration: 0.7,
        ease: 'power3.out',
        onUpdate: layout,
        onComplete: () => {
          drag.update()
          schedule()
        },
      })
    }

    goToRef.current = goTo

    measure()
    gsap.set(wheelEl, { rotation: 0, transformOrigin: '0 0' })
    layout()

    const stillInside = () =>
      rootEl.matches(':hover') || (document.activeElement instanceof Node && rootEl.contains(document.activeElement))

    const [drag] = Draggable.create(wheelEl, {
      type: 'rotation',
      inertia: true,
      dragClickables: true,
      dragResistance: 0.12,
      snap: (endValue) => Math.round(endValue / step) * step,
      onPress() {
        paused = true
        autoPlay?.kill()
      },
      onDrag: layout,
      onThrowUpdate: layout,
      onRelease() {
        if (!this.isThrowing && !stillInside()) {
          paused = false
          schedule()
        }
      },
      onThrowComplete() {
        layout()
        if (!stillInside()) {
          paused = false
          schedule()
        }
      },
      onClick(event) {
        const pointer = 'clientX' in event ? event : (event as MouseEvent)
        const originBox = wheelEl.getBoundingClientRect()
        const degrees = (Math.atan2(pointer.clientX - originBox.left, originBox.top - pointer.clientY) * 180) / Math.PI
        const rotation = Number(gsap.getProperty(wheelEl, 'rotation')) || 0
        goTo(wrapIndex(Math.round((degrees - rotation) / step), count))
      },
    })

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        goTo(wrapIndex(activeRef.current + 1, count))
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        goTo(wrapIndex(activeRef.current - 1, count))
      }
    }

    const pause = () => {
      paused = true
      autoPlay?.kill()
    }
    const resume = (event?: FocusEvent) => {
      if (event?.relatedTarget instanceof Node && rootEl.contains(event.relatedTarget)) return
      paused = false
      schedule()
    }

    const onResize = () => {
      measure()
      layout()
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) schedule()
      else autoPlay?.kill()
    }, { threshold: 0.35 })

    observer.observe(rootEl)
    stage.addEventListener('keydown', onKey)
    rootEl.addEventListener('mouseenter', pause)
    rootEl.addEventListener('mouseleave', resume)
    rootEl.addEventListener('focusin', pause)
    rootEl.addEventListener('focusout', resume)
    window.addEventListener('resize', onResize)
    schedule()

    return () => {
      autoPlay?.kill()
      move?.kill()
      drag.kill()
      observer.disconnect()
      stage.removeEventListener('keydown', onKey)
      rootEl.removeEventListener('mouseenter', pause)
      rootEl.removeEventListener('mouseleave', resume)
      rootEl.removeEventListener('focusin', pause)
      rootEl.removeEventListener('focusout', resume)
      window.removeEventListener('resize', onResize)
    }
  }, { scope: root, dependencies: [count] })

  const stepBy = (direction: number) => {
    goToRef.current(wrapIndex(activeRef.current + direction, count))
  }

  return (
    <div ref={root} className="about-dial">
      <h2>Our Story</h2>
      <div className="about-dial-board">
        <button
          className="about-dial-nav"
          type="button"
          aria-label="Previous milestone"
          onClick={() => stepBy(-1)}
        >
          <Arrow dir="left" />
        </button>
        <div className="about-dial-copy" aria-live="polite">
          <p className="about-dial-meta">
            <b>{item.year}</b>
            <span>{item.title}</span>
          </p>
          <p>{item.copy}</p>
        </div>
        <button
          className="about-dial-nav"
          type="button"
          aria-label="Next milestone"
          onClick={() => stepBy(1)}
        >
          <Arrow dir="right" />
        </button>
      </div>
      <div className="about-dial-stage" tabIndex={0} aria-label="Our Story timeline">
        <div ref={wheel} className="about-dial-wheel">
          {items.map((entry, index) => (
            <button
              key={`${entry.year}-${entry.title}`}
              ref={(node) => {
                if (node) ticks.current[index] = node
              }}
              className="about-dial-tick"
              type="button"
              style={{ transform: `rotate(${index * step}deg)` }}
              aria-label={`${entry.year} ${entry.title}`}
              aria-pressed={index === active}
            >
              <span>
                <b>{pad(index)}</b>
                <i />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
