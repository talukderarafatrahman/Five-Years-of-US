import { useEffect, useRef, useState } from 'react'
import AnniversaryPage from './Anniversary'
import {
  Reveal,
  Label,
  Heading,
  PrimaryButton,
  SecondaryButton,
  Particles,
  Glow,
  LoveHeart,
} from './components'
import storyImage from './Components/image/img2.png'
import aruImage from './Components/image/img4.png'
import monaImage from './Components/image/img3.png'
import hereImage from './Components/image/img6.jpg'
import thereImage from './Components/image/img5.png'
import homeImage from './Components/image/img11.png'

/* ---------- Data ---------- */
const NAV = [
  { label: 'Our Story', href: '#story' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Memories', href: '#memories' },
  { label: 'Letter', href: '#letter' },
  { label: 'Comment', href: '#comment' },
  { label: 'Love', href: '#final' },
]

const ALLOWED_COMMENT_EMAIL = 'talukderarafatrahman@gmail.com'
const COMMENT_RECIPIENT = 'subahtanzilamuna@gmail.com'

const TIMELINE = [
  {
    year: '2021',
    label: '01 — The Beginning',
    title: 'Where It All Started',
    text: 'September 26, 2021. The first chapter of our story.',
    phrase: 'Every beautiful story has a beginning. This was ours. ♡',
  },
  {
    year: '2022',
    label: '02 — Growing Together',
    title: 'Learning Each Other',
    text: "A year of conversations, little moments, laughter and slowly becoming an important part of each other's lives.",
    phrase: 'Little moments became big memories. 🌸',
  },
  {
    year: '2023',
    label: '03 — More Memories',
    title: 'More Than Just Moments',
    text: 'Another year passed, and our story collected more memories, more conversations, more smiles and more reasons to care.',
    phrase: 'Some memories stay forever. ✨',
  },
  {
    year: '2024',
    label: '04 — Through Every Moment',
    title: 'The Good Days & The Hard Days',
    text: 'Not every chapter was easy. There were moments of distance, misunderstandings and silence. But through every moment, our story continued.',
    phrase: 'Even difficult chapters belong to a beautiful story. 🤍',
  },
  {
    year: '2025',
    label: '05 — Still Us',
    title: 'Still Choosing Each Other',
    text: 'Another year, another collection of memories. Through everything, one thing remained: us.',
    phrase: 'Still here. Still us. Still choosing each other. ♾️',
  },
  {
    year: '2026',
    label: '06 — Five Years',
    title: 'Five Years of Us',
    text: 'September 26, 2026. Five years since the beginning. Five years of memories, laughter, conversations, distance, patience and love.',
    phrase: 'Five years down. Our story continues. ❤️',
  },
]

const CHAPTERS = [
  { n: 'Chapter One', title: 'The Beginning', year: '2021', note: 'Where everything started. ♡' },
  {
    n: 'Chapter Two',
    title: 'Growing Together',
    year: '2022',
    note: 'Learning, understanding and becoming closer.',
  },
  {
    n: 'Chapter Three',
    title: 'More Memories',
    year: '2023',
    note: 'More laughter. More conversations. More us.',
  },
  {
    n: 'Chapter Four',
    title: 'Every Moment',
    year: '2024',
    note: 'Through good days and difficult ones.',
  },
  {
    n: 'Chapter Five',
    title: 'Still Us',
    year: '2025 — 2026',
    note: 'Five years later, the story continues. ♾️',
  },
]

const GALLERY_CAPTIONS = [
  'The Beginning',
  'That Smile 🤍',
  'Little Moments',
  'Our Conversations',
  'Just Us',
  'A Memory Worth Keeping',
  'Another Beautiful Day 🌸',
  'Still My Favorite Person',
  'Five Years of Memories ✨',
  'Quiet Evenings',
  'Late-Night Calls 🌙',
  'The Way You Laugh',
  'Us, Always',
  'A Moment Frozen in Time',
  'Somewhere Together',
  'My Favorite View 🤍',
  'Everyday Magic ✨',
  'Holding On',
  'Golden Hours',
  'The Little Things 🌸',
]
const MEMORY_IMAGES = Object.values(
  import.meta.glob<string>('./Components/image/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
)
const GALLERY = MEMORY_IMAGES.map((src, i) => ({
  src,
  cap: GALLERY_CAPTIONS[i % GALLERY_CAPTIONS.length],
  span: i % 7 === 0 || i % 7 === 3 ? 'row-span-2' : '',
}))

const QUOTES = [
  'You are my favorite person. 🤍',
  'You are my best chapter. ✨',
  'You are my home. 🏡',
  'You are my peace. 🌙',
  'You are a part of my everyday life.',
  'Still choosing you. ♾️',
]

/* ---------- Photo placeholder ---------- */
function Photo({
  caption,
  className = '',
  src,
  videoSrc,
  fit = 'cover',
  onClick,
}: {
  caption?: string
  className?: string
  src?: string
  videoSrc?: string
  fit?: 'cover' | 'contain'
  onClick?: () => void
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!videoSrc || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(video)

    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [videoSrc])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!onClick) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <figure
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`group relative overflow-hidden rounded-[1.1rem] bg-gradient-to-br from-blush via-cream to-rose/30 shadow-none ring-0 ${
        onClick ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60' : ''
      } ${className}`}
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          controls
          playsInline
          preload="auto"
          poster={src}
          aria-label={caption ?? 'A memory from our story'}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : src ? (
        <img
          src={src}
          alt={caption ?? 'A memory from our story'}
          className={`absolute inset-0 h-full w-full ${
            fit === 'contain'
              ? 'bg-paper/70 object-contain'
              : 'object-cover object-center transition-transform duration-700 group-hover:scale-105'
          }`}
        />
      ) : null}
      <div className="grain absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
      {!src && !videoSrc && (
        <div className="relative flex h-full min-h-40 w-full flex-col items-center justify-center gap-2 p-6 text-center">
          <span className="text-2xl text-dusty/70">🌸</span>
          <span className="text-[0.68rem] uppercase tracking-[0.28em] text-dusty/80">
            Photo placeholder
          </span>
        </div>
      )}
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy-deep/70 to-transparent p-4 pt-10 text-left font-serif text-sm italic text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ---------- Navigation ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-rose/15 py-3 shadow-sm' : 'py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12">
        <a href="#top" className="font-serif text-lg text-burgundy">
          5 Years of Us <span className="text-rose">♡</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-ink/80 transition-colors hover:text-burgundy"
            >
              {n.label}
            </a>
          ))}
        </div>
        <a
          href="#top"
          className="hidden rounded-full border border-rose/40 px-5 py-2 text-sm text-burgundy transition-colors hover:bg-blush/50 md:inline-block"
        >
          Replay Our Story ↻
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-burgundy transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span className={`h-px w-6 bg-burgundy transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-px w-6 bg-burgundy transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </nav>
      {open && (
        <div className="glass mx-4 mt-3 rounded-2xl border border-rose/20 p-4 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-ink/85 transition-colors hover:bg-blush/50"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-burgundy px-3 py-3 text-center text-ivory"
          >
            Replay Our Story ↻
          </a>
        </div>
      )}
    </header>
  )
}

/* ---------- Section shell ---------- */
function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative px-6 md:px-12 ${className}`}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  )
}

