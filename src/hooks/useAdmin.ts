import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/type";
import { setAdmin, setError, setLoading } from "../slices/adminAuthSlice";
import api from "../lib/api";


export const useAdmin = () => {
    const dispatch = useDispatch();
    const { admin, loading, checked } = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(setLoading(true));
            try {

                const res = await api.get("/auth/me/", { withCredentials: true });
                const data = res.data;

                if (data?.role === "admin") {
                    dispatch(setAdmin(data));
                }
                else {
                    throw Error("Unauthorised")
                }
            } catch (err: any) {
                dispatch(setAdmin(null));
                dispatch(setError(err.response?.data?.message || "Not authenticated"));
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (!checked) {
            checkAuth()
        }
    }, []);

    return { admin, loading, checked };
};