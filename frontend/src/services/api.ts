import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response.status === 401) {
      window.location.href = "/";
      return;
    }

    return Promise.reject(error);
  }
);
