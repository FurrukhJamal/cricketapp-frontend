import { players } from "./players";
let playerType = ["batsman", "bowler", "Allrounder"]

export let playersInfo = players.map((player)=>({
    name : player.name,
    playerType : playerType[0],
    playerImagePreview : player.pic
}

))

// export let starting11Data = players.map((player, index)=>({
//     id : `player-${index}`,
//     name : player.name,
//     playerType : playerType[Math.floor(Math.random() * 3)],
//     playerImagePreview : player.pic
// }
// ))


export const starting11Data = [
  {
    id: "kk1",
    name: "Imad Wasim",
    playerType: "Allrounder",
    playerImagePreview: "https://hamariweb.com/profiles/images/profile/9847-120-5316.jpg"
  },
  {
    id: "kk2",
    name: "Babar Azam",
    playerType: "batsman",
    playerImagePreview: "https://media.crictracker.com/media/attachments/2017/02/Babar-Azam.jpg"
  },
  {
    id: "kk3",
    name: "Mohammad Amir",
    playerType: "bowler",
    playerImagePreview: "https://www.geosuper.tv/assets/uploads/updates/2022-01-27/13229_9482706_updates.jpg"
  },
  {
    id: "kk4",
    name: "Shoaib Malik",
    playerType: "Allrounder",
    playerImagePreview: "https://api.bdcrictime.com/shoaib-malik-parts-ways-karachi-kings-03_01_2025.jpg"
  },
  {
    id: "kk5",
    name: "Shahid Afridi",
    playerType: "Allrounder",
    playerImagePreview: "https://www.thenews.com.pk/assets/uploads/updates/2018-11-13/393429_4664763_Shahid-Afridi-KK_updates.jpg"
  },
  {
    id: "kk6",
    name: "Colin Ingram",
    playerType: "batsman",
    playerImagePreview: "https://img.dunyanews.tv/images/userfiles/match1%2815%29.jpg"
  },
  {
    id: "kk7",
    name: "Lendl Simmons",
    playerType: "batsman",
    playerImagePreview: "https://www.geo.tv/assets/uploads/updates/2018-03-19/187050_2968905_updates.jpg"
  },
  {
    id: "kk8",
    name: "Ravi Bopara",
    playerType: "Allrounder",
    playerImagePreview: "https://admin.thecricketer.com/weblab/sites/96c8b790-b593-bfda-0ba4-ecd3a9fdefc2/resources/images/site/bopara280303.jpg"
  },
  {
    id: "kk9",
    name: "Kieron Pollard",
    playerType: "Allrounder",
    playerImagePreview: "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/03/Kieron-Pollard-PSL-3.jpg?size=%2A%3A900"
  },
  {
    id: "kk10",
    name: "Mohammad Rizwan",
    playerType: "batsman",
    playerImagePreview: "https://www.geosuper.tv/assets/uploads/updates/2020-03-16/4403_3374699_updates.jpg"
  },
  {
    id: "kk11",
    name: "Danish Aziz",
    playerType: "Allrounder",
    playerImagePreview: "https://www.wisden.com/static-assets/images/players/65233.png?v=23.77"
  },
  {
    id: "kk12",
    name: "Umer Khan",
    playerType: "bowler",
    playerImagePreview: "https://psl-t20.com/wp-content/uploads/2019/02/FATAs-Umer-Khan-to-represent-Karachi-Kings-in-HBL-PSL-4th-edition-1.jpg"
  },
  {
    id: "kk13",
    name: "Mohammad Umar",
    playerType: "bowler",
    playerImagePreview: "https://pbs.twimg.com/media/FpZ7y5-aMAAcpIF.jpg"
  },
  {
    id: "kk14",
    name: "Usama Mir",
    playerType: "bowler",
    playerImagePreview: "https://i.tribune.com.pk/media/images/79851-usamacovjpg-1552987529/79851-usamacovjpg-1552987529-640x480.webp"
  },
  {
    id: "kk15",
    name: "Waqas Maqsood",
    playerType: "bowler",
    playerImagePreview: "https://c.cricketpakistan.com.pk/images/posts/cover_1583926058cover.jpg"
  }
];
