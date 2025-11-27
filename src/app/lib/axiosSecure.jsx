"use client";

import axios from "axios";

// Create an Axios instance
const axiosSecure = axios.create({
  baseURL: "https://event-flow-server-phi.vercel.app/", // your backend URL or Next.js API route
});

// Request interceptor: automatically add JWT token from localStorage
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 errors (token expired)
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: try refreshing token here if you implement refresh tokens
      console.warn("Unauthorized! Redirect to login or refresh token.");
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;
