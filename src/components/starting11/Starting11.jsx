import React, { useEffect, useState } from 'react'
import { starting11Data } from '../../constants/testData/teamPlayerInfo'
import { TeamListItem } from './teamListItem'
import "./Starting11.scss"
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import Button from 'react-bootstrap/Button';


function Starting11({teamName}) {
  const [team, setTeam] = useState(()=>{  //uncomment to run to see the display with fake data
    return starting11Data
  })

  // const [team, setTeam] = useState([])

  const[displayMessage, setDisplayMessage] = useState(false)
  const[error, setError] = useState(false)

  // useEffect(()=>{
  //   (async()=>{
  //     let s = teamName.replace(" ", "");
  //     let response = await fetch(`http://localhost:3000/api/teams/${s.toLowerCase()}/starting11`, {
  //       method : "GET"
  //     })

  //     let result = await response.json()
  //     if(result.success){
  //       setTeam(result.starting11)
  //     }
      
  //   })()
  // }, [])   //uncomment when done testing with fake data
  
  async function handleStaring11Submit(e){
    setError(false)
    setDisplayMessage(false)
    let s = teamName.replace(" ", "");
    try{
      let response = await fetch(`http://localhost:3000/api/teams/${s.toLowerCase()}/starting11`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body : JSON.stringify({
          starting11 : team
        })
      })

      let result = await response.json()
      if(result.success){
        //display save message and make it disappear after 2 secs
        displaySuccessErrorMessage()
      }
    }
    catch(e) {
      displaySuccessErrorMessage(true)
    }
  }
  
  function displaySuccessErrorMessage(e = false){
    if (e){
      setDisplayMessage(true)
      setError(true)
      return
    }

    setDisplayMessage(true)
    setTimeout(()=>{
      setDisplayMessage(false)
    }, 2000)
  }
  
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
      <div className = "starting11MessageContainer">
          {displayMessage && (
            error ? (
                <p style = {{color : "salmon"}}>Something went wrong plz try again</p>
              ):(
                <p>Team Saved!</p>
              )
          )}
      </div>
      <div className = "saveTeamButton">
        <Button onClick = {handleStaring11Submit} size = "lg" variant='primary'>Save Team</Button>
      </div>
      
        

    </>
    
  )
}

export default Starting11