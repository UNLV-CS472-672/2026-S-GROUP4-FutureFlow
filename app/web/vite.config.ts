import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()], // Use the React plugin to enable support for React in the Vite build process
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src") // Set up an alias for the src directory to simplify imports in the project
        },
    },

    server: {
        port: 5173, // Specify the port for the development server to run on
        open: true, // Automatically open the browser when the development server starts
        proxy: {
            "/auth": "http://localhost:3000", // Proxy requests starting with /auth to the backend server running on port 3000
            "/me": "http://localhost:3000", // Proxy requests starting with /me to the backend server running on port 3000
            "/health": "http://localhost:3000", // Proxy requests starting with /health to the backend server running on port 3000
        },
    },

    build: {
        outDir: "dist", // Specify the output directory for the production build
        sourcemap: true, // Generate source maps for the production build to aid in debugging
    },
});