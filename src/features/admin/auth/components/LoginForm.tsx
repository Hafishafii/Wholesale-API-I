import { useState, type FormEvent } from "react";
import LoginInput from "./LoginInput";
import Heading from "./Heading";
import { useLogin } from "../hooks/useLogin";
import { Button } from "../../../../components/ui/button";
import AlertMessage from "../../../../components/Warnings/AlertMessage";
import Spinner from "../../../../components/common/Spinner";
import { useAdmin } from "../../../../hooks/useAdmin";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const { admin, loading } = useAdmin();
  const { error, handleLogin, isLoading } = useLogin();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  if (admin) return <Navigate to={"/admin"} replace />;

  if (loading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[480px] min-w-[260px] mx-auto p-6 sm:px-[5vw] rounded-xl bg-white shadow-md border-[1px]"
    >
      <Heading />

      <LoginInput
        label="Email"
        type="email"
        value={email}
        placeholder="you@example.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <LoginInput
        label="Password"
        type="password"
        value={password}
        placeholder="********"
        onChange={(e) => setPassword(e.target.value)}
      />

      <AlertMessage title={error && "Operation Failed!"} type="error" description={error || ""} />
      <Button
        className="bg-black text-white w-full mt-[10px]"
        disabled={isLoading}
      >
        {isLoading ? "Signing you in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
