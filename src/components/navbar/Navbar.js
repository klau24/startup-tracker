import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavSearchbar from './NavSearchbar'
import { MenuIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Navbar = (props) => {
   const [companies, setCompanies] = useState(null)
   const [location, setLocation] = useState(null)

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

   if (companies) {
      return (
         <nav
            className="flex justify-evenly items-center h-20 bg-stHeader text-blacks shadow-sm font-mono"
            role="navigation"
         >
            {/* <Link to="/">startup-tracker</Link> */}
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
