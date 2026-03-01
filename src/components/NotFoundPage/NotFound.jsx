import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFoundPage() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-emoji">😓</h1>
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Page Not Found</h2>
                <p className="not-found-text">
                    The page you are looking for doesn't exist or another error
                    occurred.
                </p>
                <p className="not-found-link-text">
                    Head back to the{" "}
                    <Link to="/" className="home-link">
                        homepage
                    </Link>{" "}
                    to find your way.
                </p>
            </div>
        </div>
    );
}

export default NotFoundPage;
