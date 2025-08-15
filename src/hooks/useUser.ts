import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/type";
import { setUser, setError, setLoading } from "../slices/userAuthSlice";
import api from "../lib/api";


export const useUser = () => {
    const dispatch = useDispatch();
    const { user, loading, checked } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(setLoading(true));
            try {
                const res = await api.get("/auth/me/", { withCredentials: true });

                const data = res.data;
                if (data) {
                    dispatch(setUser(data));
                }
                else {
                    throw Error("Unauthorised")
                }
            } catch (err: any) {
                dispatch(setUser(null));
                dispatch(setError(err.response?.data?.message || "Not authenticated"));
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (!checked) {
            checkAuth()
        }
    }, []);

    return { user, loading, checked };
};