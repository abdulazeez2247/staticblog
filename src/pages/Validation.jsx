import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { resendOtp, verifyOTP } from '../data/newsdata';

export default function Validation() {
  const navigate = useNavigate();

  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(() => localStorage.getItem('emailForVerification') || '');
  const [userId, setUserId] = useState(() => localStorage.getItem('userIdForVerification') || '');

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d?$/.test(value)) return;
    const newOtpArray = [...otpArray];
    newOtpArray[index] = value;
    setOtpArray(newOtpArray);
    if (value && index < 3) {
      const nextInput = e.target.nextSibling;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtpArray = [...otpArray];
      if (!otpArray[index] && index > 0) {
        newOtpArray[index - 1] = '';
        setOtpArray(newOtpArray);
        const prevInput = e.target.previousSibling;
        if (prevInput) prevInput.focus();
      } else {
        newOtpArray[index] = '';
        setOtpArray(newOtpArray);
      }
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otp = otpArray.join('');
    if (otp.length !== 4 || !/^\d{4}$/.test(otp)) {
      toast.error('Please enter a valid 4-digit OTP.');
      setLoading(false);
      return;
    }

    if (!userId) {
      toast.error('User ID not found. Please register again.');
      setLoading(false);
      return;
    }

    try {
      const response = await verifyOTP({ userId, otp });
      if (response.data?.success) {
        toast.success(response.data.message || 'OTP verified successfully!');
        localStorage.removeItem('userIdForVerification');
        localStorage.removeItem('emailForVerification');
        navigate('/');
      } else {
        toast.error(response.data.message || 'OTP verification failed.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Verification failed.');
      } else {
        toast.error('Unexpected error. Try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error('Email not found. Please register again.');
      return;
    }

    try {
      const response = await resendOtp({ email });
      if (response.data?.message) {
        toast.success(response.data.message);
      } else {
        toast.error('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Failed to resend OTP.');
      } else {
        toast.error('Unexpected error during resend.');
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white max-w-sm w-full rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-indigo-600 text-5xl mb-3">
            <i className="pi pi-envelope"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Email Verification</h2>
          <p className="text-sm text-gray-600 mt-2"> {`A 4-digit verification code has been sent to`}<br /><strong className="text-indigo-600">{email}</strong></p>
        </div>
        <form onSubmit={handleSubmitOtp} className="space-y-4">
          <div className="flex justify-between gap-2">
            {otpArray.map((digit, index) => (
            <input key={index} type="text" maxLength="1" value={digit} onChange={(e) => handleChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-150"/>))}
          </div>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition flex justify-center items-center gap-2">
            {loading && <i className="pi pi-spinner pi-spin text-white text-sm"></i>}
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">Didn't receive the code?  <span onClick={handleResendOtp}  className="text-indigo-600 hover:underline font-medium cursor-pointer" > Resend verification code</span></p>
        </div>
      </div>
    </div>
  );
}
