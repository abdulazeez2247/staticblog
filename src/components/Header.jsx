import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Header() {
  const [shownavbar, setShownavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const navtoggle = () => setShownavbar(!shownavbar);

  useEffect(() => {
    const userId = localStorage.getItem('userIdForVerification');
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userIdForVerification');
    localStorage.removeItem('emailForVerification');
    setIsLoggedIn(false);
    toast.success('You have successfully logged out!');
    navigate('/login');
  };

  const NavLinks = () => (
    <>
      <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
        <Link to="/Aboutuspage">About</Link>
      </li>
      {isLoggedIn ? (
        <>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/">Home</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/addblog">Add-blog</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-red-800 to-red-500">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/register">Register</Link>
          </li>
          <li className="border py-2 px-6 rounded-sm hover:bg-gradient-to-bl from-gray-950 to-gray-400">
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="flex w-full justify-between text-white bg-gray-900 px-10 h-[10vh] items-center relative">
      <h2 className="text-2xl font-bold">Blog</h2>

      {/* Desktop Nav */}
      <ul className="lg:flex hidden gap-3">
        <NavLinks />
      </ul>

      {/* Mobile Nav Toggle */}
      <div className="lg:hidden" onClick={navtoggle}>
        {shownavbar ? (
          <i className="pi pi-times text-3xl"></i>
        ) : (
          <i className="pi pi-align-justify text-3xl"></i>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {shownavbar && (
        <ul className="lg:hidden gap-3 absolute top-[100px] left-0 bg-gray-900 w-full transition h-auto py-4 px-4 z-50">
          <NavLinks />
        </ul>
      )}
    </div>
  );
}