function CommentBox() {
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState(ALLOWED_COMMENT_EMAIL)
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    if (email.trim().toLowerCase() !== ALLOWED_COMMENT_EMAIL) {
      setMessage('Only Mona can leave a comment from the allowed email address.')
      return
    }
    if (!comment.trim()) {
      setMessage('Write a little note before sending it.')
      return
    }

    setIsSending(true)
    const formData = new FormData()
    formData.append('email', email.trim().toLowerCase())
    formData.append('message', comment.trim())
    formData.append('_subject', 'A new note from Mona')
    formData.append('_template', 'table')
    formData.append('_captcha', 'true')
    formData.append('_honey', '')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${COMMENT_RECIPIENT}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      const result = (await response.json()) as { success?: boolean }
      if (!response.ok || result.success === false) throw new Error('Unable to send')
      setComment('')
      setMessage('Your note was sent to Aru. ♡')
    } catch {
      setMessage('The note could not be sent right now. Please try again in a moment.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Section id="comment" className="bg-cream/50 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Label>A little space for you</Label>
        <Heading className="mt-4 text-4xl md:text-5xl">Leave Me A Note 🤍</Heading>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink/75">
          Write something for Aru. Your note will be prepared as an email for him.
        </p>
      </Reveal>
      <Reveal delay={120} className="mx-auto mt-10 max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-[1.5rem] border border-rose/20 bg-paper p-7 shadow-[0_30px_70px_-40px_rgba(90,31,43,0.5)] md:p-10"
        >
          <label htmlFor="comment-email" className="text-sm font-medium text-burgundy">
            Your email
          </label>
          <input
            id="comment-email"
            type="email"
            value={email}
            readOnly
            aria-describedby="comment-email-help"
            className="mt-2 w-full rounded-xl border border-rose/30 bg-ivory px-4 py-3 text-ink blur-[6px] outline-none transition focus:border-burgundy focus:ring-2 focus:ring-rose/20"
            required
          />
          <p id="comment-email-help" className="mt-2 text-xs text-dusty/75">
            Your email is already filled in for the note.
          </p>
          <label htmlFor="comment-message" className="mt-6 block text-sm font-medium text-burgundy">
            Your comment
          </label>
          <textarea
            id="comment-message"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Write something from your heart..."
            rows={5}
            className="mt-2 w-full resize-y rounded-xl border border-rose/30 bg-ivory px-4 py-3 text-ink outline-none transition placeholder:text-dusty/60 focus:border-burgundy focus:ring-2 focus:ring-rose/20"
            required
          />
          <button
            type="submit"
            disabled={isSending}
            className="mt-6 inline-flex rounded-full bg-burgundy px-7 py-3.5 text-sm font-medium text-ivory transition hover:-translate-y-0.5 hover:bg-burgundy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {isSending ? 'Sending...' : 'Send Your Note ♡'}
          </button>
          {message && <p className="mt-4 text-sm italic text-dusty" role="status">{message}</p>}
        </form>
      </Reveal>
    </Section>
  )
}

