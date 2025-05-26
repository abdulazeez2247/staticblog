import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Header() {
  
    const [shownavbar, setShownavbar] = useState(false);
    const navtoggle = ()=>{
      setShownavbar(!shownavbar)
    }
  
  return (
    <div className="flex w-[100%] justify-between text-white bg-gray-900 px-10 h-[10vh] items-center">
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
        <div className='lg:hidden' onClick={navtoggle}>
          { 
            shownavbar 
            ? ( <i className=' pi pi-times text-3xl'></i>)
            :  (<i className=' pi pi-align-justify text-3xl'></i>)
          }
          
        </div>

        {
          shownavbar&&(
            <ul className="lg:hidden gap-3 absolute top-[100px] left-0 bg-gray-900 w-full transition h-[50vh]  items-center">
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
          )
        }
    </div>
    
   
  );
}
