import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import NavDropdown from './components//navbar/NavDropdown'
import Home from './components/pages/Home'
import Dashboard from './components/pages/Dashboard'
import Screening from './components/pages/Screening'
import About from './components/pages/About'
import Contact from './components/pages/Contact'

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
      <div className="App">
         <Navbar toggle={toggle} />
         <NavDropdown isOpen={isOpen} toggle={toggle} />
         <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/screening" exact element={<Screening />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/contact" exact element={<Contact />} />
         </Routes>
      </div>
   )
}

export default App
