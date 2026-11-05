import React, { useState } from 'react'
import { starting11Data } from '../../constants/testData/teamPlayerInfo'
import { TeamListItem } from './teamListItem'
import "./Starting11.scss"
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import Button from 'react-bootstrap/Button';


function Starting11({teamName}) {
  const [team, setTeam] = useState(()=>{
    return starting11Data
  })
  let s = teamName.replace(" ", "");
    return (
    <>
      <div className = "teamName">
          <h3>{teamName} Starting 11</h3>
      </div>
      <DragDropProvider onDragEnd={(event)=>{
        if(event.canceled){
          return
        }
        setTeam((team)=>move(team, event))
      }}>

        <div className = "starting11Container">
          {team.map((player, index)=>(
              <TeamListItem 
                key = {player.id} 
                id = {player.id} 
                index = {index} 
                player = {player} 
                backgroundColor={(index < 11) ? "green" : "lightgray"}/>
          ))}
        </div>
      </DragDropProvider>
      
      <div className = "saveTeamButton">
        <Button size = "lg" variant='primary'>Save Team</Button>
      </div>
      
        

    </>
    
  )
}

export default Starting11