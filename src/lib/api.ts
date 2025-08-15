import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import {
    getLocalStorage,
    setLocalStorage,
    deleteLocalStorage,
} from "../utils/helpers/localStorage";

export const baseURL = import.meta.env.VITE_API_URL;

type FailedRequest = {
    resolve: (token: string) => void;
    reject: (err: AxiosError) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error!);
        }
    });
    failedQueue = [];
};

const api: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getLocalStorage("accessToken");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
        const originalRequest = err.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            if (originalRequest.headers) {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                            }
                            resolve(api(originalRequest));
                        },
                        reject: (error: AxiosError) => {
                            reject(error);
                        },
                    });
                });
            }

            isRefreshing = true;

            try {
                const res = await axios.post(
                    `${baseURL}/auth/token/refresh/`, {},
                    { withCredentials: true }
                );
                const newAccessToken = (res.data as { access: string }).access;
                setLocalStorage("accessToken", newAccessToken);
                processQueue(null, newAccessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return api(originalRequest);
            } catch (refreshErr: any) {
                processQueue(refreshErr, null);
                deleteLocalStorage("accessToken");
                return Promise.reject(refreshErr);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(err);
    }
);

export default api;
