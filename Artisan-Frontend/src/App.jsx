import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-4xl text-red-500 font-bold underline bg-amber-200">
        Tailwind v4 is working!
      </h1>
    </>
  )
}

export default App
