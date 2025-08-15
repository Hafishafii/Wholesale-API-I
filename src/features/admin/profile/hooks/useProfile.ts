import { useEffect, useState } from "react"
import api, { baseURL } from "../../../../lib/api";


export type ProfileData = {
    first_name: string;
    last_name: string;
    position: string;
    company_name: string;
    email: string;
    phone_number: string;
    bio: string;
    profile_pic: string;
    role: string;
    id: number;
}

export const useProfile = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('')
    const [data, setData] = useState<ProfileData>()

    const fetchAdminProfile = async () => {
        try {
            setIsLoading(true);
            setError("");
            const response = await api.get('/auth/profile/fetch_profile/')

            if (response.status !== 200) {
                throw new Error("Failed to fetch profile data.");
            }
            if (response.data?.profile_pic && !response.data?.profile_pic.includes('http')) {
                response.data?.profile_pic === baseURL?.replace('/api', '') + response?.data?.profile_pic
            }
            setData(response.data);
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchAdminProfile()
    }, [])

    return {
        data,
        refetch: fetchAdminProfile,
        error,
        isLoading
    }

}