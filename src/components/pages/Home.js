import React, { useEffect, useState } from 'react'
import NavSearchbar from '../navbar/NavSearchbar'
import axios from 'axios'

function Home(props) {
   const [companies, setCompanies] = useState(null)
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

   if (companies) {
      return (
         <div className="h-screen w-full">
            <div className="flex flex-col h-1/2 justify-center items-center">
               <h1 className="p-10 font-mono text-5xl">startup-tracker</h1>
               <NavSearchbar
                  width={700}
                  companies={companies}
                  handleNavbarSearch={props.handleNavbarSearch}
               />
            </div>
         </div>
      )
   }
}

export default Home
