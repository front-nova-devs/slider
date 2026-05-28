import { useState, useEffect, useCallback } from 'react'

type Slide = {
  id: number
  bg: string
  image?: string
  title?: string
}

type SliderProps = {
  slides: Slide[]
  interval?: number
}

export default function Slider({ slides, interval = 5000 }: SliderProps) {
  const [current, setCurrent] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const goTo = useCallback((index: number, dir: 'next' | 'prev') => {
    if (isFlipping) return
    setDirection(dir)
    setIsFlipping(true)
    setTimeout(() => {
      setCurrent(index)
      setTimeout(() => setIsFlipping(false), 700)
    }, 50)
  }, [isFlipping])

  const prev = useCallback(() => {
    const nextIndex = current === 0 ? slides.length - 1 : current - 1
    goTo(nextIndex, 'prev')
  }, [current, slides.length, goTo])

  const next = useCallback(() => {
    const nextIndex = current === slides.length - 1 ? 0 : current + 1
    goTo(nextIndex, 'next')
  }, [current, slides.length, goTo])

  useEffect(() => {
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next, interval])

  const getSlideStyle = (index: number): React.CSSProperties => {
    if (index === current && !isFlipping) {
      return {
        opacity: 1,
        transform: 'perspective(1200px) rotateY(0deg) scale(1)',
        zIndex: 2,
      }
    }
    if (index === current && isFlipping) {
      return {
        opacity: 0,
        transform: direction === 'next'
          ? 'perspective(1200px) rotateY(-90deg) scale(0.8)'
          : 'perspective(1200px) rotateY(90deg) scale(0.8)',
        zIndex: 1,
        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
      }
    }
    if (index !== current && isFlipping) {
      const isActive = (
        direction === 'next' && index === (current + 1) % slides.length
      ) || (
        direction === 'prev' && index === (current - 1 + slides.length) % slides.length
      )
      if (isActive) {
        return {
          opacity: 1,
          transform: direction === 'next'
            ? 'perspective(1200px) rotateY(90deg) scale(0.8)'
            : 'perspective(1200px) rotateY(-90deg) scale(0.8)',
          zIndex: 3,
          transition: 'none',
        }
      }
    }
    return {
      opacity: 0,
      transform: 'perspective(1200px) rotateY(0deg) scale(0.9)',
      zIndex: 0,
    }
  }

  const [displayedCurrent, setDisplayedCurrent] = useState(current)

  useEffect(() => {
    setDisplayedCurrent(current)
  }, [current])

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ perspective: '1200px' }}>
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const style = getSlideStyle(index)
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${slide.bg}`}
              style={{
                ...style,
                backgroundImage: slide.image
                  ? `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${slide.image})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
              }}
            >
              <h2 className="text-white text-4xl md:text-7xl font-thin tracking-tight select-none drop-shadow-2xl">
                {slide.title}
              </h2>
            </div>
          )
        })}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 size-14 flex items-center justify-center rounded-full bg-white/20 text-white text-3xl hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer z-10"
        aria-label="Previous slide"
      >
        &#8249;
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 size-14 flex items-center justify-center rounded-full bg-white/20 text-white text-3xl hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer z-10"
        aria-label="Next slide"
      >
        &#8250;
      </button>

      <div className="absolute bottom-8 inset-x-0 flex justify-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index, index > current ? 'next' : 'prev')}
            className={`h-3 rounded-full transition-all cursor-pointer ${
              index === displayedCurrent ? 'bg-white w-8 shadow-lg shadow-white/30' : 'bg-white/40 w-3 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
