import { useEffect, useState } from "react";
import type { FilterProps } from "./useUserActivities";
import toast from "react-hot-toast";
import api from "../../../../lib/api";
import type { OrderRequest } from "../../../customize-order/hooks/useOrderRequests";
import { extractPageNumber } from "../utlis/extract";
import { AxiosError } from "axios";


export const useOrderRequests = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<OrderRequest[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [filters, setFilters] = useState<FilterProps>({
        time: "",
        customerName: "",
        orderId: "",
        orderStatus: "",
    });
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [currentUrl, setCurrentUrl] = useState<string>("/orders/custom-orders/?page=1");

    const fetchOrderRequests = async (url: string) => {
        try {
            setIsLoading(true);
            setError("");

            const next = extractPageNumber(url) ?? currentPage;
            setCurrentPage(next)
            const response = await api.get(url);

            const current = extractPageNumber(url) ?? 1;

            setCurrentPage(current)
            setNextUrl(response?.data?.next);
            setPrevUrl(response?.data?.previous);
            setData(response.data?.results);
            setTotalPages(Math.ceil(response.data?.count / 12));
        } catch (err: any) {
            if (err instanceof AxiosError) {
                setError(err?.response?.data?.message || "Something went wrong.");
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchOrderRequests(currentUrl);
    }, [currentUrl]);

    const applyFilters = () => {
        const params = new URLSearchParams({
            ...(filters.time && {
                date_filter: filters.time.replaceAll(" ", "_").toLowerCase(),
            }),
            ...(filters.orderStatus && {
                status: filters.orderStatus.replaceAll(" ", "_").toLowerCase(),
            }),
            page: "1",
        });

        const filterUrl = `/orders/custom-orders/?${params.toString()}`;
        setCurrentUrl(filterUrl);
    };

    const updateStatus = async (id: number, status: OrderRequest['status'], final_price?: string) => {
        if (!id || !status) {
            toast.error("Failed to update the status.");
            return;
        }

        if (status === 'Accepted' && !final_price) {
            toast.error('You must enter a price before accepting the order.');
            return;
        }

        let previousItem: OrderRequest | undefined;

        try {
            setData((prev) =>
                prev?.map((p) => {
                    if (p.id === id) {
                        previousItem = { ...p };
                        return { ...p, status, final_price, isUpdating: true };
                    }
                    return p;
                })
            );

            await api.patch(`/orders/custom-orders/${id}/`, {
                status,
                final_price
            })
        } catch (err) {
            setData((prev) =>
                prev?.map((p) =>
                    p.id === id && previousItem ? previousItem : p
                )
            );
            toast.error("Failed to update the status");
        } finally {
            setData((prev) =>
                prev?.map((p) =>
                    p.id === id ? { ...p, isUpdating: false } : p
                )
            );
        }
    };
    const setPage = (page: number) => {
        const params = new URLSearchParams({
            ...(filters.time && {
                time: filters.time.replaceAll(" ", "_").toLowerCase(),
            }),
            ...(filters.orderStatus && {
                status: filters.orderStatus.replaceAll(" ", "_").toLowerCase(),
            }),
            page: page.toString(),
        });

        const pageUrl = `/orders/custom-orders/?${params.toString()}`;
        setCurrentUrl(pageUrl);
    };



    return {
        isLoading,
        error,
        data,
        currentPage,
        totalPages,
        hasNextPage: !!nextUrl,
        hasPrevPage: !!prevUrl,
        nextPage: () => nextUrl && setCurrentUrl(nextUrl),
        prevPage: () => prevUrl && setCurrentUrl(prevUrl),
        setPage,
        refetch: () => fetchOrderRequests(currentUrl),
        filters,
        setFilters,
        applyFilters,
        updateStatus
    }
}
