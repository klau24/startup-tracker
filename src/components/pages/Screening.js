import React, { useEffect, useState } from 'react'
import NavSearchbar from '../navbar/NavSearchbar'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import { DataGrid } from '@mui/x-data-grid'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'
import TableRow, { tableRowClasses } from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MenuButton from '../MenuButton'
import GenericButton from '../GenericButton'
import { BarLoader } from 'react-spinners'

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
/*
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
] */

function Screening(props) {
   const [companies, setCompanies] = useState(null)
   const [features, setFeatures] = useState(null)
   const [screenerRes, setScreenerRes] = useState(null)
   const [selectedFilters, setSelectedFilters] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      axios
         .get('/api/screen')
         .then((res) => {
            console.log(res.data)
            setCompanies(res.data)
         })
         .catch((err) => {
            console.log(err)
         })
      axios
         .get('/api/filters')
         .then((res) => {
            setFeatures(res.data)
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
      setScreenerRes(null)
   }

   const handleApply = () => {
      var filters = selectedFilters.join()
      axios
         .get('/api/screening/' + filters)
         .then((res) => {
            setScreenerRes(res.data)
         })
         .catch((err) => {
            console.log(err)
         })
   }

   const handleNavbarSearch = (searchVal) => {
      if (searchVal.target.textContent !== '') {
         if (!selectedFilters.includes(searchVal.target.textContent)) {
            setSelectedFilters([
               ...selectedFilters,
               searchVal.target.textContent,
            ])
         }
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

   const columns = [
      { field: 'name', headerName: 'Company Name', width: 250 },
      {
         field: 'description',
         headerName: 'Company Description',
         width: 400,
      },
      {
         field: 'three',
         type: 'number',
         headerName: 'Company Funding Score (3 years from now)',
         width: 150,
      },
   ]

   const handleRowClick = (params) => {
      console.log(params)
      handleClick(params.row.id)
   }

   const renderPage = (grid) => {
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
               <Grid
                  className="pt-7"
                  container
                  justifyContent="center"
                  spacing={1}
               >
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
               <Grid
                  className="pt-7"
                  container
                  justifyContent="center"
                  spacing={1}
               >
                  <h1 className="text-center text-2xl font-bold">
                     Companies matching your filter
                  </h1>
               </Grid>
               <Grid>{grid}</Grid>
            </Grid>
         </>
      )
   }

   var rows = []

   if (companies) {
      rows = Object.values(companies.data).map((company) => ({
         id: company.name,
         name: company.name,
         description: company.description,
         three: company.prediction ? company.prediction : -1.0,
      }))
      console.log(rows)
   }

   if (screenerRes) {
      selectedFilters.forEach((filter) =>
         columns.push({ field: filter, headerName: filter, width: 150 })
      )

      var newRows = []
      rows.forEach((row) => {
         var newRow = {}
         Object.keys(screenerRes['feature']).forEach((feature) => {
            newRow[feature] = screenerRes['feature'][feature][row.name]
         })
         Object.keys(row).forEach((key) => (newRow[key] = row[key]))
         newRows.push(newRow)
      })

      return renderPage(
         <DataGrid
            onRowClick={handleRowClick}
            sx={{ m: 3, width: '100%' }}
            columns={columns}
            rows={newRows}
         />
      )
   } else if (companies) {
      console.log(companies)
      return renderPage(
         <DataGrid
            onRowClick={handleRowClick}
            sx={{ m: 3, width: '100%' }}
            columns={columns}
            rows={rows}
         />
      )
   }
}

export default Screening
