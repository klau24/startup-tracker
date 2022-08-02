import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SearchIcon } from '@heroicons/react/outline'

function NavSearchbar() {
   const [companies, setCompanies] = useState([])

   useEffect(() => {
      axios.get('/api/companies').then((res) => {
         setCompanies(res.data)
      })
   }, [])

   return (
      <form className="pl-4" action="">
         <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
            <SearchIcon className="h-5 w-5 absolute ml-3 pointer-events-none" />
            <input
               type="text"
               name="search"
               placeholder="Search startup"
               autoComplete="off"
               aria-label="Search startup"
               className="pr-3 py-2 pl-10 font-semibold placeholder-gray-500 text-black rounded-2xl ring-2 ring-gray-300 "
            ></input>
         </div>
      </form>
   )
}

export default NavSearchbar

/*
<form className="pl-4" action="">
         <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
            <SearchIcon className="h-5 w-5 absolute ml-3 pointer-events-none" />
            <input
               type="text"
               name="search"
               placeholder="Search startup"
               autoComplete="off"
               aria-label="Search startup"
               className="pr-3 py-2 pl-10 font-semibold placeholder-gray-500 text-black rounded-2xl ring-2 ring-gray-300 "
            ></input>
         </div>
      </form>
*/
