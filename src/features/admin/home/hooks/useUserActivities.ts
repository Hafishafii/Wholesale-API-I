import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import { extractPageNumber } from "../utlis/extract";
import { AxiosError } from "axios";

export type UserActivityType = {
  activity_type: "login" | "registered" | "order_placed";
  additional_data: {
    description: string;
  };
  id: string;
  timestamp: Date;
  user: number;
};

export type FilterProps = {
  time: string;
  customerName: string;
  orderId: string;
  orderStatus: string;
};

export const useUserActivities = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<UserActivityType[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("/admin/user-activities/?page=1");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [filters, setFilters] = useState<FilterProps>({
    time: "",
    customerName: "",
    orderId: "",
    orderStatus: "",
  });



  const fetchUserActivities = async (url: string) => {
    try {
      setIsLoading(true);
      setError("");

      const next = extractPageNumber(url) ?? currentPage;
      setCurrentPage(next)
      const response = await api.get(url);


      if (response.status !== 200) {
        throw new Error("Failed to fetch user activities.");
      }

      const resData = response.data;
      const count = resData.count;


      const current = extractPageNumber(url) ?? 1;

      setData(resData.results);
      setNextUrl(resData.next);
      setPrevUrl(resData.previous);
      setCurrentPage(current);
      setTotalPages(Math.ceil(count / 4));
    } catch (err: any) {
      if (err instanceof AxiosError) {
        setError(err?.response?.data?.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserActivities(currentUrl);
  }, [currentUrl]);

  const applyFilters = () => {
    const params = new URLSearchParams({
      ...(filters.time && {
        date_filter: filters.time.replaceAll(" ", "_").toLowerCase(),
      }),
      ...(filters.orderStatus && {
        status: filters.orderStatus,
      }),
      page: "1",
    });

    const filterUrl = `/admin/user-activities/?${params.toString()}`;
    setCurrentUrl(filterUrl);
  };

  const setPage = (page: number) => {
    const params = new URLSearchParams({
      ...(filters.time && {
        time: filters.time.replaceAll(" ", "_").toLowerCase(),
      }),
      page: page.toString(),
    });

    const pageUrl = `/admin/user-activities/?${params.toString()}`;
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
    refetch: () => fetchUserActivities(currentUrl),
    filters,
    setFilters,
    applyFilters,
  };
};
