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
/* 
temp, rel hum, dewpoint, cloudcower, cloudcover high, low,
 wind speed, wind speed, wind speed, soil temp 0 6 18 */

 const WeatherData = ({weatherData}) => {
    
    const {hourly, hourly_units} =  weatherData[0].data
    console.log("hourly", hourly)
    console.log("units", hourly_units)

    const values = Object.keys(hourly)
    const createRows = (prop) => {
        return(prop.map(value => <p1>{value}</p1>))
    }

    return (
     <>
        {values.map((element) => (<div id={element}>{createRows(hourly[element])}</div>))}
        
        </>   
        )
}


const HourlyView = ({coordinates}) => {
    const {data} = useContext(AppContext)
    console.log("item", data)

    const [weatherData, setWeatherData] = useState([])

    const [state, setState] = useState({
        temperature_2m: false,
        relativehumidity_2m: false,
        dewpoint_2m: false,
        cloudcover: false,
        cloudcover_low: false,
        cloudcover_high: false,
        windspeed_10m: false,
        windspeed_80m: false,
        windspeed_120m: false,
        soil_temperature_0cm: false,
        soil_temperature_6cm: false,
        soil_temperature_18cm: false,
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
    {    const selected = queryBuilder(state)
        const query = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.coordinates.lat}&longitude=${coordinates.coordinates.lng}&hourly=${selected}` + unitQuery(data)
        console.log("search",selected)
        console.log("query", query)
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
      
    console.log("weather data", weatherData)
      const { 
          temperature_2m, 
          relativehumidity_2m, 
          dewpoint_2m, 
          cloudcover, 
          cloudcover_high, 
          cloudcover_low, 
          windspeed_10m, 
          windspeed_120m, 
          windspeed_80m, 
          soil_temperature_0cm,
          soil_temperature_18cm,
          soil_temperature_6cm
         } = state;

      return (
        <>
        <Box sx={{ display: 'flex' }}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Values</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={temperature_2m} onChange={handleChange} name="temperature_2m" id="wc" />
                }
                label="Temperature"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={relativehumidity_2m} onChange={handleChange} name="relativehumidity_2m" id='mt'/>
                }
                label="Relative Humidity"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={dewpoint_2m} onChange={handleChange} name="dewpoint_2m" id='mit' />
                }
                label="Dewpoint"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={cloudcover} onChange={handleChange} name="cloudcover" id="ps" />
                }
                label="Cloudcover avg."
              />
              <FormControlLabel
                control={
                  <Checkbox checked={cloudcover_high} onChange={handleChange} name="cloudcover_high" id="rs" />
                }
                label="Cloudcover (high)"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={cloudcover_low} onChange={handleChange} name="cloudcover_low" id="ss" />
                }
                label="Cloudcover (low)"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={windspeed_10m} onChange={handleChange} name="windspeed_10m" id="wc" />
                }
                label="Wind speed 10m"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={windspeed_120m} onChange={handleChange} name="windspeed_120m" id='mt'/>
                }
                label="Wind speed 120m"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={windspeed_80m} onChange={handleChange} name="windspeed_80m" id='mit' />
                }
                label="Wind speed 80m"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={soil_temperature_0cm} onChange={handleChange} name="soil_temperature_0cm" id="ps" />
                }
                label="Soil temp 0cm"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={soil_temperature_6cm} onChange={handleChange} name="soil_temperature_6cm" id="rs" />
                }
                label="Soil temp 6cm"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={soil_temperature_18cm} onChange={handleChange} name="soil_temperature_18cm" id="ss" />
                }
                label="Soil temp 18cm"
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

export default HourlyView