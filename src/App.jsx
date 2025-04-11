import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./components/Register/Register";
import HomeLoggedIn from "./components/Home/HomeLoggedIn";
import HomeNotLoggedIn from "./components/Home/HomeNotLoggedIn";
import ProfilePage from "./components/Profile/Profile";
import LoginPage from "./components/Login/Login";
import ChatsPage from "./components/Chats/Chat";
import { auth } from "./firebase"; // Adjust the import path as necessary
import { onAuthStateChanged } from "firebase/auth";
import "./App.css"

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsLoggedIn(!!user); // Convert user object to boolean (IMPPPPP)
			setTimeout(() => {
				setLoading(false);
			}, 1200);
		});

		return () => unsubscribe();
	}, []);

	if (loading) return (
		<div style={{ marginTop: "35vh" }} className="app-loader"></div>
	)
	return (
		<Router>
			<Routes>
				<Route path="/" element={isLoggedIn ? <HomeLoggedIn /> : <HomeNotLoggedIn />} />
				<Route path="/register" element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/" />} />
				<Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />} />
				<Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
				<Route path="/chats" element={isLoggedIn ? <ChatsPage /> : <Navigate to="/login" />} />
				{/* <Route path="/about" element={<About />} /> */}

			</Routes>
		</Router>
	)
}

export default App;