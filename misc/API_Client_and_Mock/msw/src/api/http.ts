// https.ts
import type { ApiErrorBody } from "../types/api.types";

const DEFAULT_BASE = "http://localhost:3000";

// Vite puts env vars on import.meta.env
const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL ?? DEFAULT_BASE;

/**
 * Small helper to build query strings safely.
 */
export function toQueryString(params: Record<string, unknown>): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    usp.set(k, String(v));
  }
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions =
  | {
      method?: HttpMethod;
      headers?: Record<string, string>;
      body?: unknown; // JSON body
      // (optional) if you later add auth tokens, you can inject them here
    }
  | {
      method?: HttpMethod;
      headers?: Record<string, string>;
      body?: FormData; // file uploads
    };

function isFormData(x: unknown): x is FormData {
  return typeof FormData !== "undefined" && x instanceof FormData;
}

/**
 * Generic request helper:
 * - attaches base URL
 * - handles JSON vs FormData
 * - throws a clean error when status is not OK
 * - parses JSON responses
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const method = options.method ?? "GET";

  const headers: Record<string, string> = {
    ...(options.headers ?? {}),
  };

  let body: BodyInit | undefined;

  if ("body" in options && options.body !== undefined) {
    if (isFormData(options.body)) {
      body = options.body;
      // Do NOT set Content-Type for FormData. Browser sets boundary automatically.
    } else {
      body = JSON.stringify(options.body);
      headers["Content-Type"] = "application/json";
    }
  }

  const res = await fetch(url, { method, headers, body });

  // Handle errors consistently
  if (!res.ok) {
    const contentType = res.headers.get("Content-Type") ?? "";
    let message = `HTTP ${res.status} ${res.statusText}`;
    let code = "HTTP_ERROR";
    let details: unknown = undefined;

    try {
      if (contentType.includes("application/json")) {
        const parsed = (await res.json()) as ApiErrorBody;
        if (parsed?.error?.message) message = parsed.error.message;
        if (parsed?.error?.code) code = parsed.error.code;
        details = parsed?.error?.details;
      } else {
        const text = await res.text();
        if (text) message = text;
      }
    } catch {
      // keep defaults
    }

    const err = new Error(message) as Error & { status?: number; code?: string; details?: unknown };
    err.status = res.status;
    err.code = code;
    err.details = details;
    throw err;
  }

  // 204 No Content (common for delete/logout)
  if (res.status === 204) return undefined as T;

  // Try parse JSON (assume JSON API)
  return (await res.json()) as T;
}