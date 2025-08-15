import { useState } from "react";
import { Input } from "../../../../components/ui/input";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label: string;
  name?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  className?: string;
  type?: "text" | "password";
};

const FormInput = ({ label, name, registration, type, error }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Input id={name} type={inputType} {...registration} />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default FormInput;
