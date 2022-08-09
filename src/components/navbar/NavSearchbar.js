import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function NavSearchbar(props) {
   const theme = createTheme({
      components: {
         MuiOutlinedInput: {
            styleOverrides: {
               root: {
                  borderRadius: 20,
                  '.MuiOutlinedInput-notchedOutline': {
                     borderColor: '#808080',
                  },
               },
            },
         },
      },
   })

   return (
      <div>
         <ThemeProvider theme={theme}>
            <Autocomplete
               id="search-startup"
               style={{ width: 300 }}
               freeSolo
               options={props.companies.map((company) => company.label)}
               onChange={props.handleNavbarSearch}
               renderInput={(params) => (
                  <TextField {...params} label="Search Startup" />
               )}
            />
         </ThemeProvider>
      </div>
   )
}

export default NavSearchbar
