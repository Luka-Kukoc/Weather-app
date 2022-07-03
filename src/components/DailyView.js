import React from 'react'
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useContext } from 'react';
import { Button } from '@mui/material';
import WeatherData from './WeatherData';
import axios from 'axios';
import AppContext from '../AppContext';



const DailyView = ({coordinates}) => {
    
    const {data} = useContext(AppContext)
    console.log("item", data)

    const [weatherData, setWeatherData] = useState([])

    const [state, setState] = useState({
        weathercode: false,
        temperature_2m_max: false,
        temperature_2m_min: false,
        precipitation_sum: false,
        rain_sum: false,
        showers_sum: false
      });

    const allAreFalse =(arr) => {
        return arr.every(element => element !== true);
      }

    const queryBuilder = (obj) => {
        let keys = ""  
        for (const [key, value] of Object.entries(obj)){
            if(value) { keys += `${key},` }
        } return keys.slice(0, -1)
    }
      
    const handleSearch = async () => {
        if (allAreFalse(Object.values(state))){
            alert("Please select at least one")
        }
        else 
    {    const selected = queryBuilder(state)
        const query = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.coordinates.lat}&longitude=${coordinates.coordinates.lng}&daily=${selected}&windspeed_unit=ms&precipitation_unit=inch&timezone=Europe%2FBerlin`
        console.log("search",selected)
        console.log("query", query)
        const data = await axios.get(query)
        setWeatherData([data])
    }  
    }
    
    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };
      
    console.log("weather data", weatherData)
      const { weathercode, temperature_2m_max, temperature_2m_min, precipitation_sum, rain_sum, showers_sum } = state;
      return (
        <>
        <Box sx={{ display: 'flex' }}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Values</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={weathercode} onChange={handleChange} name="weathercode" id="wc" />
                }
                label="Weather code"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={temperature_2m_max} onChange={handleChange} name="temperature_2m_max" id='mt'/>
                }
                label="Max Temp"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={temperature_2m_min} onChange={handleChange} name="temperature_2m_min" id='mit' />
                }
                label="Min Temp"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={precipitation_sum} onChange={handleChange} name="precipitation_sum" id="ps" />
                }
                label="Precipitation sum"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={rain_sum} onChange={handleChange} name="rain_sum" id="rs" />
                }
                label="Rain sum"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={showers_sum} onChange={handleChange} name="showers_sum" id="ss" />
                }
                label="Showers sum"
              />
            </FormGroup>
          </FormControl>
        </Box>
        <Button onClick={handleSearch}>Search</Button>
        {/* <WeatherData weatherData={weatherData}/> */}
        {weatherData.length === 0 && (<div>NO data</div>)}
        {weatherData.length > 0 && (<WeatherData weatherData={weatherData}/>)}
      </>);
}

export default DailyView