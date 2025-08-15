// pages/ResetNewPasswordPage.tsx
import React from "react";
import { useResetNewPassword } from "../hooks/useResetNewPassword";

const ResetNewPasswordPage: React.FC = () => {
  const {
    email,
    otp,
    newPassword,
    confirmPassword,
    setEmail,
    setOtp,
    setNewPassword,
    setConfirmPassword,
    handleSubmit,
    loading,
  } = useResetNewPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded px-8 py-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Reset Your Password
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
          disabled
          required
        />

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border border-gray-300 rounded px-3 py-2"
          maxLength={6}
          required
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Save New Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetNewPasswordPage;
