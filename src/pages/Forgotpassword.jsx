import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgetpassword } from '../data/newsdata';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // for redirecting

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Enter your email');
      return;
    }

    setLoading(true);

    try {
        try {
        const response = await forgetpassword({ email }); 
        toast.success(response.data.message); 
        localStorage.setItem('resetEmail', email);
        navigate('/verifypasswordotp');
        } catch (err) {
        toast.error(err.response?.data?.message || 'Something went wrong');
        }
        
        } catch (err) {
        toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
        setLoading(false);
        }
    };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-xl px-6 py-10 sm:px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
        <p className="text-gray-600 mt-2">Enter your email to receive a reset OTP</p>

        <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 rounded-md text-white text-sm font-medium transition ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800'
            }`}
          >
            {loading ? 'Sending...' : 'Next'}
          </button>
        </form>

        <p className="mt-4 text-sm text-blue-600">
          <Link to="/login" className="hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  );
}
