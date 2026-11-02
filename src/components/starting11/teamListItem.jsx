import React from 'react';
import {useSortable} from '@dnd-kit/react/sortable';
import "./teamListItem.scss"
import batsmanIcon from "../../assets/playerTypeIcons/cricket-bat.png"
import bowlerIcon from "../../assets/playerTypeIcons/cricket-ball.png"
import allrounder from "../../assets/playerTypeIcons/cricket.png"


export function TeamListItem({player,id, index}) {
  const {ref, isDragging} = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
  });

  let imgSrc;
  if(player.playerType == "batsman"){
    imgSrc = batsmanIcon
  }
  else if(player.playerType == "bowler"){
    imgSrc = bowlerIcon
  }
  else if(player.playerType == "Allrounder"){
    imgSrc = allrounder
  }

  return (
    <div className="Item" ref={ref} data-dragging={isDragging}>
      <div style = {{display : "flex", flexDirection : "row", width:"100%", alignItems : "center"}}>
            <div className = "playerNumberContainer">
        <p>{parseInt(id) +1}.</p>
      </div>
      <div className='playerNamePicContainer'>
        <div>
            <img src={player.playerImagePreview}/>
        </div>
        <div>
            <h6>{player.name}</h6>
        </div>
      </div>
      </div>
      
      <div className = "playerTypeContainer">
        <img src={imgSrc}/>
        <div>
            <p>{player.playerType}</p>
        </div>
      </div>
    </div>
  );
}