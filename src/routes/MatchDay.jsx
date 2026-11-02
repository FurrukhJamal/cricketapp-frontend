import React from 'react'
import NavBar from '../components/Navbar'
import "./MatchDay.scss"
import AppTest from '../components/dragndroptest/AppTest'
import Starting11 from '../components/starting11/Starting11'

function MatchDay() {
  return (
    <>
        <NavBar/>
        <div className = "mainContainer">
            <Starting11 teamName = "karachiking"/>
        </div>
    </>
    
  )
}

export default MatchDay