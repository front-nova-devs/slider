import Slider from './Slider'

const slides = [
  { 
    id: 1, 
    title: 'Mountain View', 
    bg: 'from-blue-900 via-purple-900 to-indigo-900',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070'
  },
  { 
    id: 2, 
    title: 'City Lights', 
    bg: 'from-gray-900 via-slate-800 to-zinc-900',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2070'
  },
  { 
    id: 3, 
    title: 'Ocean Sunset', 
    bg: 'from-orange-600 via-rose-800 to-purple-900',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073'
  },
  { 
    id: 4, 
    title: 'Forest Path', 
    bg: 'from-green-900 via-emerald-800 to-teal-900',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2071'
  },
  { 
    id: 5, 
    title: 'Desert Dunes', 
    bg: 'from-amber-700 via-yellow-800 to-orange-900',
    image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=2070'
  },
]

function App() {
  return <Slider slides={slides} />
}

export default App
