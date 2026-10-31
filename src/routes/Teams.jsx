import React, { useContext } from 'react'
import "./Teams.scss"
import NavBar from '../components/Navbar'
import TeamCreationList from '../components/TeamCreationList'
import { AuthContext } from '../context/AuthProvider'
import TeamDisplayList from '../components/TeamDisplayList'

function Teams() {
  const{user} = useContext(AuthContext)
  return (
    <>
        <NavBar/>
        {(user.role == "admin") && (
          <div className = "teamsCreationListContainer">
            <h1>Teams Creation Control Panel</h1>
          </div>
        )}
        
        
        {}
        {(user.role == "admin") && (
          <>
          <TeamCreationList teamName = "Karachi King"/>
          <TeamCreationList teamName = "Lahore Qalandars"/>
          <TeamCreationList teamName = "Islamabad United"/>
          <TeamCreationList teamName = "Peshawar Zalmi"/>
          <TeamCreationList teamName = "Multan Sultans"/>
          <TeamCreationList teamName = "Quetta Gladiators"/>
          <TeamCreationList teamName = "Hyderabad Kingsmen"/>
          <TeamCreationList teamName = "Rawalpindiz"/>
          </>
        )}
        
        {(user.role == "user") && (
          <>
            <div className = "pslTeamsHeadingContainer">
              <h1>PSL Teams</h1>
            </div>
            <TeamDisplayList teamName= "Karachi King"/>
            <TeamDisplayList teamName = "Lahore Qalandar"/>
            <TeamDisplayList teamName = "Islamabad United"/>
            <TeamDisplayList teamName = "Peshawar Zalmi"/>
            <TeamDisplayList teamName = "Multan Sultan"/>
            <TeamDisplayList teamName = "Quetta Gladiator"/>
            <TeamDisplayList teamName = "Hyderabad Kingsmen"/>
            <TeamDisplayList teamName = "Rawalpindiz"/>
          </>
        )}
    </>
    
  )
}

export default Teams