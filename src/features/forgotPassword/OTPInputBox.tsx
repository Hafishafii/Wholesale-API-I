import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPInputBox: React.FC = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOtp(value);
      if (value.length === 6) {
        setTimeout(() => {
          if (value === "123456") {
            navigate("/reset-password");
          } else {
            alert("Invalid OTP. Try again.");
            setOtp("");
          }
        }, 300);
      }
    }
  };

  return (
    <div className="otp-box">
      <label htmlFor="otp" className="otp-label">
        Enter 6-digit OTP
      </label>
      <input
        type="text"
        id="otp"
        value={otp}
        onChange={handleOTPChange}
        maxLength={6}
        className="otp-input"
        placeholder="------"
        autoFocus
      />
      <p className="otp-hint">OTP sent to your email</p>
    </div>
  );
};

export default OTPInputBox;
