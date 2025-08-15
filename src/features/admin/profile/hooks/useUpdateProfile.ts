import { useState } from "react"
import type z from "zod";
import type { profileSchema } from "../utils/schema";
import toast from "react-hot-toast";
import api from "../../../../lib/api";
import { useNavigate } from "react-router-dom";




export const useUpdateProfile = () => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [error, setError] = useState<string>('')
    const [image, setImage] = useState<File>()
    const navigate = useNavigate()
    const updateProfile = async (data: z.infer<typeof profileSchema>) => {
        const toastId = toast.loading("Updating profile...");
        try {
            setIsUpdating(true);
            setError("");


            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === "profile_pic") return;
                if (value !== undefined && value !== null) {
                    formData.append(key, value as any);
                }
            });

            if (image) {
                formData.append("profile_pic", image);
            }


            await api.put(
                "/auth/profile/edit_profile/",
                formData,
            );

            toast.success("Profile updated.", { id: toastId });
            navigate('/admin/profile/details')
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
            toast.error(err.message || "Something went wrong.", { id: toastId });
        } finally {
            setIsUpdating(false);
        }
    }
    return {
        updateProfile,
        error,
        isUpdating,
        setImage
    }

}