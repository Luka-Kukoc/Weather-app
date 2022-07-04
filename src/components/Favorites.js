import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Favorites = ({favoritesList}) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate()

    return (
        <>
        {showSidebar ? (
          <button
            className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            x
          </button>
        ) : (
          <svg
            onClick={() => setShowSidebar(!showSidebar)}
            className="fixed  z-30 flex items-center cursor-pointer right-10 top-6"
            fill="#2563EB"
            viewBox="0 0 100 80"
            width="40"
            height="40"
          >
            <rect width="100" height="10"></rect>
            <rect y="30" width="100" height="10"></rect>
            <rect y="60" width="100" height="10"></rect>
          </svg>
        )}
  
        <div
          className={`top-0 right-0 w-[100vw] sm:w-[35vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-40  ease-in-out duration-300 ${
            showSidebar ? "translate-x-0 " : "translate-x-full"
          }`}
        >
          <h3 className="mt-20 text-4xl font-semibold text-white">
            Favorites
          </h3>
          {favoritesList?.map(element => (<div className='p-1'><Button variant="contained" fullWidth={true} onClick={() => navigate("/details",{state:element})}>{element.city}</Button></div>))}
        </div>
      </>)
}




export default Favorites