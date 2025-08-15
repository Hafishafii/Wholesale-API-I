import { useDispatch } from "react-redux";
import { setAdmin } from "../../../../slices/adminAuthSlice";
import { useState } from "react";
import api, { baseURL } from "../../../../lib/api";
import { setLocalStorage } from "../../../../utils/helpers/localStorage";
import axios, { AxiosError } from "axios";

type LoginDataType = {
    email: string;
    password: string;
}
export const delay = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));


export const useLogin = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogin = async (data: LoginDataType) => {

        if (!data?.email || !data?.password) {
            setError("Email and password are required")
            return;
        }

        try {
            setError('')
            setIsLoading(true)

            const res = await axios.post(`${baseURL}/auth/admin/login/`, data)

            if (res.data) {
                setLocalStorage("accessToken", res.data.access)
                const response = await api.get('/auth/me/')
                const admin = response.data
                if (admin.role === 'admin') {
                    dispatch(setAdmin(admin));
                } else {
                    setError("Sorry, you don't have admin privileges.");
                    return;
                }

            }

        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error?.response?.data?.detail || "Login failed.")
            } else {
                setError("Login failed.")
            }
        } finally {
            setIsLoading(false)
        }
    }


    return {
        error,
        handleLogin,
        isLoading
    }

}