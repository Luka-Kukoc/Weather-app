import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useContext } from 'react'
import Variables from '../components/Variables'
import { Button } from '@mui/material'
import AppContext from '../AppContext'

const Details = () => {
    const [weatherData, setWeatherData] = useState({})
    const {addFavourite} = useContext(AppContext)
    const location = useLocation()
    
    return (<>
    <div>Details</div>
    <div>{location.state.city}</div>
    <Button onClick={() => addFavourite(location.state)}>Add favourite</Button>
    <Variables coordinates={location.state}/>
    </>
  )
}

export default Details