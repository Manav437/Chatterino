import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * A wrapper component that checks for authentication.
 * If authenticated, it renders the child routes (Outlet).
 * If not authenticated, it redirects to the login page.
 */
const ProtectedRoute = ({ redirectPath = "/login" }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
