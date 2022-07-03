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
    <>  
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel >View Type</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={handleChange}
          >
            <MenuItem value={"hourly"}>Hourly View</MenuItem>
            <MenuItem value={"daily"}>Daily View</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {(() => {
        if (view === "hourly") {
          return (
            <div><HourlyView/></div>
          )
        } else if (view === "daily") {
          return (
            <div><DailyView coordinates={coordinates}/></div>
          )
        } else {
          return (
            <div>Please select type of View</div>
          )
        }
      })()}
    </>);
      
      
}

export default Variables