import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="flex justify-between text-white bg-gray-900 px-10 lg:h-[10vh] items-center">
      <h2 className="text-2xl font-bold">Blog</h2>
      <ul className="flex gap-3">
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
    </div>
  );
}
