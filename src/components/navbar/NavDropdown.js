import React from 'react';
import { Link } from 'react-router-dom';

function NavDropdown( { isOpen, toggle }) {
  return (
    <div className={isOpen ? 'grid grid-rows-4 text-center items-center bg-white-500 font-mono' : 'hidden'} onClick={toggle}>
        <Link className='p-4 hover:bg-gray-50' to='/'>Home</Link>
        <Link className='p-4 hover:bg-gray-50' to='/dashboard'>Dashboard</Link>
        <Link className='p-4 hover:bg-gray-50' to='/screening'>Screening</Link>
        <Link className='p-4 hover:bg-gray-50' to='/about'>About</Link>
        <Link className='p-4 hover:bg-gray-50' to='/contact'>Contact</Link>
    </div>
  )
}

export default NavDropdown