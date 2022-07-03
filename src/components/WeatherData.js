import React, { useEffect, useState } from 'react'

const WeatherData = (weatherData) => {
    
    /* const [state, setState] = useState([])
    console.log("in wd component",weatherData)
    useEffect(() =>{
        if(weatherData.weatherData.length === 0){
        setState(["no data"])}
        else{
            setState([weatherData.weatherData])
        }
    },[]) */
    const {daily, daily_units} =  weatherData.weatherData[0].data
    console.log("daily", daily)
    return (
    
/*     <div>{(state.length === 0 ? ( <div>has data</div>) : (<div>no data</div>))}</div>
 */  <>
        <div>{daily.time.map(element => <p key={element}>{element}</p>)}</div>
        <div>{Object.keys(daily).map(element => <p key={element}>{element}</p>)}</div>
        
        </>   
        )
}

export default WeatherData