import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Header() {
  
    const [shownavbar, setShownavbar] = useState(false);
    const navtoggle = ()=>{
      setShownavbar(!notshow)
    }
  
  return (
    <div className="flex w-[100%] justify-between text-white bg-gray-900 px-10 lg:h-[10vh] items-center">
        <h2 className="text-2xl font-bold">Blog</h2>
        <ul className="lg:flex hidden gap-3">
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/">Home</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/Aboutuspage">About</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/addblog">Add-blog</Link>
          </li>
        </ul>
        <div className='lg:hidden'>
          <i className=' pi pi-align-justify text-3xl'></i>
        </div>
    </div>
    
   
  );
}
