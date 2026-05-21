import Slider from './Slider'

const slides = [
  { id: 1, title: 'Mountain View', bg: 'from-blue-900 via-purple-900 to-indigo-900' },
  { id: 2, title: 'City Lights', bg: 'from-gray-900 via-slate-800 to-zinc-900' },
  { id: 3, title: 'Ocean Sunset', bg: 'from-orange-600 via-rose-800 to-purple-900' },
  { id: 4, title: 'Forest Path', bg: 'from-green-900 via-emerald-800 to-teal-900' },
  { id: 5, title: 'Desert Dunes', bg: 'from-amber-700 via-yellow-800 to-orange-900' },
]

function App() {
  return <Slider slides={slides} />
}

export default App
