import React from 'react'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import Variables from '../components/Variables'
import { IconButton } from '@mui/material'
import AppContext from '../AppContext'
import { Link } from 'react-router-dom'
import { Settings, Star, House } from '@mui/icons-material'
import Favorites from '../components/Favorites'


const Details = () => {
    const {addFavourite, data} = useContext(AppContext)
    const location = useLocation()
    const handleClick = (data) => {
        addFavourite(data)
        alert("Added to favorites")
    }


    return (
    <div className="bg-sky-500 h-screen flex flex-col w-[100vw]">
         <Favorites favoritesList={data.favorites}/>
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
      <Link to={"/Weather-app"}><House fontSize='large' sx={{color: "#2563EB"}}/></Link>
    </nav>
    <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
      <span className="ml-3 text-4xl">Details</span>
    </div>
    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
        <Link to={"/Weather-app/settings"}><Settings fontSize="large" sx={{color: "#2563EB"}}/></Link>
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