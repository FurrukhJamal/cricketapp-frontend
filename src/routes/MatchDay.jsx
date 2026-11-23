import React from 'react'
import NavBar from '../components/Navbar'
import "./matchDay.scss"
import AppTest from '../components/dragndroptest/AppTest'
import Starting11 from '../components/starting11/Starting11'
import MatchDaySchedule from '../components/MatchDaySchedule'

function MatchDay() {
  return (
    <>
        <NavBar/>
        <div className = "mainContainer">
            <div className = "starting11sContainer"> 
              <div className = "team1Container">
                <Starting11 teamName = "Karachi King"/>
              </div>

              <div className = "team2Container">
                <Starting11 teamName = "Quetta Gladiators"/>
              </div>
              
            </div>

            <MatchDaySchedule/>
            
            
        </div>
    </>
    
  )
}

export default MatchDay