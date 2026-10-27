import React from 'react'
import "./Teams.scss"
import NavBar from '../components/Navbar'
import TeamCreationList from '../components/TeamCreationList'

function Teams() {
  return (
    <>
        <NavBar/>
        <div className = "teamsCreationListContainer">
            <h1>Teams Creation Control Panel</h1>
            
        </div>
        <TeamCreationList teamName = "Karachi King"/>
    </>
    
  )
}

export default Teams