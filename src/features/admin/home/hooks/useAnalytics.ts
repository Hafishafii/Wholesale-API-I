import { useEffect, useState } from "react";
import api from "../../../../lib/api";

export type AnalysticsType = Record<string,number>

export const useAnalytics = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('')
    const [data, setData] = useState<AnalysticsType[]>([])

    const fetchAnalytics = async () => {
        try {
            setIsLoading(true);
            setError("");
            const response = await api.get('/admin/analytics')

            if (response.status !== 200) {
                throw new Error("Failed to fetch analytics.");
            }
            setData(response.data);
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchAnalytics()
    }, [])


    return {
        isLoading,
        error,
        refetch: fetchAnalytics,
        data
    }
}