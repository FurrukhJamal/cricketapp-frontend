import React, { useContext, useRef, useState } from 'react'
import NavBar from '../components/Navbar'
import { AuthContext } from '../context/AuthProvider'
import "./Teams.scss"

function Teams() {
  const {user} = useContext(AuthContext)
  const[name, setName] = useState("")
  const[playerType, setPlayerType] = useState("")
  const [error, setError] = useState("")
  const [playerImageFile , setPlayerImageFile] = useState(null)
  const[playerImagePreview, setPlayerImagePreview] = useState("")
  const[players, setPlayers] = useState([])
  const fileInputRef = useRef(null)

  function handleNameChange(event){
    setName(event.target.value)
  }

  function handlePlayerTypeChange(event){
    setPlayerType(event.target.value)
  }

  function handleFileChange(e){
    let uploadedImage = e.target.files[0]
    
    setError("")
    setPlayerImageFile(null)
    
    if (!uploadedImage){
      return
    }
    const allowedTypes = ["image/png", "image/jpeg"]

    if(!allowedTypes.includes(uploadedImage.type)){
      setError("File type should be a JPEG or PNG")
      e.target.value = ""
      return 
    }
    setPlayerImageFile(uploadedImage)
    setPlayerImagePreview(URL.createObjectURL(uploadedImage))
    
  }

  function handlePlayerSubmit(event){
    event.preventDefault()
    setPlayers((prev)=>([...prev, {
      name, playerType, playerImageFile, playerImagePreview
    }]))

    setName("")
    setPlayerType("")
    fileInputRef.current.value = ""
    
  }

  function handlePlayerDelete(deleteIndex){
    setPlayers((prev)=>(
      prev.filter((player, index) => index !==deleteIndex)
    ))
  }

  return (
    <>
        <NavBar/>
        {(user.role == "admin") && (
          <div className = "teamsCreationContaainer">
            <h3>Teams Creation Panel</h3>
            
            {/* display array for added players */}
            {players && (
              <div className = "addedPlayersContainer">
                {players.map((player, index)=>(
                  <div key = {index} className = "addedPlayerContainer" data-testid = {`playerInfoContainer-${index}`}>
                    <div data-testid = {`playerDeleteButton-${index}`} onClick = {()=>handlePlayerDelete(index)} className = "removeAddedPlayer">
                      <span>X</span>
                    </div>
                    <img src={player.playerImagePreview} alt="" />
                    <h4>{player.name}</h4>
                    <h6>{player.playerType}</h6>


                  </div>
                ))}
              </div>
            )}
            <div className='playerContainer'>
              <form action="" onSubmit = {handlePlayerSubmit}>
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
                  <input ref={fileInputRef} id= "player-image-upload" name = "Upload Player's Image" type="file" accept='.jpg, .jpeg, .png, image/jpeg, image/png' onChange = {handleFileChange} />
                </div>

                <div>
                  <button type = "submit" disabled = {(name && playerImageFile && playerType) ? false : true }>Add Player</button>
                </div>

                {/* for errors */}
                {error && (
                  <div>
                    <p>{error}</p>
                  </div>
                )}
              </form>
              
              
            </div>
          </div>
        )}
        
    </>
    
  )
}

export default Teams