import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/changePassword.css";
import { handleChangePassword } from "../../../utils/changepasswordHandler";
import SuccessModal from "../../../components/common/SuccessModal";
import api from "../../../lib/api";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const { error, success } = handleChangePassword({
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (!success) {
      setError(error);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/profile/change_password/", {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      setShowSuccess(true);
      clearFields();
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 2000);
    } catch (err: any) {
      let message = "Failed to change password.";
      if (err?.response?.data) {
        message =
          err.response.data.detail ||
          err.response.data.message ||
          err.response.data.error ||
          message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="change-password-card">
      <form onSubmit={handleSubmit} className="change-password-form">
        {/* Current Password + Forgot link */}
        <div className="input-with-link">
          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="password-input"
          />
          <div className="forgot-link-container">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="forgot-link"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* New Password */}
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          maxLength={8}
          required
          className="password-input"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          maxLength={8}
          required
          className="password-input"
        />

        {/* Error */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Submit Button with Spinner */}
        <button
          type="submit"
          className="save-btn flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal
          message="Your password has been changed successfully!"
          onClose={() => {
            setShowSuccess(false);
            navigate("/");
          }}
        />
      )}
    </div>
  );
};

export default ChangePasswordForm;
