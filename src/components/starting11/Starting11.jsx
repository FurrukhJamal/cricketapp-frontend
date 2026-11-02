import React, { useState } from 'react'
import { starting11Data } from '../../constants/testData/teamPlayerInfo'
import { TeamListItem } from './teamListItem'
import "./Starting11.scss"

function Starting11({teamName}) {
  const [team, setTeam] = useState(()=>{
    return starting11Data
  })
    return (
    <>
        <div className = "teamName">
            <h1>{teamName}</h1>
        </div>
        <div className = "starting11Container">
            {team.map((player, index)=>(
                <TeamListItem key = {index} id = {index} player = {player}/>
            ))}
        </div>
        

    </>
    
  )
}

export default Starting11