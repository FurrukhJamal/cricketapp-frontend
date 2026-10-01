import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Navigation from './NavigationTab'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Navigation/>
  )
}

export default App
