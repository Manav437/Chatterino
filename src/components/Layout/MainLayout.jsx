import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

const MainLayout = () => {
    return (
        <div className="flex h-screen w-screen bg-[#111] overflow-hidden flex-col md:flex-row">
            <div className="hidden md:block w-[250px] shrink-0">
                <Navbar />
            </div>
            <div className="md:hidden">
                <Navbar />
            </div>
            <main className="flex-1 h-full overflow-hidden pb-[70px] md:pb-0">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
