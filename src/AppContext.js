import { createContext, useState } from "react";

const AppContext = createContext()

export function AppProvider({children})  {

    const [data, setData] = useState({
        favorites: [],
        units: {
            temp: "celsius",
            wind: "kmh",
            percipitation: "mm",
            timeZone: "UTC",
            pastDays: "1"
        }}) 

    const addFavourite = (obj) => {
        setData({...data, favorites:[...data.favorites, obj]})
    }

    const clearFavourites = () => {
        setData({...data, favorites:[]})
    }

    const setTemp = (unit) => {
        setData({...data, units: {...data.units, temp: unit}})
    }

    const setWind = (unit) => {
        setData({...data, units: {...data.units, wind: unit}})
    }

    const setPercipitation = (unit) => {
        setData({...data, units: {...data.units, percipitation: unit}})
    }

    const setTimeZone = (zone) => {
        setData({...data, units: {...data.units, timeZone: zone}})
    } 
    const setPastDays = (days) => {
        setData({...data, units: {...data.units, pastDays: days}})
    }

    return(
        <AppContext.Provider 
        value={{
            data, 
            addFavourite, 
            setTemp, 
            clearFavourites, 
            setWind, 
            setPercipitation, 
            setPastDays, 
            setTimeZone}}
            >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext