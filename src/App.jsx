import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import RegisterPage from "./components/Register/Register";
import HomeLoggedIn from "./components/Home/HomeLoggedIn";
import HomeNotLoggedIn from "./components/Home/HomeNotLoggedIn";
import ProfilePage from "./components/Profile/Profile";
import LoginPage from "./components/Login/Login";
import ChatsPage from "./components/Chats/Chat";
import AboutPage from "./components/About/About";
import NotFoundPage from "./components/NotFoundPage/NotFound";
import { useAuth } from "./context/AuthContext";
import MainLayout from "./components/Layout/MainLayout";
import ProtectedRoute from "./components/Layout/ProtectedRoute";

function App() {
    const { isLoggedIn } = useAuth();

    return (
        <Router>
            <Routes>
                <Route
                    path="/register"
                    element={
                        !isLoggedIn ? <RegisterPage /> : <Navigate to="/" />
                    }
                />
                <Route
                    path="/login"
                    element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
                />
                <Route path="/about" element={<AboutPage />} />

                <Route
                    path="/"
                    element={isLoggedIn ? <MainLayout /> : <HomeNotLoggedIn />}
                >
                    {isLoggedIn && <Route index element={<HomeLoggedIn />} />}
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/chats" element={<ChatsPage />} />
                    </Route>
                </Route>

                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
