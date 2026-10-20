import { teamLogos } from "../teamsLogo";

let team1 = {
    name : teamLogos[0].name,
    logo : teamLogos[0].logo
}

let team2 = {
    name : teamLogos[1].name,
    logo : teamLogos[1].logo
}

let team3 = {
    name : teamLogos[2].name,
    logo : teamLogos[2].logo
}

let team4 = {
    name : teamLogos[3].name,
    logo : teamLogos[3].logo
}

let team5 = {
    name : teamLogos[4].name,
    logo : teamLogos[4].logo
}

let team6 = {
    name : teamLogos[5].name,
    logo : teamLogos[5].logo
}

let team7 = {
    name : teamLogos[6].name,
    logo : teamLogos[6].logo
}

let team8 = {
    name : teamLogos[7].name,
    logo : teamLogos[7].logo
}

export const schedule = [
    {
        teams : [team1, team8],
        date : new Date("2026-11-02T19:00:00")
    },
    {
        teams : [team1, team7],
        date : new Date("2026-11-03T19:00:00")
    },
    {
        teams : [team1, team6],
        date : new Date("2026-11-04T19:00:00")
    },
    {
        teams : [team1, team5],
        date : new Date("2026-11-06T19:00:00")
    },
    {
        teams : [team1, team4],
        date : new Date("2026-11-07T19:00:00")
    },
    {
        teams : [team1, team3],
        date : new Date("2026-11-08T19:00:00")
    },
    {
        teams : [team1, team2],
        date : new Date("2026-11-09T19:00:00")
    }
] 
