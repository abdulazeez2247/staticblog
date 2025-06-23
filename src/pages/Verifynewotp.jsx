import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // ✅ you forgot this import
const apiurl = "https://blogbackend-fa17.onrender.com/api"; // ✅ you also need to define this if not using from another file

export default function Verifynewotp() {
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail'); // from forgot password step
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    if (value && index < 3) {
      e.target.nextSibling?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otpArray];
      if (!otpArray[index] && index > 0) {
        newOtp[index - 1] = '';
        setOtpArray(newOtp);
        e.target.previousSibling?.focus();
      } else {
        newOtp[index] = '';
        setOtpArray(newOtp);
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otp = otpArray.join('');

    if (otp.length !== 4) {
      toast.error('Enter all 4 digits of the OTP');
      return;
    }

    if (!email) {
      toast.error('Email not found in storage.');
      return;
    }

    try {
      setLoading(true);
       localStorage.setItem('resetOtp', otp); 
       toast.success('OTP accepted, proceed to set new password');
       navigate('/newpassword');

      if (res.data?.message) {
        toast.success(res.data.message);
        localStorage.setItem('resetOtp', otp); // For use in new password step
        navigate('/newpassword');
      } else {
        toast.error('Invalid OTP. Try again.');
      }
    } catch (error) {
    //   toast.error(error.response?.data?.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Email not found.');
      return;
    }

    try {
      const res = await axios.post(`${apiurl}/forgotpassword`, { email });
      toast.success(res.data.message || 'OTP resent!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white max-w-sm w-full rounded-xl p-8 shadow-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-800">Enter OTP</h2>
        <p className="text-sm text-gray-600 mt-1">
          Sent to <strong className="text-indigo-600">{email}</strong>
        </p>

        <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
          <div className="flex justify-between gap-2">
            {otpArray.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-medium text-white ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-800'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <p className="text-sm mt-2">
            Didn’t receive code?{' '}
            <span
              onClick={handleResend}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Resend
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
