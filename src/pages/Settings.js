import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import AppContext from '../AppContext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Settings = () => {
  
  const { data,  
    setTemp, 
    clearFavourites, 
    setWind, 
    setPercipitation, 
    setPastDays, 
    setTimeZone } = useContext(AppContext)
  

  return (
      <>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Temperature Unit</InputLabel>
        <Select
          id="temp"
          value={data.units.temp}
          label="temp"
          onChange={(e) => setTemp(e.target.value)}
        >
          <MenuItem value={"fahrenheit"}>Fahrenheit</MenuItem>
          <MenuItem value={"celsius"}>Celsius</MenuItem>
        </Select>
        </FormControl>

        <FormControl>
        <InputLabel id="demo-simple-select-label">Wind Speed Unit</InputLabel>
        <Select
          id="temp"
          value={data.units.wind}
          label="wind"
          onChange={(e) => setWind(e.target.value)}
        >
          <MenuItem value={"kmh"}>Km/h</MenuItem>
          <MenuItem value={"ms"}>m/s</MenuItem>
          <MenuItem value={"mph"}>Mph</MenuItem>
          <MenuItem value={"kn"}>Knots</MenuItem>
        </Select>
        </FormControl>
        <FormControl>

        <InputLabel id="demo-simple-select-label">Precipitation Unit</InputLabel>
        <Select
          id="temp"
          value={data.units.percipitation}
          label="precipitation"
          onChange={(e) => setPercipitation(e.target.value)}
        >
          <MenuItem value={"mm"}>Millimeter</MenuItem>
          <MenuItem value={"inch"}>Inch</MenuItem>
        </Select>
        </FormControl>

        <FormControl>
        <InputLabel id="demo-simple-select-label">Timezone</InputLabel>
        <Select
          id="temp"
          value={data.units.timeZone}
          label="time"
          onChange={(e) => setTimeZone(e.target.value)}
        >
          <MenuItem value={"Europe%2FBerlin"}>Europe/Berlin</MenuItem>
          <MenuItem value={"Europe%2FLondon"}>Europe/London</MenuItem>
          <MenuItem value={"Europe%2FMoscow"}>Europe/Moscow</MenuItem>
        </Select>
        </FormControl>

        <FormControl>
        <InputLabel id="demo-simple-select-label">Past Days</InputLabel>
        <Select
          id="temp"
          value={data.units.pastDays}
          label="days"
          onChange={(e) => setPastDays(e.target.value)}
        >
          <MenuItem value={"0"}>1</MenuItem>
          <MenuItem value={"1"}>1</MenuItem>
          <MenuItem value={"2"}>2</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Link to={"/"}>Home</Link>
    <Button onClick={clearFavourites}>Clear favorites</Button>
    </>
  );
}

export default Settings