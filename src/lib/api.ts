import axios, { isAxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5004/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tix_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error) && typeof error.response?.data?.message === "string") {
    return error.response.data.message;
  }
  return "Something went wrong. Please try again.";
};

export default api;
