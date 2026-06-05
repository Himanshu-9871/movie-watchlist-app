//step 1

import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://movie-watchlist-app-x40r.onrender.com/api";
console.log("API baseURL:", baseURL);

const api = axios.create({
  baseURL,
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;