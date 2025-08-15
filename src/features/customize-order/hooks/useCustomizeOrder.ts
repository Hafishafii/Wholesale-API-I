
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { OrderRequest } from "./useOrderRequests";
import api from "../../../lib/api";


export const useCustomizeOrder = () => {
    const [order, setOrder] = useState<OrderRequest | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id: orderId } = useParams()

    useEffect(() => {
        if (!orderId) {
            setError("Page not found.")
            return;
        }

        const fetchOrder = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/orders/custom-orders/${orderId}`)
                setOrder(res.data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    return { order, loading, error };
};

