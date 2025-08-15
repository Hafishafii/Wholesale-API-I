import api from "../../../lib/api"; 

export interface RegisterPayload {
  phone_number: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: "customer" | "staff" | string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await api.post("/auth/register/", data);
  return response.data;
};
