import axios, { AxiosError } from "axios";

// Base URL for the backend API, which can be configured through environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"; 

export type ApiError = {
    status: number; // HTTP status code of the error response
    message: string; // Error message describing the error
    code?: string; // Optional error code for more specific error identification
    details?: any; // Optional additional details about the error, which can be of any type
};

export const http = axios.create({
    baseURL: API_URL, // Set the base URL for all HTTP requests made using this axios instance
    headers: {
        "Content-Type": "application/json", // Set the default Content-Type header for all requests to application/json
    },
    timeout: 15000, // Set a timeout of 15000 milliseconds (15 seconds) for all requests to prevent hanging
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Retrieve the authentication token from local storage

    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // If a token exists, add it to the Authorization header of the request
    }
    return config; // Return the modified request configuration
});

http.interceptors.response.use(
    (response) => response, // If the response is successful, simply return it
    (error: AxiosError<any>) => {
        const status = error.response?.status || 500; // Get the HTTP status code from the error response, defaulting to 500 if not available
        const data = error.response?.data; // Get the response data from the error response, which may contain additional error information
        const message = 
            (typeof data?.message === "string" && data.message) || // If the response data contains a message property that is a string, use it as the error message
            (typeof error.message === "string" && error.message) || // Otherwise, if the error object itself has a message property that is a string, use that as the error message
            "An unknown error occurred"; // If neither of the above conditions are met, use a generic error message

        const apiError: ApiError = {
            status, // Set the status property of the ApiError object to the HTTP status code
            message, // Set the message property of the ApiError object to the determined error message
            code: typeof data?.code === "string" ? data.code : undefined, // If the response data contains a code property that is a string, include it in the ApiError object; otherwise, leave it undefined
            details: data?.issues ?? data?.details ?? data, // Include any additional error details from the response data, preferring issues or details properties if they exist
        };

        return Promise.reject(apiError); // Reject the promise with the constructed ApiError object to allow for consistent error handling in the application
    }
);
