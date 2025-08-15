import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../lib/api";

const OTPResetForm: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{1,8}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(newPassword)) {
      setError(
        "Password must include 1 uppercase, 1 number, 1 special character, and max 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const email = localStorage.getItem("reset_email");
    if (!email) {
      setError("Session expired. Please start over.");
      return;
    }

    try {
      const res = await api.post(
        "/password-reset/verify-otp/",
        {
          email,
          otp,
          new_password: newPassword,
        }
      );

      if (res.data.message?.includes("successful")) {
        Swal.fire("Success", "Password reset successful!", "success");
        localStorage.removeItem("reset_email");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        Swal.fire("Failed", "Invalid OTP or reset failed.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error. Please try again.", "error");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md border mt-6">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Verify OTP & Reset Password
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          maxLength={8}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          maxLength={8}
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white rounded px-3 py-2 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default OTPResetForm;
