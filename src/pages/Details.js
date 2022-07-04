import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useContext } from 'react'
import Variables from '../components/Variables'
import { IconButton } from '@mui/material'
import AppContext from '../AppContext'
import { Link } from 'react-router-dom'
import { Star } from '@mui/icons-material'

const Details = () => {
    const {addFavourite} = useContext(AppContext)
    const location = useLocation()
    const handleClick = (data) => {
        addFavourite(data)
        alert("Added to favorites")
    }


    return (
    <div className="flex flex-col w-[100vw]">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
      <Link className="mr-5 text-2xl" to={"/"}>Home</Link>
    </nav>
    <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
      <span className="ml-3 text-4xl">Details</span>
    </div>
    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
        <Link className="mr-5 text-2xl" to={"/settings"}>Settings</Link>
    </div>
  </div>
    <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row justify-center items-center'>
        <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <div className='text-6xl'>{location.state.city}</div>
            <IconButton size="large" onClick={() => handleClick(location.state)}><Star sx={{ color: "#FFBF00" }} /></IconButton>
            </div>
        </div>
        <Variables coordinates={location.state}/>
    </div>
  )
}

export default Details