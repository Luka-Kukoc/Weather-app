import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Favorites = ({favoritesList}) => {
    const navigate = useNavigate()
    console.log("favoritelist", favoritesList)

    return (
    <div>
        <h1>Favorites</h1>
    {favoritesList?.map(element => (<div style={{width: "100px", height: "100px", color:"green"}}><Button onClick={() => navigate("/details",{state:element})}>{element.city}</Button></div>))}
    </div>)
}

export default Favorites