import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    // Check for the presence of a token in local storage to determine if the user is authenticated
    const token = localStorage.getItem("token"); 

    if (!token) {
        return <Navigate to="/login" replace />; // If no token is found, redirect the user to the login page
    } 

    // If a token is found, render the child components, allowing access to the protected route
    return <>{children}</>;   
}