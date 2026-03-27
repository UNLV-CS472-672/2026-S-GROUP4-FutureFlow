// remote.api.ts
// Centralized wrapper for API requests.
//
// This file provides helper functions for making HTTP requests
// and allows consistent handling of base URLs, headers, and errors
// across all API modules.

import { request } from "./http";

// Base path for all API endpoints.
// Keeps endpoint definitions consistent across the app.
const BASE_PATH = "/api/v1";


// Wrapper for GET requests.
export async function remoteGet<T>(path: string): Promise<T> {
  return request<T>(`${BASE_PATH}${path}`);
}

// Wrapper for POST requests.
export async function remotePost<T>(
  path: string,
  body?: unknown
): Promise<T> {
  return request<T>(`${BASE_PATH}${path}`, {
    method: "POST",
    body,
  });
}

// Wrapper for PUT requests.
export async function remotePut<T>(
  path: string,
  body?: unknown
): Promise<T> {
  return request<T>(`${BASE_PATH}${path}`, {
    method: "PUT",
    body,
  });
}

// Wrapper for DELETE requests.
export async function remoteDelete<T>(path: string): Promise<T> {
  return request<T>(`${BASE_PATH}${path}`, {
    method: "DELETE",
  });
}