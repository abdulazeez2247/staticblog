import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // ✅ REQUIRED
const apiurl = "http://localhost:5000/api"; // ✅ or your live URL

export default function NewPassword() {
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');
  const otp = localStorage.getItem('resetOtp');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Please enter both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${apiurl}/newpassword`, {
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      toast.success(response.data.message || 'Password reset successfully');
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetOtp');
      navigate('/'); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    toast.info('Skipped password reset. Logging out...');
    localStorage.removeItem('resetEmail');
    localStorage.removeItem('resetOtp');
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl px-6 py-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Create New Password</h2>
        <p className="text-gray-600 mt-2">Set a new password for your account</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
          <div>
            <label className="block text-sm text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 rounded-md text-white font-medium transition ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800'
            }`}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            className="w-full h-11 mt-3 rounded-md text-blue-600 font-medium border border-blue-600 hover:bg-blue-50"
          >
            Skip
          </button>
        </form>
      </div>
    </div>
  );
}
