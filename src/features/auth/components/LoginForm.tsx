import React, { useState, useRef } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { validateEmail, validatePassword, handleLoginError } from "../utils/loginvalidation";
import { setLocalStorage } from "../../../utils/helpers/localStorage"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../features/auth/services/loginUser"
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const emailTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const passwordTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setGeneralError("");
  setEmailError("");
  setPasswordError("");

  let valid = true;

  if (emailTimeoutRef.current) clearTimeout(emailTimeoutRef.current);
  if (passwordTimeoutRef.current) clearTimeout(passwordTimeoutRef.current);

  if (!validateEmail(email)) {
    setEmailError("Please enter a valid email address.");
    emailTimeoutRef.current = setTimeout(() => setEmailError(""), 3000);
    valid = false;
  } else {
    setEmailError("");
  }

  if (!validatePassword(password)) {
    setPasswordError("Password must be at least 6 characters.");
    passwordTimeoutRef.current = setTimeout(() => setPasswordError(""), 3000);
    valid = false;
  } else {
    setPasswordError("");
  }

  if (!valid) return;

  setIsLoading(true);
  try {
    const { access, refresh } = await loginUser({
      email: email,
      password: password,
    });

    setLocalStorage("accessToken", access);
    setLocalStorage("refreshToken", refresh);

    // 🔐 Redirect after login success
    navigate("/home");
  } catch (err: any) {
    const { emailError, passwordError, generalError } = handleLoginError(err);
    if (emailError) setEmailError(emailError);
    if (passwordError) setPasswordError(passwordError);
    if (generalError) setGeneralError(generalError);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[700px] min-w-[280px] min-h-[700px] mx-auto p-6 sm:p-10 md:p-12 rounded-xl bg-white shadow-lg flex flex-col justify-center"
      >
        {generalError && (
          <div className="text-red-500 text-base text-center mb-4 font-semibold">
            {generalError}
          </div>
        )}
        <div className="text-center mb-7">
          <span className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight block break-words">
            Your <span className="text-gray-500 font-bold">company name</span>Account{" "}
          </span>
        </div>

        <div className="text-center mb-6 text-base sm:text-lg">
          <span>Sign in or </span>
          <a
            href="/register"
            className="text-blue-600 font-semibold no-underline hover:underline"
          >
            Create an account
          </a>
        </div>

        <div className="mb-4 sm:mb-5">
          <label className="font-medium text-sm sm:text-base mb-1 block">
            Email Address
          </label>
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-9 w-full"
              style={{ background: "#fff" }}
            />
          </div>
          {emailError && (
            <div className="text-red-500 text-xs sm:text-sm mt-1">
              {emailError}
            </div>
          )}
        </div>

        <div className="mb-4 sm:mb-5">
          <label className="font-medium text-sm sm:text-base mb-1 block">
            Password{" "}
            <a
              href="#"
              className="float-right text-blue-600 font-medium text-xs sm:text-sm no-underline hover:underline"
            >
              Forgot ?
            </a>
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-9 w-full"
              style={{ background: "#fff" }}
            />
            <span
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg cursor-pointer hover:text-gray-800"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && (
            <div className="text-red-500 text-xs sm:text-sm mt-1">
              {passwordError}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-blue-600 text-white font-semibold text-base sm:text-lg rounded-lg my-4 sm:my-5 py-3 cursor-pointer transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <LoadingSpinner size="sm" className="text-white" />}
          {isLoading ? "Logging in..." : "Login now"}
        </Button>

        <div className="text-center mt-4 text-gray-500 text-sm sm:text-base">
          Don't Have An Account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold no-underline hover:underline"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
