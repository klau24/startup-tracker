import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@material-ui/core/InputAdornment'

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
               style={{ width: props.width }}
               freeSolo
               options={props.companies.map((company) => company.label)}
               onChange={props.handleNavbarSearch}
               renderInput={(params) => (
                  <TextField
                     {...params}
                     label="Search Startup"
                     InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                           <InputAdornment position="start">
                              <SearchIcon />
                           </InputAdornment>
                        ),
                     }}
                  />
               )}
            />
         </ThemeProvider>
      </div>
   )
}

export default NavSearchbar
