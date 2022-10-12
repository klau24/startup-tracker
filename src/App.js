import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import NavDropdown from './components//navbar/NavDropdown'
import Home from './components/pages/Home'
import Screening from './components/pages/Screening'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import CompanyTwitter from './components/pages/CompanyTwitter'
import UserTweets from './components/pages/UserTweets'
import AdvancedNLP from './components/pages/AdvancedNLP'
import Sidebar from './components/sidebar/Sidebar'
import { useNavigate, useLocation } from 'react-router-dom'

function App() {
   const [isOpen, setIsOpen] = useState(false)
   const [navbarSearch, setNavbarSearch] = useState(null)
   const [sortSelectorVal, setSortSelectorVal] = useState('daily')

   const currPage = useLocation()
   const navigate = useNavigate()
   const toggle = () => {
      setIsOpen(!isOpen)
   }

   const handleNavbarSearch = (searchVal) => {
      if (searchVal.target.nodeName === 'LI') {
         setNavbarSearch(searchVal.target.textContent)
         navigate('/company-twitter')
      } else if (searchVal.target.nodeName === 'INPUT') {
         setNavbarSearch(searchVal.target.value)
      }
   }

   const handleSortSelector = (sortVal) => {
      setSortSelectorVal(sortVal.toLowerCase())
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
   }, [currPage.pathname])

   const renderSidebar = () => {
      if (currPage.pathname !== '/') {
         return <Sidebar />
      }
   }
   return (
      <div className="w-screen h-screen">
         <Navbar toggle={toggle} handleNavbarSearch={handleNavbarSearch} />
         <NavDropdown isOpen={isOpen} toggle={toggle} />
         <div className="flex">
            {renderSidebar()}
            <Routes>
               <Route
                  path="/"
                  exact
                  element={<Home handleNavbarSearch={handleNavbarSearch} />}
               />
               <Route path="/screening" element={<Screening />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
               <Route
                  path="/company-twitter"
                  element={
                     <CompanyTwitter
                        company={navbarSearch}
                        sortBy={sortSelectorVal}
                        handleSort={handleSortSelector}
                     />
                  }
               />
               <Route
                  path="/user-tweets"
                  element={
                     <UserTweets
                        company={navbarSearch}
                        sortBy={sortSelectorVal}
                        handleSort={handleSortSelector}
                     />
                  }
               />
               <Route
                  path="/advanced-nlp"
                  element={
                     <AdvancedNLP
                        company={navbarSearch}
                        sortBy={sortSelectorVal}
                        handleSort={handleSortSelector}
                     />
                  }
               />
            </Routes>
         </div>
      </div>
   )
}

export default App
