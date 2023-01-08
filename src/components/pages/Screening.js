import React, { useEffect, useState } from 'react'
import NavSearchbar from '../navbar/NavSearchbar'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'
import TableRow, { tableRowClasses } from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MenuButton from '../MenuButton'
import GenericButton from '../GenericButton'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   [`&.${tableRowClasses.root}`]: {
      height: '5vh',
   },
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
      height: 20,
   },
}))

const features = [
   { label: 'Followers Count' },
   { label: 'Following Count' },
   { label: 'Company Tweets' },
   { label: 'Company Tweet Likes' },
   { label: 'Company Retweets' },
   { label: 'Users' },
   { label: 'User Tweets' },
   { label: 'User Tweet Likes' },
   { label: 'User Retweets' },
]

function Screening(props) {
   const [companies, setCompanies] = useState(null)
   const [selectedFilters, setSelectedFilters] = useState([])

   useEffect(() => {
      axios
         .get('/api/companies')
         .then((res) => {
            setCompanies(res.data)
         })
         .catch((err) => {
            console.log(err)
         })
   }, [])

   const handleClick = (company) => {
      props.onCompanyClick(company)
   }
   const handleClear = () => {
      setSelectedFilters([])
   }

   const handleApply = () => {
      var filters = selectedFilters.join()
      console.log('/api/screening/' + filters)
      axios
         .get('/api/screening/' + filters)
         .then((res) => {
            setCompanies(res.data)
         })
         .catch((err) => {
            console.log(err)
         })
   }

   const handleNavbarSearch = (searchVal) => {
      if (searchVal.target.textContent !== '') {
         setSelectedFilters([...selectedFilters, searchVal.target.textContent])
      }
   }

   const renderApplyButton = () => {
      if (selectedFilters.length > 0) {
         return (
            <Grid item>
               <GenericButton
                  text="Apply Filters"
                  filterItems={handleApply}
                  isFilter={false}
               />
            </Grid>
         )
      }
   }

   const renderClearButton = () => {
      if (selectedFilters.length > 0) {
         return (
            <Grid item>
               <GenericButton
                  text="Clear Filters"
                  filterItems={handleClear}
                  isFilter={false}
               />
            </Grid>
         )
      }
   }

   if (companies) {
      return (
         <>
            <Grid
               className="p-10"
               container
               direction="column"
               align="center"
               justify="center"
               spacing={2}
            >
               <Grid item>
                  <NavSearchbar
                     width={500}
                     data={features}
                     handleNavbarSearch={handleNavbarSearch}
                     label="Filter By"
                  />
               </Grid>
               <Grid
                  className="pt-7"
                  container
                  justifyContent="center"
                  spacing={1}
               >
                  {selectedFilters.map((content) => {
                     return (
                        <Grid item>
                           <MenuButton
                              text={content}
                              // filterItems={handleFilterItems}
                           />
                        </Grid>
                     )
                  })}
                  {renderApplyButton()}
                  {renderClearButton()}
               </Grid>
               <Grid item>
                  <h1 className="pt-10 text-center text-2xl font-bold">
                     Companies matching your filter
                  </h1>
                  <TableContainer
                     sx={{ m: 3, width: '100%' }}
                     component={Paper}
                  >
                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                           {Object.values(companies).map((company) => (
                              <StyledTableRow
                                 onClick={() => handleClick(company)}
                                 key={company}
                                 sx={{
                                    '&:last-child td, &:last-child th': {
                                       border: 0,
                                    },
                                    cursor: 'pointer',
                                 }}
                              >
                                 <TableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                 >
                                    {company}
                                 </TableCell>
                              </StyledTableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Grid>
            </Grid>
         </>
      )
   }
}

export default Screening
