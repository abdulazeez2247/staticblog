import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { resendOtp, verifyOTP } from '../data/newsdata';

export default function Validation() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  // For registration only
  const email = localStorage.getItem('emailForVerification') || '';
  const userId = localStorage.getItem('userIdForVerification') || '';

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d?$/.test(value)) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = value;
    setOtpArray(newOtpArray);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtpArray = [...otpArray];
      if (!otpArray[index] && index > 0) {
        newOtpArray[index - 1] = '';
        setOtpArray(newOtpArray);
        inputRefs.current[index - 1]?.focus();
      } else {
        newOtpArray[index] = '';
        setOtpArray(newOtpArray);
      }
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    const otp = otpArray.join('');

    if (otp.length !== 4) {
      toast.error('Please enter a valid 4-digit OTP.');
      return;
    }

    if (!userId) {
      toast.error('User ID not found. Please register again.');
      return;
    }

    try {
      setLoading(true);
      const res = await verifyOTP({ userId, otp });

      if (res.data?.success) {
        toast.success(res.data.message || 'OTP verified!');
        localStorage.removeItem('userIdForVerification');
        localStorage.removeItem('emailForVerification');
        navigate('/'); // Redirect to homepage or dashboard
      } else {
        toast.error(res.data.message || 'OTP verification failed.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed.');
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
      const res = await resendOtp({ email });
      toast.success(res.data?.message || 'OTP resent!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Resend failed.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white max-w-sm w-full rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Email Verification</h2>
          <p className="text-sm text-gray-600 mt-2">
            A 4-digit code has been sent to <br />
            <strong className="text-indigo-600">{email}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmitOtp} className="space-y-4">
          <div className="flex justify-between gap-2">
            {otpArray.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            Didn’t receive the code?{' '}
            <span
              onClick={handleResendOtp}
              className="text-indigo-600 hover:underline font-medium cursor-pointer"
            >
              Resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
