import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api"; // 👈 Custom axios instance

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await api.post("/auth/forgot-password/", { email });
      Swal.fire("Success", "OTP sent to your email", "success");
      localStorage.setItem("reset_email", email);
      navigate("/reset-password");
    } catch (error) {
      Swal.fire("Error", "Failed to send OTP", "error");
      console.error("Error sending OTP", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Enter your email to receive an OTP to reset your password.
        </p>
        <form onSubmit={handleSendOTP}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading} // ✅ Disable input while loading
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 disabled:bg-gray-100"
            placeholder="example@example.com"
          />
          <button
            type="submit"
            disabled={loading} // ✅ Disable button while loading
            className={`w-full text-white py-2 rounded-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
