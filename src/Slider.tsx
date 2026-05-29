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
  const [next, setNext] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isAnimating || index === current) return
    setNext(index)
    setIsAnimating(true)
  }, [isAnimating, current])

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, slides.length, goTo])

  const goPrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, slides.length, goTo])

  useEffect(() => {
    const timer = setInterval(goNext, interval)
    return () => clearInterval(timer)
  }, [goNext, interval])

  useEffect(() => {
    if (!isAnimating) return
    const timer = setTimeout(() => {
      setCurrent(next)
      setIsAnimating(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [isAnimating, next])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {slides.map((slide, index) => {
        const isActive = index === current
        const isNext = index === next && isAnimating

        return (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              opacity: isActive ? (isAnimating ? 0 : 1) : isNext ? 1 : 0,
              transition: isActive
                ? 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                : isNext
                  ? 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'none',
              zIndex: isNext ? 2 : isActive ? 1 : 0,
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
              style={{
                backgroundImage: slide.image
                  ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.image})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: isActive && !isAnimating
                  ? 'scale(1)'
                  : isNext
                    ? 'scale(1.08)'
                    : 'scale(1)',
                transition: 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <h2
                className="text-white text-4xl md:text-7xl lg:text-8xl font-light tracking-tight select-none text-center px-8"
                style={{
                  textShadow: '0 2px 40px rgba(0,0,0,0.5)',
                  opacity: isActive ? (isAnimating ? 0 : 1) : isNext ? 1 : 0,
                  transform: isActive && !isAnimating
                    ? 'translateY(0)'
                    : isNext
                      ? 'translateY(20px)'
                      : 'translateY(20px)',
                  transition: isActive
                    ? 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s'
                    : isNext
                      ? 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
                      : 'none',
                }}
              >
                {slide.title}
              </h2>
            </div>
          </div>
        )
      })}

      <button
        onClick={goPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/20 backdrop-blur-md transition-all duration-300 cursor-pointer z-10 border border-white/10 hover:border-white/20"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/20 backdrop-blur-md transition-all duration-300 cursor-pointer z-10 border border-white/10 hover:border-white/20"
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-10 inset-x-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`rounded-full transition-all duration-500 cursor-pointer ${
              index === current
                ? 'bg-white w-8 h-2'
                : 'bg-white/30 w-2 h-2 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
    </div>
  )
}
