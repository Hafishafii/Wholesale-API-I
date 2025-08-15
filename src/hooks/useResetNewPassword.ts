// hooks/useResetNewPassword.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../lib/api";

export const useResetNewPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Auto-load email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("reset_email");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      Swal.fire("Session Expired", "Please request a new OTP", "warning");
      navigate("/forgot-password");
    }
  }, [navigate]);

  const validatePassword = () => {
    if (newPassword.length < 8) {
      Swal.fire("Error", "Password must be at least 8 characters", "error");
      return false;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) return;

    setLoading(true);
    try {
      await api.post("/auth/reset-password/", {
        email,
        otp,
        password: newPassword, // ✅ match backend field name
      });

      Swal.fire({
        icon: "success",
        title: "Password reset successfully!",
        text: "Redirecting to login...",
        timer: 2000,
        showConfirmButton: false,
      });

      localStorage.removeItem("reset_email");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      Swal.fire(
        "Error",
        error.response?.data?.error || "Invalid OTP or password reset failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    otp,
    newPassword,
    confirmPassword,
    setEmail,
    setOtp,
    setNewPassword,
    setConfirmPassword,
    handleSubmit,
    loading, // ✅ now available for UI
  };
};
