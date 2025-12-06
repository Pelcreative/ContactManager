import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE?.trim() || "http://localhost:5000/api",
});

// Attach token automatically if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;

