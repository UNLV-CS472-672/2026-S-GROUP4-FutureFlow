// This is the entry point of the React application. 
// It renders the App component into the root element of the HTML document.
// The App component is wrapped in React.StrictMode, which is a tool for highlighting potential problems in an application. 
// It activates additional checks and warnings for its descendants, helping developers identify and fix issues early in 
// the development process.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);