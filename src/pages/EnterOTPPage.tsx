import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";

const EnterOTPPage = () => {
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Enter OTP</h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded">
            Verify OTP
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default EnterOTPPage;
