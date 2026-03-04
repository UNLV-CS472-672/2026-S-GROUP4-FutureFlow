// server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers/index.handlers";

export const server = setupServer(...handlers);