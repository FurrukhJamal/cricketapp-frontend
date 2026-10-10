import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import AuthNavigation from './AuthNavigationTab'
import './App.scss'
import AppNavigation from './AppNavigation'
import { BrowserRouter } from 'react-router'

function App() {
  const [token, setToken] = useState(()=>{
    try {
      let token = localStorage.getItem("cricketApp-token")
      return token  
    } catch (error) {
      console.log(error)
      return null
    }
  })

  
  return (
    <BrowserRouter>
      {token ? (
        <AppNavigation/>
      ) : (
        <AuthNavigation/>
      )}
    </BrowserRouter>
    
  )
}

export default App
