import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import{registerUser}from"../../../features/auth/services/registerUser"
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateAgreement,
} from "../utils/loginvalidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [agreeError, setAgreeError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  // Debounce refs
  const firstNameTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastNameTimeout = useRef<NodeJS.Timeout | null>(null);
  const phoneTimeout = useRef<NodeJS.Timeout | null>(null);
  const passwordTimeout = useRef<NodeJS.Timeout | null>(null);

  // Responsive font size for heading and button
  const isMobile = typeof window !== "undefined" && window.innerWidth < 500;
  const headingFontSize = isMobile ? 24 : 32;
  const buttonFontSize = isMobile ? 16 : 18;

  // Debounced validation for each field
  useEffect(() => {
    if (firstNameTimeout.current) clearTimeout(firstNameTimeout.current);
    firstNameTimeout.current = setTimeout(() => {
      if (firstName && !validateFirstName(firstName)) {
        setFirstNameError("First name must be at least 2 letters.");
      } else {
        setFirstNameError("");
      }
    }, 3000);
    return () => {
      if (firstNameTimeout.current) clearTimeout(firstNameTimeout.current);
    };
  }, [firstName]);

  useEffect(() => {
    if (lastNameTimeout.current) clearTimeout(lastNameTimeout.current);
    lastNameTimeout.current = setTimeout(() => {
      if (lastName && !validateLastName(lastName)) {
        setLastNameError("Last name must be at least 2 letters.");
      } else {
        setLastNameError("");
      }
    }, 3000);
    return () => {
      if (lastNameTimeout.current) clearTimeout(lastNameTimeout.current);
    };
  }, [lastName]);

   useEffect(() => {
    setEmailError(email && !validateEmail(email) ? "Please enter a valid email address." : "");
  }, [email]);

  useEffect(() => {
    if (phoneTimeout.current) clearTimeout(phoneTimeout.current);
    phoneTimeout.current = setTimeout(() => {
      if (phone && !validatePhone(phone)) {
        setPhoneError("Phone number must be 10 digits.");
      } else {
        setPhoneError("");
      }
    }, 3000);
    return () => {
      if (phoneTimeout.current) clearTimeout(phoneTimeout.current);
    };
  }, [phone]);

  useEffect(() => {
    if (passwordTimeout.current) clearTimeout(passwordTimeout.current);
    passwordTimeout.current = setTimeout(() => {
      if (password && !validatePassword(password)) {
        setPasswordError("Password must be at least 6 characters.");
      } else {
        setPasswordError("");
      }
    }, 3000);
    return () => {
      if (passwordTimeout.current) clearTimeout(passwordTimeout.current);
    };
  }, [password]);

  useEffect(() => {
    if (agree && !validateAgreement(agree)) {
      setAgreeError("You must agree to the Terms & Conditions.");
    } else {
      setAgreeError("");
    }
  }, [agree]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    setGeneralError("");
    // Clear all errors before validation
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setAgreeError("");

    if (!validateFirstName(firstName)) {
      setFirstNameError("First name must be at least 2 letters.");
      valid = false;
    }
    if (!validateLastName(lastName)) {
      setLastNameError("Last name must be at least 2 letters.");
      valid = false;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (!validatePhone(phone)) {
      setPhoneError("Phone number must be 10 digits.");
      valid = false;
    }
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }
    if (!validateAgreement(agree)) {
      setAgreeError("You must agree to the Terms & Conditions.");
      valid = false;
    }

    if (!valid) return;

    setIsLoading(true);
    try {
      await registerUser({
        phone_number: phone,
        email: email,
        password,
        first_name: firstName,
        last_name: lastName,
        role: "customer",
      });

      localStorage.setItem("pendingUser", JSON.stringify({
        phone_number: phone,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role: "customer",
      }));

      // Show success message (optional: could use a modal/toast)
      // alert(response.message); // Removed alert
      navigate("/register-otp");
    } catch (error: any) {
      // Try to parse backend error response
      const errData = error?.response?.data;
      // DRF: { field: ["error"] } or { errors: [ { attr, detail } ] }
      if (errData) {
        if (errData.errors && Array.isArray(errData.errors)) {
          // DRF Standardized Errors format
          errData.errors.forEach((err: any) => {
            switch (err.attr) {
              case "first_name":
                setFirstNameError(err.detail);
                break;
              case "last_name":
                setLastNameError(err.detail);
                break;
              case "email":
                setEmailError(err.detail);
                break;
              case "phone_number":
              case "phone":
                setPhoneError(err.detail);
                break;
              case "password":
                setPasswordError(err.detail);
                break;
              default:
                // If attr is null or not a field, show as general error
                setGeneralError(err.detail);
            }
          });
        } else {
          // Fallback: classic DRF error format { field: ["error"] }
          if (errData.first_name) setFirstNameError(errData.first_name[0]);
          if (errData.last_name) setLastNameError(errData.last_name[0]);
          if (errData.email) setEmailError(errData.email[0]);
          if (errData.phone_number) setPhoneError(errData.phone_number[0]);
          if (errData.phone) setPhoneError(errData.phone[0]);
          if (errData.password) setPasswordError(errData.password[0]);
          if (errData.non_field_errors) setGeneralError(errData.non_field_errors[0]);
          // If nothing matches, show a generic error
          if (!errData.first_name && !errData.last_name && !errData.email && !errData.phone_number && !errData.password && !errData.non_field_errors) {
            setGeneralError(errData.message || errData.error || "Registration failed. Please try again later.");
          }
        }
      } else {
        setGeneralError("Registration failed. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl  bg-white rounded-xl shadow-lg p-8"
      >
        {generalError && (
          <div style={{ color: "red", fontSize: 15, marginBottom: 12, textAlign: "center" }}>
            {generalError}
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <a
            href="/"
            style={{ color: "#222", fontSize: 13, textDecoration: "none" }}
          >
            {"<"} Back to login
          </a>
        </div>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: headingFontSize,
              lineHeight: 1.1,
              display: "block",
              wordBreak: "break-word",
            }}
          >
            Create an account
          </span>
        </div>
        <div style={{ marginBottom: 14 }}>
          <Input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: "100%" }}
          />
          {firstNameError && (
            <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {firstNameError}
            </div>
          )}
        </div>
        <div style={{ marginBottom: 14 }}>
          <Input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: "100%" }}
          />
          {lastNameError && (
            <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {lastNameError}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1 text-sm">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 15,
              marginBottom: 4,
              display: "block",
            }}
          >
            Phone Number
          </label>
          <Input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "100%" }}
          />
          {phoneError && (
            <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {phoneError}
            </div>
          )}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 15,
              marginBottom: 4,
              display: "block",
            }}
          >
            Password
          </label>

          <div style={{ position: "relative" }}>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: 36, width: "100%" }}
            />
            <span
              onClick={() => setShowPassword((s) => !s)}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 20,
                color: "#666",
                cursor: "pointer",
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {passwordError && (
            <div style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {passwordError}
            </div>
          )}
        </div>
        <div style={{ marginBottom: 18, display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          <span style={{ fontSize: 14 }}>
            I Agree To The{" "}
            <a href="#" style={{ color: "#0056d6", textDecoration: "none" }}>
              Terms & Conditions
            </a>
          </span>
        </div>
        {agreeError && (
          <div
            style={{
              color: "red",
              fontSize: 14,
              marginTop: -10,
              marginBottom: 10,
            }}
          >
            {agreeError}
          </div>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            background: isLoading ? "#666" : "#003399",  
            color: "#fff",
            fontWeight: 600,
            fontSize: buttonFontSize,
            borderRadius: 8,
            margin: "18px 0 8px 0",
            padding: "12px 0",
            cursor: isLoading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {isLoading && <LoadingSpinner size="sm" className="text-white" />}
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
        <div
          style={{
            textAlign: "center",
            marginTop: 16,
            color: "#888",
            fontSize: 16,
          }}
        >
          <Button
            type="button"
            onClick={() => alert("Google Sign-in clicked")}
            style={{
              width: "100%",
              backgroundColor: "#e8f0fe", // Light blue
              color: "#3c4043", // Text color
              fontWeight: 500,
              fontSize: 16,
              borderRadius: 8,
              padding: "10px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              style={{ width: 20, height: 20 }}
            />
            Continue with Google
          </Button>
          Already Have An Account ?{" "}
          <a
            href="/"
            style={{ color: "#0056d6", fontWeight: 600, textDecoration: "none" }}
          >
            Log In
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
