import React, { useContext, useState } from 'react'
import NavBar from '../components/Navbar'
import { AuthContext } from '../context/AuthProvider'
import "./Teams.scss"

function Teams() {
  const {user} = useContext(AuthContext)
  const[name, setName] = useState("")
  const[playerType, setPlayerType] = useState("")

  function handleNameChange(event){
    setName(event.target.value)
  }

  function handlePlayerTypeChange(event){
    setPlayerType(event.target.value)
  }

  function handleFileChange(){

  }

  return (
    <>
        <NavBar/>
        {(user.role == "admin") && (
          <div className = "teamsCreationContaainer">
            <h3>Teams Creation Panel</h3>
            <div className='playerContainer'>
              <input type="text" value = {name} placeholder='Name' onChange={handleNameChange} />
              <div>
                <select name = "playerTypeSelection" value = {playerType} id="teamsPlayer" onChange={handlePlayerTypeChange}>
                  <option value="">Player's Type</option>
                  <option value="batsman">Batsman</option>
                  <option value="bowler">Bowler</option>
                  <option value="allrounder">Allrounder</option>
                </select>
              </div>

              <div>
                <label htmlFor="player-image-upload">Upload Player's Image:</label>
                <input id= "player-image-upload" name = "Upload Player's Image" type="file" accept='.jpg, .jpeg, .png, image/jpeg, image/png' onChange = {handleFileChange} />
                
              </div>
              
            </div>
          </div>
        )}
        
    </>
    
  )
}

export default Teams