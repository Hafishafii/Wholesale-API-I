import { useEffect, useState } from "react";
import api from "../../../lib/api";
import swal from "sweetalert";

const useFetchPurchase = () => {
    const [purchaseDetails, setPurchaseDetails] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getPurchase = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(`/orders/my-orders/`);
                const backendOrders = response.data.results ?? [];

                // Flatten all items from all orders into one array
                const formattedOrders:any[] = backendOrders.flatMap((order: any) => {
                    return order.items ?? [];
                });

                setPurchaseDetails(formattedOrders);
            } catch (error: any) {
                swal(error.response?.data?.message || "My Order Fetch Error");
            } finally {
                setIsLoading(false);
            }
        };

        getPurchase();
    }, []);

    return { purchaseDetails, isLoading };
};

export default useFetchPurchase;
