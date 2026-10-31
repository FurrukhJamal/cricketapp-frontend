import { useState, useEffect, useContext } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import AuthNavigation from './AuthNavigationTab'
import './App.scss'
import AppNavigation from './AppNavigation'
import { BrowserRouter } from 'react-router'
import { AuthContext, AuthProvider } from './context/AuthProvider'


function App() {
  // adding this useeffect for dev purpose to give initial styles to the home page
  useEffect(()=>{
    localStorage.setItem("cricketApp-token", "testToken")
    setUser({
      name : "Test Admin",
      email : "admin@ex.com",
      role : "user"
    })
  }, [])
  
  const {token, setUser} = useContext(AuthContext)

  
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
