import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#242424] px-4 text-center">
            <div className="max-w-md">
                <h1 className="mb-4 text-9xl">😓</h1>
                <h1 className="mb-2 text-6xl font-extrabold text-[#2d88ff]">404</h1>
                <h2 className="mb-6 text-3xl font-bold text-white">Page Not Found</h2>
                <p className="mb-8 text-lg text-gray-400">
                    The page you are looking for doesn't exist or another error
                    occurred.
                </p>
                <p className="text-white">
                    Head back to the{" "}
                    <Link to="/" className="font-semibold text-[#2d88ff] underline hover:text-[#1a73e8]">
                        homepage
                    </Link>{" "}
                    to find your way.
                </p>
            </div>
        </div>
    );
}

export default NotFoundPage;