export default function App() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption?: string } | null>(null)
  const [showAnniversary, setShowAnniversary] = useState(window.location.hash === '#anniversary')

  useEffect(() => {
    const syncPage = () => setShowAnniversary(window.location.hash === '#anniversary')
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  if (showAnniversary) return <AnniversaryPage />

  return (
    <div id="top" className="relative bg-ivory text-ink">
      <Nav />

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(30,15,20,0.82)] p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#1a0f15] shadow-[0_30px_80px_rgba(0,0,0,0.5)]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Close image"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-xl text-white transition hover:bg-black/50"
            >
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.caption ?? 'Open memory'}
              className="max-h-[90vh] w-full object-contain"
            />
            {selectedImage.caption && (
              <div className="border-t border-white/10 bg-black/20 px-5 py-3 text-center font-serif text-lg italic text-ivory">
                {selectedImage.caption}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------- HERO ---------- */}
      <section className="grain relative flex min-h-screen items-center overflow-hidden">
        <Glow className="candle -top-20 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 bg-gold/40" />
        <Glow className="bottom-0 right-0 h-[22rem] w-[22rem] bg-rose/40" />
        <Particles count={22} />
        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-12 px-6 pt-28 pb-20 md:grid-cols-[1.1fr_0.9fr] md:px-12">
          <div>
            <Reveal>
              <Label>A story that began with two people</Label>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-serif text-6xl font-light leading-none text-burgundy md:text-7xl">
                Aru <span className="sway text-rose">♡</span> Mona
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="shimmer mt-3 font-serif text-3xl font-light italic md:text-4xl">
                5 Years of Us
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-6 max-w-md text-lg text-ink/75">
                Five years, countless memories, one beautiful story.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <p className="mt-6 text-sm uppercase tracking-[0.22em] text-dusty/80">
                September 26, 2021 — September 26, 2026
              </p>
              <p className="mt-2 font-serif text-lg italic text-burgundy">
                Still choosing you, every day. ♾️
              </p>
            </Reveal>
            <Reveal delay={500}>
              <div className="mt-9 flex flex-wrap gap-4">
                <PrimaryButton href="#story">Begin Our Story →</PrimaryButton>
                <SecondaryButton href="#memories">Our Memories ↓</SecondaryButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={300} className="relative">
            <Photo
              src={homeImage}
              caption="A favorite memory together. 🤍"
              fit="cover"
              className="relative aspect-[4/5]"
            />
          </Reveal>
        </div>
        <a
          href="#story"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.28em] text-dusty/80 transition-colors hover:text-burgundy"
        >
          Scroll to discover our story ↓
        </a>
      </section>

      {/* ---------- OUR STORY BEGINS ---------- */}
      <Section id="story" className="py-28">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Photo
              src={storyImage}
              caption="The day our story began. 🌸"
              className="aspect-[4/5]"
            />
            <p className="mt-3 text-center text-sm italic text-dusty">
              The day our story began. 🌸
            </p>
          </Reveal>
          <div>
            <Reveal>
              <Label>September 26, 2021</Label>
              <Heading className="mt-4 text-4xl md:text-5xl">Our Story Begins</Heading>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 font-serif text-2xl font-light italic text-dusty">
                Some stories begin with a moment. Ours began with us.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 leading-relaxed text-ink/80">
                On September 26, 2021, two people started a journey they could never have imagined
                would become five beautiful years of memories, laughter, conversations, distance,
                patience and love.
              </p>
              <p className="mt-4 leading-relaxed text-ink/80">
                We didn't know what the future would bring. We only knew that something about our
                story was worth holding on to.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <blockquote className="mt-8 border-l-2 border-gold pl-5 font-serif text-xl italic text-burgundy">
                And somehow, five years later, here we are. Still us. 🤍
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- THE JOURNEY ---------- */}
      <Section className="border-y border-rose/15 bg-cream/50 py-24 text-center">
        <Reveal>
          <Heading className="mx-auto max-w-3xl text-4xl md:text-5xl">
            Five Years. So Many Moments.
          </Heading>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ink/80">
            Our story was never about having everything perfect. It was about staying,
            understanding, remembering, forgiving, laughing and choosing each other through every
            chapter.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 font-serif text-lg text-dusty">
            {['2021', '2022', '2023', '2024', '2025', '2026'].map((y, i) => (
              <span key={y} className="flex items-center gap-3">
                {i > 0 && <span className="text-gold">→</span>}
                {y}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------- TIMELINE ---------- */}
      <Section id="timeline" className="py-28">
        <Reveal className="mb-16 text-center">
          <Label>The journey, year by year</Label>
          <Heading className="mt-4 text-4xl md:text-5xl">An Interactive Timeline</Heading>
        </Reveal>
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-rose/40 to-transparent md:left-1/2" />
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 60}>
                <div
                  className={`relative pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <span
                    className={`glow-pulse absolute left-[9px] top-6 h-3 w-3 rounded-full bg-rose ring-4 ring-blush md:left-auto ${
                      i % 2 === 0 ? 'md:-right-[7px]' : 'md:-left-[7px]'
                    }`}
                  />
                  <div className="group rounded-2xl border border-rose/20 bg-paper p-7 shadow-[0_16px_44px_-28px_rgba(90,31,43,0.5)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_54px_-24px_rgba(90,31,43,0.45)]">
                    <div className="font-serif text-4xl font-light text-gold/80">{t.year}</div>
                    <Label className="mt-2">{t.label}</Label>
                    <h3 className="mt-3 font-serif text-2xl font-light text-burgundy">{t.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink/75">{t.text}</p>
                    <p className="mt-4 font-serif italic text-dusty">{t.phrase}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- US ---------- */}
      <Section className="bg-cream/50 py-28 text-center">
        <Reveal>
          <Label>The two people behind the story</Label>
          <Heading className="mt-4 text-4xl md:text-5xl">Aru &amp; Mona</Heading>
        </Reveal>
        <div className="mt-14 flex flex-col items-center gap-8 md:flex-row md:items-stretch md:justify-center">
          {[
            {
              name: 'ARU',
              full: 'Talukder Arafatur Rahman',
              nick: '“Aru”',
              image: aruImage,
              quote: 'The one who calls her Mona. 🤍',
            },
            {
              name: 'MONA',
              full: 'Subah Tanzila Muna',
              nick: '“Mona”',
              image: monaImage,
              quote: 'The one who calls him Aru. 🌸',
            },
          ].map((p, i) => (
            <Reveal key={p.name} delay={i * 120} className="w-full max-w-sm">
              {i === 1 && (
                <div className="mb-6 md:hidden">
                  <span className="glow-pulse font-serif text-4xl text-rose">♡</span>
                </div>
              )}
              <div className="rounded-3xl border border-rose/20 bg-paper p-8 shadow-[0_20px_50px_-30px_rgba(90,31,43,0.5)]">
                <Photo
                  src={p.image}
                  caption={`${p.name} - ${p.full}`}
                  className="mx-auto aspect-square w-40 rounded-full"
                />
                <h3 className="mt-6 font-serif text-3xl font-light tracking-[0.2em] text-burgundy">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-ink/70">{p.full}</p>
                <p className="mt-1 font-serif italic text-dusty">{p.nick}</p>
                <p className="mt-5 border-t border-rose/15 pt-5 font-serif italic text-burgundy">
                  {p.quote}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-10 hidden md:block">
            <span className="glow-pulse font-serif text-5xl text-rose">♡</span>
            <p className="mt-3 font-serif text-lg italic text-dusty">Two names. One story.</p>
          </div>
          <p className="mt-6 font-serif text-lg italic text-dusty md:hidden">Two names. One story.</p>
        </Reveal>
      </Section>

      {/* ---------- DISTANCE ---------- */}
      <Section className="py-28">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <Reveal>
              <Label>The distance between us</Label>
              <Heading className="mt-4 text-3xl md:text-4xl">
                Even Distance Couldn't Make You Feel Far
              </Heading>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 leading-relaxed text-ink/80">
                Our relationship hasn't always been easy. We don't always get to meet whenever we
                want. We can't always sit beside each other, share every quiet moment or simply be
                there in person when one of us feels low.
              </p>
              <p className="mt-4 leading-relaxed text-ink/80">
                Sometimes, all we have is a phone call. Sometimes a video call. Sometimes just a
                message.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 font-serif text-2xl font-light italic text-burgundy">
                But somehow, even from far away, you never feel far from me.
              </p>
              <p className="mt-4 text-ink/75">
                You are a part of my everyday life, even when you aren't physically beside me. 🌙🤍
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl border border-rose/20 bg-gradient-to-br from-burgundy-deep via-burgundy to-dusty p-10 text-ivory shadow-xl">
              <div className="flex items-center justify-between">
                {[{ image: hereImage, label: 'Here' }, { image: thereImage, label: 'There' }].map(
                  (place) => (
                    <div key={place.label} className="flex flex-col items-center gap-2">
                      <span className="glow-pulse flex h-20 w-28 overflow-hidden rounded-2xl bg-ivory/10 ring-1 ring-gold/40">
                        <img
                          src={place.image}
                          alt={`${place.label} memory`}
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-ivory/60">
                        {place.label}
                      </span>
                    </div>
                  ),
                )}
              </div>
              <div className="relative my-8 h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent">
                <span className="glow-pulse absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg">
                  ♡
                </span>
              </div>
              <p className="text-center font-serif text-xl italic text-ivory/90">
                Two places. One heart. One line that never breaks. ♾️
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- MEMORY GALLERY ---------- */}
      <Section id="memories" className="bg-cream/50 py-28">
        <Reveal className="mb-14 text-center">
          <Label>Our little universe</Label>
          <Heading className="mt-4 text-4xl md:text-5xl">Our Little Universe</Heading>
          <p className="mx-auto mt-5 max-w-xl italic text-dusty">
            A collection of moments I never want to forget.
          </p>
          <p className="mx-auto mt-3 text-sm text-dusty/70">
            Every image from our memory collection, gathered in one place. 🌸
          </p>
          <div className="mt-7">
            <PrimaryButton href="./index.html#anniversary">Open Anniversary Gallery →</PrimaryButton>
          </div>
        </Reveal>
        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:auto-rows-[200px] md:grid-cols-4 lg:grid-cols-5 lg:auto-rows-[220px]">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={(i % 10) * 45} className={`${g.span} h-full`}>
              <Photo
                src={g.src}
                fit="cover"
                caption={g.cap}
                className="aspect-[4/5] h-full w-full"
                onClick={() => setSelectedImage({ src: g.src, caption: g.cap })}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- FIVE CHAPTERS ---------- */}
      <Section className="py-28">
        <Reveal className="mb-14 text-center">
          <Label>Five years, five chapters</Label>
          <Heading className="mt-4 text-4xl md:text-5xl">Our Chapters</Heading>
        </Reveal>
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent lg:block" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.n} delay={i * 70}>
                <div className="relative h-full rounded-2xl border border-rose/20 bg-paper p-6 text-center shadow-[0_16px_44px_-30px_rgba(90,31,43,0.5)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50">
                  <span className="font-serif text-5xl font-light text-blush">0{i + 1}</span>
                  <Label className="mt-2 block">{c.n}</Label>
                  <h3 className="mt-3 font-serif text-xl font-light text-burgundy">{c.title}</h3>
                  <p className="mt-1 text-sm text-gold">{c.year}</p>
                  <p className="mt-4 text-sm italic text-ink/70">{c.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- LOVE LETTER ---------- */}
      <Section id="letter" className="grain bg-cream/60 py-28">
        <Reveal className="mb-12 text-center">
          <Label>A letter from Aru</Label>
          <Heading className="mt-4 text-4xl md:text-5xl">To Mona, With All My Love 🤍</Heading>
        </Reveal>
        <Reveal delay={120}>
          <article className="relative mx-auto max-w-2xl rounded-[1.5rem] border border-rose/20 bg-paper p-8 shadow-[0_30px_70px_-40px_rgba(90,31,43,0.5)] md:p-14">
            <Glow className="candle -left-10 top-10 h-40 w-40 bg-gold/30" />
            <div className="relative space-y-5 font-serif text-lg leading-loose text-ink/85">
              <p>Dear Mona,</p>
              <p>
                Today is September 26, and five beautiful years of our journey are complete.
              </p>
              <p>
                Sometimes I still can't believe how quickly these five years passed. It feels like
                our story only just began, yet here we are, celebrating five years of memories,
                laughter, conversations, little moments, misunderstandings, distance and love.
              </p>
              <p>
                Our relationship was never always easy. We have had to deal with distance. There
                were times when I wished I could simply sit beside you, see you whenever I wanted,
                or be there in person when you were having a difficult day. Sometimes, all we could
                share was a phone call or a video call.
              </p>
              <p className="text-xl italic text-burgundy">
                But somehow, even with all that distance, you never became a distant person to me.
              </p>
              <p>
                Your voice, your smile, our conversations, the little things we talk about —
                somehow, those simple moments became some of the most special parts of my life. 🌙
              </p>
              <p>
                Over these five years, you have become such an important part of my life that it is
                difficult to imagine my story without you in it.
              </p>
              <p>
                Our memories, our conversations, our laughter, our little arguments, our waiting,
                our happiness — all of these things together became our story.
              </p>
              <p className="text-xl italic text-burgundy">
                Mona, I want you to know something very simple but very true: I love you so much. ❤️
              </p>
              <p>I want you to stay in my life for a lifetime.</p>
              <p>
                I don't know exactly what the future has waiting for us. I don't know where life
                will take us or what the next chapters will look like. But I hope that many years
                from now, we can look back at this day and say:
              </p>
              <p className="text-center text-xl italic text-dusty">
                “Look, Mona. After all these years, our story is still here.”
              </p>
              <p>You are not just a chapter in my life.</p>
              <p className="text-xl italic text-burgundy">
                You are one of the most beautiful chapters of my life. ✨
              </p>
              <p>And I don't want this chapter to ever end.</p>
              <p>
                I want more mornings, more late-night conversations, more laughter, more memories
                and more little moments with you. I want to be someone who gives you reasons to
                smile and someone you can count on when life feels difficult.
              </p>
              <p>
                Five years may sound like a long time, but to me, it feels like the beginning of
                something much bigger.
              </p>
              <p>
                I hope there are many more years ahead of us. More smiles. More memories. More
                ordinary days that somehow become special simply because they are ours. 🌸
              </p>
              <p>Thank you, Mona, for being such a beautiful part of my life.</p>
              <p className="text-xl italic text-burgundy">Happy 5th Anniversary, Mona. ❤️</p>
              <p>
                I love you. Today, tomorrow, and through every new chapter of our story.
              </p>
              <p>And if there is one thing I hope never changes, it is this:</p>
              <p className="text-center text-2xl italic text-burgundy">
                “Mona, our story is still here.”
              </p>
              <p className="pt-4 text-right text-xl italic text-dusty">— Your Aru ❤️</p>
            </div>
          </article>
        </Reveal>
      </Section>

      {/* ---------- ROMANTIC QUOTE BREAK ---------- */}
      <section className="relative overflow-hidden bg-burgundy-deep py-32 text-center text-ivory">
        <Glow className="candle left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 bg-gold/30" />
        <Particles count={14} />
        <div className="relative mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="font-serif text-4xl font-light leading-tight md:text-6xl">
              You are my favorite person. 🤍
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 font-serif text-2xl font-light italic text-ivory/85 md:text-3xl">
              My person. My peace. My love. 🌙
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-8 text-sm uppercase tracking-[0.28em] text-gold/80">
              And after five years, I would still choose you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- 3D LOVE HEART ---------- */}
      <section className="relative overflow-hidden bg-burgundy-deep py-28 text-center text-ivory">
        <Glow className="candle left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 bg-rose/25" />
        <Particles count={14} />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6">
          <Reveal>
            <Label className="text-rose/90">A thousand little ways to say it</Label>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              I Love You, My Girl <span className="heart-beat">🤍</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12">
              <LoveHeart />
            </div>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-10 font-serif text-xl italic text-ivory/80">
              Said a thousand times, and still not enough. ♾️
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- COUNTER ---------- */}
      <Section className="py-28 text-center">
        <Reveal>
          <div className="shimmer font-serif text-[8rem] font-light leading-none md:text-[11rem]">
            5
          </div>
          <p className="text-sm uppercase tracking-[0.4em] text-dusty">Years Together</p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-3 font-serif text-lg italic text-dusty">
            Since September 26, 2021 <span className="text-gold">→</span> September 26, 2026
          </p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ['5', 'Years'],
            ['60', 'Months'],
            ['260', 'Weeks'],
            ['1,826', 'Days'],
          ].map(([num, unit], i) => (
            <Reveal key={unit} delay={i * 80}>
              <div className="group rounded-2xl border border-rose/20 bg-paper p-6 shadow-[0_16px_44px_-32px_rgba(90,31,43,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-burgundy hover:bg-burgundy hover:shadow-[0_18px_44px_-24px_rgba(90,31,43,0.7)]">
                <div className="font-serif text-4xl font-light text-burgundy transition-colors duration-500 group-hover:text-ivory">
                  {num}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.24em] text-dusty transition-colors duration-500 group-hover:text-ivory/80">
                  {unit}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-10 font-serif italic text-dusty">
            And countless moments that no counter could ever measure. ♾️
          </p>
        </Reveal>
      </Section>

      {/* ---------- WHAT YOU MEAN TO ME ---------- */}
      <Section className="bg-cream/50 py-28">
        <Reveal className="mb-14 text-center">
          <Label>What you mean to me</Label>
          <Heading className="mt-4 text-4xl md:text-5xl">In A Few Quiet Words</Heading>
        </Reveal>
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q} delay={i * 70}>
              <div
                className={`flex h-full items-center justify-center rounded-2xl border border-rose/20 bg-paper p-8 text-center font-serif text-xl font-light italic text-burgundy shadow-[0_16px_44px_-32px_rgba(90,31,43,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-burgundy hover:bg-burgundy hover:text-ivory hover:shadow-[0_18px_44px_-24px_rgba(90,31,43,0.7)] ${
                  i % 2 ? 'md:translate-y-4' : ''
                }`}
              >
                {q}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- FINAL CHAPTER ---------- */}
      <section
        id="final"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-burgundy-deep py-28 text-center text-ivory"
      >
        <Glow className="candle left-1/2 top-1/3 h-[26rem] w-[26rem] -translate-x-1/2 bg-gold/35" />
        <Particles count={16} />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <Reveal>
            <Label className="text-gold/90">Chapter Five — 2026</Label>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-6xl">
              Happy 5th Anniversary, Mona <span className="heart-beat">❤️</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 font-serif text-2xl font-light italic text-ivory/85">
              Five years down. Countless memories behind us. And our story continues…
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 text-ivory/70">You are my life's best chapter. ✨</p>
            <p className="mt-1 text-ivory/70">Stay in my life forever. 🤍</p>
          </Reveal>
          <Reveal delay={380}>
            <p className="mt-8 font-serif text-xl italic text-gold/90">
              Whatever comes next, I hope we get to write it together.
            </p>
          </Reveal>
          <Reveal delay={460}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollTop}
                className="group inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-burgundy transition-all duration-300 hover:-translate-y-0.5 hover:bg-blush"
              >
                Replay Our Story ↻
              </button>
              <button
                onClick={scrollTop}
                className="inline-flex items-center gap-2 rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-medium text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ivory/10"
              >
                Start From The Beginning ↑
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SIGNATURE ---------- */}
      <Section className="grain relative overflow-hidden py-28 text-center">
        <Glow className="candle left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 bg-gold/30" />
        <div className="relative">
          <Reveal>
            <p className="font-serif text-5xl font-light text-burgundy md:text-6xl">
              Aru <span className="heart-beat text-rose">♡</span> Mona
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 text-sm uppercase tracking-[0.28em] text-dusty">
              Since September 26, 2021
            </p>
            <p className="mt-4 font-serif text-lg italic text-dusty">
              Five years, countless memories, one beautiful story.
            </p>
            <p className="mt-6 text-sm text-ink/60">Made with love by Aru, for Mona. 🤍</p>
          </Reveal>
        </div>
      </Section>

      {/* ---------- COMMENT BOX ---------- */}
      <CommentBox />

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-rose/15 bg-cream/60 px-6 py-14 md:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <p className="font-serif text-xl text-burgundy">
              5 Years of Us <span className="text-rose">♡</span>
            </p>
            <p className="mt-2 text-sm text-ink/60">
              Aru &amp; Mona · September 26, 2021 — September 26, 2026
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-ink/70">
            <a href="#story" className="transition-colors hover:text-burgundy">
              Our Story
            </a>
            <a href="#memories" className="transition-colors hover:text-burgundy">
              Memories
            </a>
            <a href="#letter" className="transition-colors hover:text-burgundy">
              Love Letter
            </a>
            <a href="#final" className="transition-colors hover:text-burgundy">
              Final Chapter
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-10 max-w-[1440px] text-center font-serif italic text-dusty">
          Still us. Still choosing each other. ♾️
        </p>
      </footer>
    </div>
  )
}
