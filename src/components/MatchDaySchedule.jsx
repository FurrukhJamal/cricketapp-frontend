import React, { useEffect, useState } from 'react'
import "./MatchDaySchedule.scss"
import { matchdaySchedule } from '../constants/testData/schedule' //comment when done testing with fake data

function MatchDaySchedule() {
  const[matchToday, setMatchToday] = useState(false)
  const[sortedSchedule, setSortedSchedule] = useState([])
    
    // useEffect(()=>{
    //     (async()=>{
    //         let response = await fetch(`http://localhost:3000/api/schedule/`, {
    //             method : "GET"
    //         })
    //         let result = await response.json()
    //         if(result.success){
    //             const today = new Date()
    //             let todayMatch = result.schedule.find((match)=>
    //                 match.date.getDate() === today.getDate() &&
    //                 match.date.getMonth() === today.getMonth() &&
    //                 match.date.getFullYear() === today.getFullYear()
    //             )

    //             setMatchToday(todayMatch)
    //         }
    //     })()
    // }, [])    //uncomment the useeffect when done testing with fake data

    useEffect(()=>{
        
        let s = [...matchdaySchedule].sort((a, b)=> a.date - b.date)
        console.log("s : ", s)
        setSortedSchedule(s)
        setMatchToday(true)
    })
  
    return (
        <div className = "matchDayScheduleContainer">
            {!matchToday && (
                <div>
                    <p>There is no match today</p>
                </div>
            )}

            {matchToday && (
                <div className = "todaysMatchContainer">
                    <h1>Today's Match</h1>
                    {/* <div style ={{display : "flex", flexDirection : "row", justifyContent : "center"}}>
                        <div style ={{display : "flex", flexDirection : "column"}}>
                            <h3 data-testid = "todaysMatchTeam1">{sortedSchedule[0].teams[0].name}</h3>
                        </div>
                        <div style ={{display : "flex", flexDirection : "column"}}>
                            <h3 data-testid = "todaysMatchTeam2">{sortedSchedule[0].teams[1].name}</h3>
                        </div>
                    </div> */}

                    <div  className='fixtureContainer'>
                        <div className = "fixtureTeamContainer">
                        <div>
                            <img src={sortedSchedule[0].teams[0].logo} alt="" />
                        </div>
                        <h4>{sortedSchedule[0].teams[0].name}</h4>
                        </div>
                        <h2>VS</h2>

                        <div className = "fixtureTeamContainer">
                        <div>
                            <img src={sortedSchedule[0].teams[1].logo} alt="" />
                        </div>
                        <h4>{sortedSchedule[0].teams[1].name}</h4>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default MatchDaySchedule