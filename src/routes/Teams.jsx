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
        <TeamCreationList teamName = "Lahore Qalandars"/>
        <TeamCreationList teamName = "Islamabad United"/>
        <TeamCreationList teamName = "Peshawar Zalmi"/>
        <TeamCreationList teamName = "Multan Sultans"/>
        <TeamCreationList teamName = "Quetta Gladiators"/>
        <TeamCreationList teamName = "Hyderabad Kingsmen"/>
        <TeamCreationList teamName = "Rawalpindiz"/>
    </>
    
  )
}

export default Teams