import React, { useEffect, useState } from 'react'
import { playersInfo } from '../constants/testData/teamPlayerInfo' //using for checking css, comment when done
import "./TeamDisplayList.scss"

function TeamDisplayList({teamName}) {
    const[players, setPlayers] = useState(null)

    useEffect(()=>{
        // if(teamName == "Karachi King"){
        //     setPlayers(playersInfo) // to see css, comment when done
        // }
        // else{
        //     setPlayers(null)
        // }
        
        let s = teamName.replace(" ", "");
        (async()=>{
            let response = await fetch(`http://localhost:3000/api/teams/${s.toLowerCase()}`, {
                method : "GET"
            })
            let result = await response.json()
            if(result.success){
                setPlayers(result.players)
            }
        })()
    },[])
    return (
    <div className = "teamsContainer">
        <h3>{teamName}'s Players</h3>
            
            {/* display array for teams players */}
            {players && (
              <div className = "addedPlayersContainer">
                {players.map((player, index)=>(
                  <div key = {index} className = "addedPlayerContainer" >
                    <img src={player.playerImagePreview} alt="" />
                    <h4>{player.name}</h4>
                    <h6>{player.playerType}</h6>


                  </div>
                ))}
                
              </div>
            )}

            {!players && (
                <div>
                    <p>{teamName}'s players are not setup yet</p>
                </div>
            )}
    </div>
  )
}

export default TeamDisplayList