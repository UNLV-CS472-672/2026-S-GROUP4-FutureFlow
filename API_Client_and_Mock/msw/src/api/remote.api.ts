// remote.api.ts
// Centralized wrapper for API requests.

import { request } from "./http";

const BASE_PATH = "/api/v1";

export async function remoteGet<T>(path: string): Promise<T> {
  return request<T>(`${BASE_PATH}${path}`);
}

export async function remotePost<T>(
  path: string,
  body?: unknown | FormData
): Promise<T> {
  return request<T>(`${BASE_PATH}${path}`, {
    method: "POST",
    body,
  });
}

export async function remotePut<T>(
  path: string,
  body?: unknown | FormData
): Promise<T> {
  return request<T>(`${BASE_PATH}${path}`, {
    method: "PUT",
    body,
  });
}

export async function remoteDelete<T>(path: string): Promise<T> {
  return request<T>(`${BASE_PATH}${path}`, {
    method: "DELETE",
  });
}