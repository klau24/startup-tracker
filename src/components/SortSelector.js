import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function SortSelector() {
   const [sortBy, setSortBy] = React.useState('')

   const handleChange = (event) => {
      setSortBy(event.target.value)
   }

   return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
         <InputLabel>Sort By</InputLabel>
         <Select
            id="select-sort"
            value={sortBy}
            label="Sort By"
            onChange={handleChange}
         >
            <MenuItem value={0}>None</MenuItem>
            <MenuItem value={1}>Weekly</MenuItem>
            <MenuItem value={2}>Monthly</MenuItem>
            <MenuItem value={3}>Yearly</MenuItem>
         </Select>
      </FormControl>
   )
}

export default SortSelector
