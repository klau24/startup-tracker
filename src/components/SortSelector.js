import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function SortSelector(props) {
   const [sortVal, setSortVal] = useState('daily')

   const handleChange = (event) => {
      setSortVal(event.explicitOriginalTarget.childNodes[0].data.toLowerCase())
      props.sortBy(event.explicitOriginalTarget.childNodes[0].data)
   }

   return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
         <InputLabel>Sort By</InputLabel>
         <Select
            id="select-sort"
            value={sortVal}
            label="Sort By"
            onChange={handleChange}
         >
            <MenuItem value={'daily'}>Daily</MenuItem>
            <MenuItem value={'weekly'}>Weekly</MenuItem>
            <MenuItem value={'monthly'}>Monthly</MenuItem>
            <MenuItem value={'quarterly'}>Quarterly</MenuItem>
         </Select>
      </FormControl>
   )
}

export default SortSelector
