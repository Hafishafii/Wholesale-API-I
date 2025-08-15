import api from "../../../lib/api";

export interface VerifyOTPPayload {
  phone_number: string;
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    phone_number: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  };
}

export const verifyOTP = async (data: VerifyOTPPayload): Promise<VerifyOTPResponse> => {
  const response = await api.post("/auth/ForgotPasswordFormp/", data);
  return response.data;
}; 