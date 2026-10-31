import { players } from "./players";
let playerType = ["batsman", "bowler", "Allrounder"]

export let playersInfo = players.map((player)=>({
    name : player.name,
    playerType : playerType[0],
    playerImagePreview : player.pic
}

))

