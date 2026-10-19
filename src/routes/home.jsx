import React, { useState } from 'react'
import "./home.scss"
import { teamLogos } from '../constants/teamsLogo'

function Home() {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamPlayers, setTeamPlayers] = useState([])
  
  async function handleTeamSelect(e,teamName){
    e.stopPropagation()
    setSelectedTeam(teamName)
    let link = teamName.replaceAll(" ", "").toLowerCase()
    let response = await fetch(`http://localhost:3000/api/${link}/players`, {
      method : "GET"
    })
    let result = await response.json()
    setTeamPlayers(result.players)
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
          <div className = "playersListContainer">
            {teamPlayers.map((player, index)=>(
              <div key = {index} className = "playerInfoContainer">
                <img src={player.pic} alt="player pic" />
                <h6>{player.name}</h6>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
    
  )
}

export default Home