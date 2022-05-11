import React from 'react'
import { Link } from 'react-router-dom'
import NavSearchbar from './NavSearchbar'
import { MenuIcon } from '@heroicons/react/outline'

const Navbar = ({ toggle }) => {
   return (
      <nav
         className="flex justify-evenly items-center h-16 bg-white text-black relative shadow-sm font-mono"
         role="navigation"
      >
         <Link to="/">startup-tracker</Link>
         <NavSearchbar />
         <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
            <MenuIcon className="h-6 w-6 text-gray-500" />
         </div>
         <div className="md:block hidden">
            <Link className="p-4 hover:underline" to="/">
               Home
            </Link>
            <Link className="p-4 hover:underline" to="/dashboard">
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

export default Navbar
