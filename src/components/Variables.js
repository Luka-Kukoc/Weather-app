import React from 'react'
import { MenuItem, Box, FormControl, InputLabel, Select } from '@mui/material';
import { useState } from 'react';
import DailyView from './DailyView';
import HourlyView from './HourlyView';

const Variables = (coordinates) => {
    
    const [view, setView] = useState('');

    const handleChange = (event) => {
      setView(event.target.value);
    };
    return (
    <div className='bg-sky-500 flex flex-col justify-center items-center'>  
      <div className='p-10 w-[80vw] sm:w-[60vw]'>
        <FormControl fullWidth>
          <InputLabel >Please select type of View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={handleChange}
          >
            <MenuItem value={"hourly"}>Hourly View</MenuItem>
            <MenuItem value={"daily"}>Daily View</MenuItem>
          </Select>
        </FormControl>
      </div>
      {(() => {
        if (view === "hourly") {
          return (
            <div><HourlyView coordinates={coordinates}/></div>
          )
        } else if (view === "daily") {
          return (
            <div><DailyView coordinates={coordinates}/></div>
          )
        } else {
          return 
        }
      })()}
    </div>);
      
      
}

export default Variables