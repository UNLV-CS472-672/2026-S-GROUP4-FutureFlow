// browser.ts
// Sets up the Mock Service Worker (MSW) for browser environments.
//
// This worker intercepts outgoing HTTP requests from the frontend
// and returns mock responses defined in the handlers.
// It allows frontend development without a running backend.
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/index.handlers";

// Initialize the service worker with all API handlers
export const worker = setupWorker(...handlers);