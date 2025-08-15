import api from "../../../lib/api";

interface ResendOtpPayload {
  phone_number: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}


export const resendOtp = async (data: ResendOtpPayload) => {
  const response = await api.post("/auth/resend-otp/", data);
  return response.data;
};
