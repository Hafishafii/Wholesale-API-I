import React, { useEffect, useState } from 'react';
import { verifyOtp } from '../features/auth/services/verifyregisterOtp';
import { resendOtp } from '../features/auth/services/resendOtp';
import { useNavigate } from 'react-router-dom';

const OTPVerificationPage: React.FC = () => {
  const navigate=useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendMessage, setResendMessage] = useState('');

  // Add missing fields for resendOtp payload
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');

  // Load from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('pendingUser') || '{}');
    setPhoneNumber(userData.phone_number || '');
    setEmail(userData.email || '');
    setPassword(userData.password || '');
    setFirstName(userData.first_name || '');
    setLastName(userData.last_name || '');
    setRole(userData.role || '');
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }

    try {
      const response = await verifyOtp({
        phone_number: phoneNumber,
        otp: fullOtp,
      });
      setSuccess(response.message || 'OTP verified successfully.');
      setError('');
      navigate('/login')
      // redirect('/logi')      // Redirect to login or dashboard
    } catch (err: any) {
      const message = err?.response?.data?.message || 'OTP verification failed.';
      console.error("OTP verification error:", err);
      setError(message);
      setSuccess('');
    }
  };

  const handleResend = async () => {
    try {
      const response = await resendOtp({
        phone_number: phoneNumber,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role,
      });
      setResendMessage(response.message || "OTP resent successfully.");
      setError('');
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to resend OTP.";
      setError(message);
      setResendMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Enter Verification Code
          </h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to your device
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              />

            ))}
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}
          {resendMessage && <p className="text-green-500 text-center">{resendMessage}</p>}

          <div className="text-center">
            <button
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              onClick={handleVerify}
            >
              Verify Code
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
