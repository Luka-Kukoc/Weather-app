import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useContext } from 'react'
import Variables from '../components/Variables'
import { Button } from '@mui/material'
import AppContext from '../AppContext'
import { Link } from 'react-router-dom'

const Details = () => {
    const {addFavourite} = useContext(AppContext)
    const location = useLocation()
    
    return (<>
    <div>Details</div>
    <Link to={"/settings"}>Settings</Link>
    <Link to={"/"}>Home</Link>
    <div>{location.state.city}</div>
    <Button onClick={() => addFavourite(location.state)}>Add favourite</Button>
    <Variables coordinates={location.state}/>
    </>
  )
}

export default Details