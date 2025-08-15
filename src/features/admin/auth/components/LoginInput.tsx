import { type ChangeEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../../../../components/ui/input";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: "email" | "password" | "tel";
  label: string;
  placeholder: string;
}

const LoginInput = ({ value, onChange, type, label, placeholder }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Input
          
          placeholder={placeholder}
          type={inputType}
          value={value}
          onChange={onChange}
        />
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
    </div>
  );
};

export default LoginInput;
