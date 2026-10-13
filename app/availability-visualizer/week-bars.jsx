import React from 'react'

export function WeekDay({ day, availabilityData }) {
  let availability = availabilityData[day]
  
  return(
    <div className="day" id={day}>
      <div className="hours">
        {Array.from({length: 24}, (_, index) => {
          let uniqueKey = day + "_hour:" + index
          return  <div className={availability?.[index] ? `hour ${availability[index]}` : "hour error"} key={uniqueKey}></div>
        })}
      </div>
    </div>
  )
}

export function WeekBars({ availabilityData }) {
  const dayOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",]

  return (
    <div className="days">

      {Array.from({length: 7}, (_, index) => 
        <WeekDay key={"day:" + index} day={dayOfWeek[index]} availabilityData={ availabilityData }/>
      )}

    </div>
  )
}