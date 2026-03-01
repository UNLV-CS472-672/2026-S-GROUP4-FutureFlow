import { http } from "./httpClient";

// Type definitions for the request and response payloads for the authentication-related API endpoints
export type LoginRequest = {
    email: string; // The email address of the user attempting to log in
    password: string; // The password of the user attempting to log in
};

// Type definitions for the response payloads from the authentication-related API endpoints, including the login response and the user information response
export type LoginResponse = {
    token: string; // The authentication token returned by the server upon successful login, which can be used for authenticated requests
};

// Type definition for the response payload from the /me endpoint, which returns the authenticated user's information
export type MeResponse = {
    id: string; // The unique identifier of the authenticated user
    email: string; // The email address of the authenticated user
};

// POST /auth/login
// Function to handle user login by sending a POST request to the /auth/login endpoint with the user's credentials and returning the authentication token
export async function login(body: LoginRequest): Promise<LoginResponse> {
    const response = await http.post<LoginResponse>("/auth/login", body); // Send a POST request to the /auth/login endpoint with the login credentials in the request body
    return response.data; // Return the data from the response, which should contain the authentication token
}

// POST /auth/register
// Function to handle user registration by sending a POST request to the /auth/register endpoint with the user's registration details and returning the user's information
export async function register(body: LoginRequest): Promise<MeResponse> {
    const res = await http.post<MeResponse>("/auth/register", body); // Send a POST request to the /auth/register endpoint with the registration details in the request body
    return res.data; // Return the data from the response, which should contain the user's information
}

// GET /me
// Function to retrieve the authenticated user's information by sending a GET request to the /me endpoint and returning the user's information
export async function getMe(): Promise<MeResponse> {
    const res = await http.get<MeResponse>("/me"); // Send a GET request to the /me endpoint to retrieve the authenticated user's information
    return res.data; // Return the data from the response, which should contain the user's information
}