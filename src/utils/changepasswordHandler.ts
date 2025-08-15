import { validatePassword } from "./passwordValidation";

interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ValidationResult {
  error: string;
  success: boolean;
}

export const handleChangePassword = ({
  oldPassword,
  newPassword,
  confirmPassword,
}: PasswordData): ValidationResult => {
  if (oldPassword === newPassword) {
    return { error: "New password must be different from current password.", success: false };
  }

  if (!validatePassword(newPassword)) {
    return {
      error: "Password must include 1 uppercase, 1 number, 1 special character, max 8 chars.",
      success: false,
    };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New password and confirm password do not match.", success: false };
  }

  return { error: "", success: true };
};
