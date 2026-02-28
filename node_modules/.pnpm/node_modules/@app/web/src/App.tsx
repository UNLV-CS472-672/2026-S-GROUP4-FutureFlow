/* 
This file is the main entry point for the React application.
It sets up the routing and renders the main components of the app. 
It uses React Router for client-side routing and includes a simple navigation menu to switch between different pages (Home, About, Contact). 
The App component is wrapped in a BrowserRouter to enable routing functionality.
*/

import { BrowserRouter, Routes, Route} from "react-router-dom"; // Import necessary components from react-router-dom for client-side routing
import Login from "./routes/Login"; // Import the Login component for the login page
import Dashboard from "./routes/Dashboard"; // Import the Dashboard component for the dashboard page
import NotFound from "./routes/NotFound"; // Import the NotFound component for handling 404 errors
import AuthGuard from "./components/AuthGuard"; // Import the AuthGuard component to protect routes that require authentication

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} /> {/* Define a route for the login page */}
                <Route path="/dashboard" 
                /* Define a protected route for the dashboard page, wrapped in AuthGuard to ensure only authenticated users can access it */
                element={
                    <AuthGuard>
                        <Dashboard /> 
                    </AuthGuard>
                }
                />
                {/* Define a catch-all route for handling 404 errors, rendering the NotFound component */}
                <Route path="*" element={<NotFound />} /> 
            </Routes>
        </BrowserRouter>
    );
}