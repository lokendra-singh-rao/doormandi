// utils/axiosClient.ts
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Configure the Axios client with cookies enabled
const axiosClient: AxiosInstance = axios.create({
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token from cookies if necessary
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // This interceptor can fetch cookies if required, or just leave `withCredentials` to handle it
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for global error handling
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
    if (error.response?.data?.error?.message) {
      // Add the error message to the thrown error
      error.message = error.response.data.error.message;
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
