import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import NavDropdown from './components//navbar/NavDropdown'
import Home from './components/pages/Home'
import Screening from './components/pages/Screening'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import CompanyTwitter from './components/pages/CompanyTwitter'
import TweetContent from './components/pages/TweetContent'

function App() {
   const [isOpen, setIsOpen] = useState(false)
   const [navbarSearch, setNavbarSearch] = useState(null)

   const toggle = () => {
      setIsOpen(!isOpen)
   }

   const handleNavbarSearch = (searchVal) => {
      if (searchVal.target.nodeName === 'LI') {
         setNavbarSearch(searchVal.target.textContent)
      } else if (searchVal.target.nodeName === 'INPUT') {
         setNavbarSearch(searchVal.target.value)
      }
   }

   useEffect(() => {
      const hideMenu = () => {
         if (window.innerWidth > 768 && isOpen) {
            setIsOpen(false)
         }
      }

      window.addEventListener('resize', hideMenu)

      return () => {
         window.removeEventListener('resize', hideMenu)
      }
   })

   return (
      <div className="w-screen h-screen">
         <Navbar toggle={toggle} handleNavbarSearch={handleNavbarSearch} />
         <NavDropdown isOpen={isOpen} toggle={toggle} />
         <div className="flex">
            <Routes>
               <Route path="/" exact element={<Home />} />
               <Route path="/screening" element={<Screening />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
               <Route
                  path="/company-twitter"
                  element={<CompanyTwitter company={navbarSearch} />}
               />
               <Route
                  path="/tweet-content"
                  element={<TweetContent company={navbarSearch} />}
               />
            </Routes>
         </div>
      </div>
   )
}

export default App
