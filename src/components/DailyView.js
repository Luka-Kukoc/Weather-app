import React from 'react'
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useContext } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import AppContext from '../AppContext';



const WeatherData = ({weatherData}) => {
    
    const {daily} =  weatherData[0].data

    const values = Object.keys(daily)
    const createRows = (prop) => {
        return(prop.map(value => <p>{value}</p>))
    }

    return (
        <div className='flex flex-row m-1 p-1'>
            {values.map((element) => (
            <div id={element} className='flex flex-col m-3'>
                <p>{element}</p>
                <div className='inline-block'>{createRows(daily[element])}</div>
            </div>))}
        </div>   
        )
}




const DailyView = ({coordinates}) => {
    
    const {data} = useContext(AppContext)

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
    
    const unitQuery = (data) => {
        return `&windspeed_unit=${data.units.wind}&temperature_unit=${data.units.temp}&precipitation_unit=${data.units.percipitation}&timezone=${data.units.timeZone}&past_days=${data.units.pastDays}`
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
    {   const selected = queryBuilder(state)
        
        const query = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.coordinates.lat}&longitude=${coordinates.coordinates.lng}&daily=${selected}` + unitQuery(data)
        const weather = await axios.get(query)
        setWeatherData([weather])
    }  
    }
    
    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };
      
      const { weathercode, temperature_2m_max, temperature_2m_min, precipitation_sum, rain_sum, showers_sum } = state;
      return (
        <>
        <div className='inline-block'>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Values</FormLabel>
            <FormGroup>
                <div className='inline-block'>
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
              </div>
              <div className='inline-block'>
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
              </div>
            </FormGroup>
          </FormControl>
        </div>
        <div className='m-5'>
            <Button onClick={handleSearch}>Search</Button>
        </div>
        {weatherData.length === 0 && (<div>No data</div>)}
        {weatherData.length > 0 && (<div className='flex flex-col'><WeatherData weatherData={weatherData}/></div>)}
      </>);
}

export default DailyView