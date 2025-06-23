import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Header() {
  const [shownavbar, setShownavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const navtoggle = () => {
    setShownavbar(!shownavbar);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('You have successfully logout we hope to see you again')
    navigate('/login');
  };

  const renderLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          <li className="border py-2 px-6 bg-blue-500 rounded-sm hover:bg-gradient-to-tr from-blue-400 to-blue-900">
            <Link to="/">Home</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/Aboutuspage">About</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/addblog">Add-blog</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-red-600 to-red-900 text-white">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/Aboutuspage">About</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/register">Register</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/login">Login</Link>
          </li>
        </>
      );
    }
  };

  return (
    <div className="flex w-[100%] justify-between text-white bg-gray-900 px-10 h-[10vh] items-center">
      <h2 className="text-2xl font-bold">Blog</h2>

      {/* Desktop nav */}
      <ul className="lg:flex hidden gap-3">
        {renderLinks()}
      </ul>

      {/* Mobile menu toggle */}
      <div className='lg:hidden' onClick={navtoggle}>
        {
          shownavbar
            ? (<i className='pi pi-times text-3xl'></i>)
            : (<i className='pi pi-align-justify text-3xl'></i>)
        }
      </div>

      {/* Mobile nav */}
      {
        shownavbar && (
          <ul className="lg:hidden gap-3 absolute top-[100px] left-0 bg-gray-900 w-full transition h-[50vh] p-4 space-y-2">
            {renderLinks()}
          </ul>
        )
      }
    </div>
  );
}
