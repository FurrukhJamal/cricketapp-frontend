import React, { useState } from 'react'
import "./home.scss"
import { teamLogos } from '../constants/teamsLogo'

import { players } from '../constants/testData/players'
import {schedule} from "../constants/testData/schedule"

function Home() {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamPlayers, setTeamPlayers] = useState([])

  const sortedSchedule = [...schedule].sort(
    (a, b)=> a.date - b.date
  )
  
  async function handleTeamSelect(e,teamName){
    e.stopPropagation()
    setSelectedTeam(teamName)
    let link = teamName.replaceAll(" ", "").toLowerCase()
    // let response = await fetch(`http://localhost:3000/api/${link}/players`, {
    //   method : "GET"
    // })
    // let result = await response.json()
    // setTeamPlayers(result.players)

    // TOO setup initial css
    setTeamPlayers(players)
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
                <div>
                  <img src={player.pic} alt="player pic" />
                </div>
                
                <h6>{player.name}</h6>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* div for schedule */}
      <div className = "scheduleContainer">
        <h1>Upcoming Games</h1>
        {sortedSchedule.slice(0,3).map((fixture, index)=>(
          <div className = "fixtureRow">
          <div key = {index} className='fixtureContainer'>
            <div className = "fixtureTeamContainer">
              <div>
                <img src={fixture.teams[0].logo} alt="" />
              </div>
              <h4>{fixture.teams[0].name}</h4>
            </div>
            <h2>VS</h2>

            <div className = "fixtureTeamContainer">
              <div>
                <img src={fixture.teams[1].logo} alt="" />
              </div>
              <h4>{fixture.teams[1].name}</h4>
            </div>

            
          </div>
            <div className='fixtureTimingContainer'>
              <p>{fixture.date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                })}</p>
              <p>Starts : {fixture.date.toLocaleTimeString("en-GB", {
                hour : "2-digit",
                minute : "2-digit",
                hour12 : true
              })}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    
  )
}

export default Home