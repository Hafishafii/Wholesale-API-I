import axios from "axios"; 
import { baseURL } from "../../../lib/api";

interface VerifyOtpPayload {
  phone_number: string;
  otp: string;
}

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const res = await axios.post(
    `${baseURL}/auth/verify-otp/`,
    payload
  );
  return res.data;
};
