import React, { useEffect, useState } from 'react'
import "./MatchDaySchedule.scss"

function MatchDaySchedule() {
  const[matchToday, setMatchToday] = useState(false)
    
    useEffect(()=>{
        (async()=>{
            let response = await fetch(`http://localhost:3000/api/schedule/`, {
                method : "GET"
            })
            let result = await response.json()
            if(result.success){
                const today = new Date()
                let todayMatch = result.schedule.find((match)=>
                    match.date.getDate() === today.getDate() &&
                    match.date.getMonth() === today.getMonth() &&
                    match.date.getFullYear() === today.getFullYear()
                )

                setMatchToday(todayMatch)
            }
        })()
    }, [])
  
    return (
        <div className = "matchDayScheduleContainer">
            {!matchToday && (
                <div>
                    <p>There is no match today</p>
                </div>
            )}
        </div>
    )
}

export default MatchDaySchedule