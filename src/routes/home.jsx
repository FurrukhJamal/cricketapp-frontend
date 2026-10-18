import React, { useState } from 'react'
import "./home.scss"
import { teamLogos } from '../constants/teamsLogo'

function Home() {
  const [selectedTeam, setSelectedTeam] = useState(null)
  
  function handleTeamSelect(e,teamName){
    e.stopPropagation()
    setSelectedTeam(teamName)
  }

  function closeTeamInfoPanel(){
    setSelectedTeam(null)
  }
  
  return (
    <div data-testid = "main-container" onClick = {closeTeamInfoPanel} className='container'>
      <div><h1>Control Panel</h1></div>
      <div className = "teamsContainer">
        {teamLogos.map((team, index)=>(
          <div data-testid = {`teamLogoContainer-${index}`} onClick = {(e)=>handleTeamSelect(e, team.name)} key = {index} className = "teamContainer">
            <img src={team.logo} alt="karachi Kings logo" />
            <div>
              <h5>{team.name}</h5>
            </div>
          </div>    
        ))}
        
      </div>
      {selectedTeam && (
        <div className='teamInfoContainer'> 
          <h4>{selectedTeam} Players Info</h4>
        </div>
      )}
      
    </div>
    
  )
}

export default Home