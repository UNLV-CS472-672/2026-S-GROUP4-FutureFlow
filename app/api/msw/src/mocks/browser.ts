// src/mocks/browser.ts
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/index.handlers";

export const worker = setupWorker(...handlers);