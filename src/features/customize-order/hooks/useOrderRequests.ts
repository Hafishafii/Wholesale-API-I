import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { extractPageNumber } from "../../admin/home/utlis/extract";
import { useSearchParams } from "react-router-dom";

type ColorPreferences = {
    primary: string;
    secondary: string;
};

export interface OrderRequest {
    id: number;
    name: string;
    email: string;
    phone: string;
    product_type: string;
    fabric_type: string;
    style_pattern: string;
    size: string;
    quantity: number;
    budget: string;
    color_preferences: ColorPreferences;
    color_reference_image: string | null;
    sample_design: string | null;
    size_chart: string | null;
    preferred_delivery_date: string;
    final_price?: string | null;
    created_at: string;
    status: "pending" | "Accepted" | 'cancelled';
    additional_instructions: string;
    brand_label: boolean;
    is_custom_order: boolean;
    user: number;
    isUpdating?: boolean
}


export const useOrderRequests = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<OrderRequest[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = searchParams.get("page") || "1";
    const [currentUrl, setCurrentUrl] = useState<string>(`/orders/custom-orders/?page=${initialPage}`);
    
    const fetchOrderRequests = async (url: string) => {
        try {
            setIsLoading(true);
            setError("");

            const next = extractPageNumber(url) ?? currentPage;
            setCurrentPage(next)
            const response = await api.get(url);


            const resData = response.data;
            const count = resData.count;


            const current = extractPageNumber(url) ?? 1;
            setSearchParams({ page: String(current) });
            setData(resData.results);
            setNextUrl(resData.next);
            setPrevUrl(resData.previous);
            setCurrentPage(current);
            setTotalPages(Math.ceil(count / 12));
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchOrderRequests(currentUrl);
    }, [currentUrl]);


    const setPage = (page: number) => {
        const params = new URLSearchParams({
            page: page.toString(),
        });

        const pageUrl = `/orders/custom-orders/?${params.toString()}`;
        setCurrentUrl(pageUrl);
    };


    return {
        isLoading,
        error,
        data,
        hasNextPage: !!nextUrl,
        hasPrevPage: !!prevUrl,
        currentPage,
        totalPages,
        nextPage: () => nextUrl && setCurrentUrl(nextUrl),
        prevPage: () => prevUrl && setCurrentUrl(prevUrl),
        setPage,
        refetch: () => fetchOrderRequests(currentUrl),
    }
}
