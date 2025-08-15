import { useEffect, useState } from "react"
import api from "../../../lib/api"
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert';
import { useForm } from "react-hook-form"

type Inputs = {
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
    phone_number: string;
    bio: string;
}
type User = {
    first_name: string;
    last_name: string;
}

const useFetchProfile = () => {
    const [user, setUser] = useState<User | null>()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    const navigate = useNavigate()

    useEffect(() => {
        const getProfile = async () => {
            try {
                setIsLoading(true)
                const { data } = await api.get(`/auth/profile/fetch_profile/`);
                reset({
                    first_name: data?.first_name || "",
                    last_name: data?.last_name || "",
                    company_name: data?.company_name || "",
                    email: data?.email || "",
                    phone_number: data?.phone_number || "",
                    bio: data?.bio || "",
                });
                setUser({
                    first_name: data?.first_name || "",
                    last_name: data?.last_name || "",
                })

            } catch (error: any) {
                swal(error.response.data.message)
            } finally {
                setIsLoading(false)
            }
        }
        getProfile()
    }, [reset])


    const handleSave = async (data: any) => {
        try {
            setIsLoading(true)
            const res = await api.put(`/auth/profile/edit_profile/`, data)
            swal(res.data.message)
            navigate('/profile')
        } catch (error: any) {
            swal(error.response.data.message)
        } finally {
            setIsLoading(false)
        }

    }
    return { handleSave, handleSubmit, register, navigate, errors, isLoading, user }
}

export default useFetchProfile