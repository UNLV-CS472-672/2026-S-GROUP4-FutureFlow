// server.ts
// Sets up MSW for Node environments (e.g., testing).
//
// This is used when running tests or server-side code,
// allowing API calls to be mocked outside of the browser.
import { setupServer } from "msw/node";
import { handlers } from "./handlers/index.handlers";

// Initialize the server with all API handlers
export const server = setupServer(...handlers);