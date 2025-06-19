import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Aboutuspage from '../pages/Aboutuspage';
import Addblog from '../pages/Addblog';
import { loginUser, registeruser } from '../data/newsdata';


export default function Header() {
  
    const [shownavbar, setShownavbar] = useState(false);
    const navtoggle = ()=>{
      setShownavbar(!shownavbar)
    }
  
  return (
    <div className="flex w-[100%] justify-between text-white bg-gray-900 px-10 h-[10vh] items-center">
        <h2 className="text-2xl font-bold">Blog</h2>
        <ul className="lg:flex hidden gap-3">
          <li onClick={Homepage} className="border py-2 px-6 bg-blue-500 rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm hover:bg-gradient-to-tr from-blue-400 to-blue-900">
            <Link to="/">Home</Link>
          </li>
          <li onClick={Aboutuspage} className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/Aboutuspage">About</Link>
          </li>
          <li onClick={Addblog} className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/addblog">Add-blog</Link>
          </li>
          <li onClick={registeruser} className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/register">Register</Link>
          </li>
          <li onClick={loginUser} className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/login">Login</Link>
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
            <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/registerpage">Register</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/loginpage">Login</Link>
          </li>
          </ul>
          )
        }
    </div>
    
   
  );
}
