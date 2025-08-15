import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../../lib/api";
import { useNavigate } from "react-router-dom";

interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    reEnterPassword: string;
}

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const changePassword = async (data: ChangePasswordData) => {
        setLoading(true);
        try {
            if (data.newPassword !== data.reEnterPassword) {
                throw new Error("New passwords do not match");
            }

            const payload = {
                old_password: data?.currentPassword,
                new_password: data?.newPassword,
            };

            const response = await api.post("/auth/profile/change_password/", payload);

            toast.success("Password successfully changed.");
            navigate('/admin/profile')
            return response.data;
        } catch (error: any) {
            const message = error?.response?.data?.error || error.message || "Something went wrong";
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading };
};
