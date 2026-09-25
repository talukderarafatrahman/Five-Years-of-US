import { useEffect, useRef, useState, type ReactNode } from 'react'

/* Reveal-on-scroll wrapper */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible')
          io.unobserve(el)
        }
      },
      { threshold: 0.14 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* Small eyebrow / label */
export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block text-[0.7rem] font-medium uppercase tracking-[0.32em] text-dusty ${className}`}
    >
      {children}
    </span>
  )
}

/* Section heading */
export function Heading({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={`font-serif font-light leading-[1.05] text-burgundy tracking-[-0.01em] ${className}`}
    >
      {children}
    </h2>
  )
}

export function PrimaryButton({
  children,
  onClick,
  href,
}: {
  children: ReactNode
  onClick?: () => void
  href?: string
}) {
  const cls =
    'group inline-flex items-center gap-2 rounded-full bg-burgundy px-7 py-3.5 text-sm font-medium text-ivory shadow-[0_10px_30px_-10px_rgba(90,31,43,0.6)] transition-all duration-300 hover:bg-burgundy-deep hover:shadow-[0_16px_40px_-12px_rgba(90,31,43,0.7)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'
  if (href)
    return (
      <a href={href} onClick={onClick} className={cls}>
        {children}
      </a>
    )
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  )
}

export function SecondaryButton({
  children,
  href,
  onClick,
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
}) {
  const cls =
    'inline-flex items-center gap-2 rounded-full border border-rose/50 bg-paper/60 px-7 py-3.5 text-sm font-medium text-burgundy backdrop-blur transition-all duration-300 hover:border-rose hover:bg-blush/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'
  if (href)
    return (
      <a href={href} onClick={onClick} className={cls}>
        {children}
      </a>
    )
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  )
}

/* Floating romantic particles */
export function Particles({ count = 18 }: { count?: number }) {
  const [items] = useState(() =>
    Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      size: 3 + Math.random() * 7,
      dur: 16 + Math.random() * 20,
      delay: -Math.random() * 30,
      o: 0.25 + Math.random() * 0.4,
      glyph:
        Math.random() > 0.86
          ? '💖'
          : Math.random() > 0.74
            ? '🤍'
            : Math.random() > 0.64
            ? '🌷'
            : Math.random() > 0.54
              ? '🌼'
              : Math.random() > 0.5
                ? '♡'
                : '✦',
    })),
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="float-particle absolute bottom-0 text-rose"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size + 11}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            // @ts-expect-error custom prop
            '--o': p.o,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  )
}

/* Heart traced letter-by-letter from a love phrase */
export function LoveHeart({
  phrase = 'I love you my girl ♡ ',
  count = 108,
  step = 0.11,
}: {
  phrase?: string
  count?: number
  step?: number
}) {
  const letters = useState(() => {
    // parametric heart curve
    const heart = (t: number) => ({
      x: 16 * Math.sin(t) ** 3,
      y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)),
    })
    const scale = 9.6
    const out: { x: number; y: number; rot: number; ch: string; delay: number }[] = []
    // Walk t from the bottom tip, clockwise, so the heart "draws" from the point up.
    for (let i = 0; i < count; i++) {
      const frac = i / count
      const t = Math.PI + frac * Math.PI * 2 // start at bottom tip
      const p = heart(t)
      const p2 = heart(t + 0.01)
      const rot = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI
      out.push({
        x: p.x * scale,
        y: p.y * scale,
        rot,
        ch: phrase[i % phrase.length],
        delay: i * step,
      })
    }
    return out
  })[0]

  const cycle = count * step + 2.4 // full build + a hold before it repeats

  return (
    <div
      className="relative mx-auto"
      style={{ width: 'min(90vw, 420px)', height: 'min(90vw, 420px)' }}
      aria-label="A heart drawn letter by letter from the phrase I love you my girl"
    >
      <div className="heart-core" />
      {letters.map((s, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 font-serif"
          style={{
            transform: `translate(${s.x}px, ${s.y}px) rotate(${s.rot}deg) translate(-50%, -50%)`,
          }}
        >
          <span
            className="trace-letter inline-block"
            style={{
              animationDelay: `${s.delay}s`,
              animationDuration: `${cycle}s`,
              fontSize: s.ch === '♡' ? '1.15rem' : '1rem',
              color: s.ch === '♡' ? '#ff7fb3' : '#ffb4d3',
            }}
          >
            {s.ch === ' ' ? ' ' : s.ch}
          </span>
        </span>
      ))}
    </div>
  )
}

/* Warm candlelight glow blob */
export function Glow({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`candle pointer-events-none absolute rounded-full blur-[90px] ${className}`}
    />
  )
}
