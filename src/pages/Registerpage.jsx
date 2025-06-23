import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registeruser } from '../data/newsdata';


export default function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const formsubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !phonenumber || !password) {
      toast.error('Please fill all the required details');
      return;
    }

    const data = { firstname, lastname, email, phonenumber, password };

    try {
      setLoading(true);
      const response = await registeruser(data);
      if (response.data?.user?._id) {
        toast.success(response.data.message);
        localStorage.setItem('userIdForVerification', response.data.user._id);
        localStorage.setItem('emailForVerification', response.data.user.email);
        navigate('/verify');
      } else {
        toast.error(response.data.message || 'Registration failed: No user ID received.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Account not created. Try again.');
    } finally {
      setLoading(false);
    }

    setFirstname('');
    setLastname('');
    setEmail('');
    setPhonenumber('');
    setPassword('');
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen flex items-center justify-center px-4">
       <div className="bg-white w-full max-w-sm rounded-xl shadow-md px-6 py-8 text-center">
           <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Sign Up</h2>
            <form onSubmit={formsubmit} className="space-y-4">
                <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"/>
                <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"/>
                <input type="email" placeholder="Email Address"  value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"/>
                <input type="text" placeholder="Phone Number" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"/>
                <button type="submit" disabled={loading} className={`w-full h-11 rounded-md text-white text-sm font-medium flex justify-center items-center gap-2 ${ loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-600'}`}>
                    {loading && <i className="pi pi-spinner pi-spin text-white text-sm"></i>}
                    {loading ? 'Processing...' : 'Sign Up'}
                </button>
            </form>
            <div className="mt-5 text-xs text-gray-600">
                <p className="mb-2">Forgot Password?</p>
                <p>Already have an account? <Link to="/login" className="text-green-600 font-semibold hover:underline">Login</Link></p>
            </div>
        </div>
    </div>
  );
}
