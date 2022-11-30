import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavSearchbar from './NavSearchbar'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from '../sidebar/Sidebar'

const Navbar = (props) => {
   const [companies, setCompanies] = useState(null)
   const [location, setLocation] = useState(null)
   const [isOpen, setIsOpen] = useState(false)

   let currPage = useLocation()
   useEffect(() => {
      axios
         .get('/api/companies')
         .then((res) => {
            setCompanies(res.data)
         })
         .catch((err) => {
            console.log(err)
         })
      setLocation(currPage.pathname)
   }, [currPage.pathname])

   const handleDrawerToggle = () => {
      setIsOpen(!isOpen)
   }

   const renderSearchbar = () => {
      if (location !== '/') {
         return (
            <NavSearchbar
               width={300}
               data={companies}
               handleNavbarSearch={props.handleNavbarSearch}
               label="Search Startup"
            />
         )
      }
   }

   const renderLogo = () => {
      if (!isOpen && location !== '/') {
         return <Link to="/">startup-tracker</Link>
      }
   }

   const renderMenu = () => {
      if (!isOpen && location !== '/') {
         return (
            <IconButton
               color="inherit"
               aria-label="open drawer"
               edge="start"
               onClick={handleDrawerToggle}
            >
               <MenuIcon />
            </IconButton>
         )
      }
   }
   if (companies) {
      return (
         <nav
            className="flex justify-evenly items-center h-20 bg-stHeader text-blacks shadow-sm font-mono"
            role="navigation"
         >
            <Sidebar isOpen={isOpen} handleDrawerToggle={handleDrawerToggle} />
            {renderMenu()}
            {renderLogo()}
            {renderSearchbar()}
            <div
               className="px-4 cursor-pointer md:hidden"
               onClick={props.toggle}
            >
               <MenuIcon className="h-6 w-6 text-gray-500" />
            </div>
            <div className="md:block hidden">
               <Link className="p-4 hover:underline" to="/">
                  Home
               </Link>
               <Link className="p-4 hover:underline" to="/company-twitter">
                  Dashboard
               </Link>
               <Link className="p-4 hover:underline" to="/screening">
                  Screening
               </Link>
               <Link className="p-4 hover:underline" to="/about">
                  About
               </Link>
               <Link className="p-4 hover:underline" to="/contact">
                  Contact
               </Link>
            </div>
         </nav>
      )
   }
}

export default Navbar
