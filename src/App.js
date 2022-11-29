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
import Grid from '@mui/material/Grid'
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
      if (typeof searchVal === 'string') {
         setNavbarSearch(searchVal)
         navigate('/company-twitter')
      }
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
      <>
         <Grid container justifyContent="center">
            <Grid item xs={12} s={12} md={12}>
               <Navbar
                  toggle={toggle}
                  handleNavbarSearch={handleNavbarSearch}
               />
               <NavDropdown isOpen={isOpen} toggle={toggle} />
            </Grid>
            <Grid item xs={2} s={2} md={2}>
               {renderSidebar()}
            </Grid>
            <Grid item xs={9} s={9} md={9}>
               <Routes>
                  <Route
                     path="/"
                     exact
                     element={<Home handleNavbarSearch={handleNavbarSearch} />}
                  />
                  <Route
                     path="/screening"
                     element={<Screening onCompanyClick={handleNavbarSearch} />}
                  />
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
            </Grid>
         </Grid>
      </>
   )
}

export default App

/*
 <div className="flex flex-row">
               {renderSidebar()}
               <Routes>
               <Route
                  path="/"
                  exact
                  element={<Home handleNavbarSearch={handleNavbarSearch} />}
               />
               <Route
                  path="/screening"
                  element={<Screening onCompanyClick={handleNavbarSearch} />}
               />
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
   */
