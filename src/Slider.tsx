import { useState, useEffect, useCallback } from 'react'

type Slide = {
  id: number
  bg: string
  title?: string
}

type SliderProps = {
  slides: Slide[]
  interval?: number
}

export default function Slider({ slides, interval = 5000 }: SliderProps) {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1))
  }, [slides.length])

  const next = useCallback(() => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))
  }, [slides.length])

  useEffect(() => {
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next, interval])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`relative min-w-full h-full shrink-0 flex items-center justify-center bg-gradient-to-br ${slide.bg}`}
          >
            <h2 className="text-white text-4xl md:text-7xl font-bold tracking-tight select-none">
              {slide.title}
            </h2>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 size-14 flex items-center justify-center rounded-full bg-white/20 text-white text-3xl hover:bg-white/30 backdrop-blur-sm transition-colors cursor-pointer z-10"
        aria-label="Previous slide"
      >
        &#8249;
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 size-14 flex items-center justify-center rounded-full bg-white/20 text-white text-3xl hover:bg-white/30 backdrop-blur-sm transition-colors cursor-pointer z-10"
        aria-label="Next slide"
      >
        &#8250;
      </button>

      <div className="absolute bottom-8 inset-x-0 flex justify-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all cursor-pointer ${
              index === current ? 'bg-white w-8' : 'bg-white/40 w-3 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
