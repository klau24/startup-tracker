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
               id="search"
               style={{ width: props.width }}
               options={Object.values(props.data).map((company) => company)}
               onChange={props.handleNavbarSearch}
               renderInput={(params) => (
                  <TextField
                     {...params}
                     label={props.label}
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
