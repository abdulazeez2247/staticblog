import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../data/newsdata';

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser({ email, password });
      if (response.data && response.data.user) {
        toast.success(response.data.message || "Login successful!");
        navigate('/');  
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-xl px-6 py-10 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-0 transition" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"/>
          <button type="submit" disabled={loading} className="w-full h-11 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition font-semibold text-sm flex items-center justify-center"> {loading ? "Logging in..." : "Login"} </button>
        </form>
        <div className="mt-5 space-y-2 text-xs text-gray-600 font-medium">
          <p className='text-blue-500'><Link to={"/forgotpassword"}>Forgot Password?</Link></p>
          <p>Don't have an account?  <Link to="/register" className="text-green-600 font-semibold hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}
