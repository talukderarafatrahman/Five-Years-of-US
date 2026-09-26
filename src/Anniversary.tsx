import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Label, Reveal } from './components'

const ANNIVERSARY_IMAGES = Object.entries(
  import.meta.glob<string>('./Components/annivrsary/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
)
  .sort(([left], [right]) => left.localeCompare(right, undefined, { numeric: true }))
  .map(([, src]) => src)

export default function AnniversaryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null ? null : (current + ANNIVERSARY_IMAGES.length - 1) % ANNIVERSARY_IMAGES.length,
        )
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % ANNIVERSARY_IMAGES.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex])

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + ANNIVERSARY_IMAGES.length - 1) % ANNIVERSARY_IMAGES.length,
    )
  }

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % ANNIVERSARY_IMAGES.length,
    )
  }

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="sticky top-0 z-40 border-b border-rose/20 bg-ivory/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-12">
          <a
            href="./index.html"
            className="inline-flex items-center gap-2 text-sm text-burgundy transition-colors hover:text-rose"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Our Story
          </a>
          <span className="font-serif text-lg text-burgundy">
            Aru <span className="text-rose">♡</span> Muna
          </span>
        </nav>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 pb-20 pt-12 md:px-12 md:pt-16">
        <Reveal className="mb-10 border-b border-rose/20 pb-8 md:mb-12">
          <Label>September 26, 2026 · Five years together</Label>
          <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-burgundy md:text-6xl">
            Anniversary Memories
          </h1>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
          {ANNIVERSARY_IMAGES.map((src, index) => (
            <Reveal key={src} delay={(index % 10) * 35} className="h-full">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open anniversary memory ${index + 1}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden bg-blush/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
              >
                <img
                  src={src}
                  alt={`Anniversary memory ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-3 pt-8 text-left text-xs text-white/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Memory {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </main>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Anniversary memory ${activeIndex + 1} of ${ANNIVERSARY_IMAGES.length}`}
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-7xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between text-sm text-white/75">
              <span>
                Memory {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(ANNIVERSARY_IMAGES.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                aria-label="Close gallery"
                onClick={() => setActiveIndex(null)}
                className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-rose"
              >
                <X size={22} />
              </button>
            </div>
            <div
              className="flex touch-pan-y items-center justify-center gap-1 sm:gap-5"
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0]?.clientX ?? null
              }}
              onTouchEnd={(event) => {
                const startX = touchStartX.current
                const endX = event.changedTouches[0]?.clientX
                touchStartX.current = null
                if (startX === null || endX === undefined) return

                const distance = endX - startX
                if (Math.abs(distance) < 48) return
                if (distance < 0) showNext()
                else showPrevious()
              }}
              onTouchCancel={() => {
                touchStartX.current = null
              }}
            >
              <button
                type="button"
                aria-label="Previous image"
                onClick={showPrevious}
                className="flex h-10 w-10 shrink-0 items-center justify-center text-white/80 transition-colors hover:text-white sm:h-12 sm:w-12"
              >
                <ChevronLeft size={30} />
              </button>
              <img
                src={ANNIVERSARY_IMAGES[activeIndex]}
                alt={`Anniversary memory ${activeIndex + 1}`}
                className="max-h-[78vh] max-w-[calc(100vw-7rem)] object-contain sm:max-w-[calc(100vw-10rem)]"
              />
              <button
                type="button"
                aria-label="Next image"
                onClick={showNext}
                className="flex h-10 w-10 shrink-0 items-center justify-center text-white/80 transition-colors hover:text-white sm:h-12 sm:w-12"
              >
                <ChevronRight size={30} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}