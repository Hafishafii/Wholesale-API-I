import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../lib/api";
import { AxiosError } from "axios";

export type TrackOrderType = {
    status: 'pending' | 'Accepted' | 'shipped' | 'delivered' | 'cancelled';
    id: number
    ordered_at: Date;
    delivered_at: Date;
}

export const useTrackOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<TrackOrderType>();

    const { id } = useParams()

    const fetchOrderStatus = async () => {

        if (!id) {
            setError("Page Not Found")
            return;
        }
        try {
            setIsLoading(true);
            setError("");
            const response = await api.get(`/orders/my-orders/${id}/`)

            if (response.status !== 200) {
                throw new Error("Failed to fetch order status.");
            }

            const data = response.data;

            setData(data);
        } catch (err: any) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.detail || "Something went wrong.");

            } else {
                setError("Something went wrong.")
            }
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchOrderStatus()
    }, [])

    return {
        isLoading,
        error,
        data,
        refetch: fetchOrderStatus,
    };
};
