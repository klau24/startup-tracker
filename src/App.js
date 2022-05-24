import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import NavDropdown from './components//navbar/NavDropdown'
import Home from './components/pages/Home'
import Dashboard from './components/pages/Dashboard'
import Screening from './components/pages/Screening'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Sidebar from './components/sidebar/Sidebar'

function App() {
   const [isOpen, setIsOpen] = useState(false)

   const toggle = () => {
      setIsOpen(!isOpen)
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
         <Navbar toggle={toggle} />
         <NavDropdown isOpen={isOpen} toggle={toggle} />
         <div className="flex">
            <Sidebar />
            <Routes>
               <Route path="/" exact element={<Home />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/screening" element={<Screening />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
            </Routes>
         </div>
      </div>
   )
}

export default App
