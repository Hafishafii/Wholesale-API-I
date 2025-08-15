// features/auth/api/loginUser.ts
import api from "../../../lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post("/auth/login/", payload);
  return res.data;
};
