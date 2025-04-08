import "./Home.css"
import Feed from "../Feed/Feed"
import { database } from '../../firebase';
import { ref, onValue } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import UserList from "../UserList"
import { useLocation } from "react-router-dom";
import ShimmerUI from "../Shimmer/Shimmer";
import { useEffect, useState } from "react";

function HomeLoggedIn() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const auth = getAuth();
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        // Assume you store users in 'users' node
        const usersRef = ref(database, 'users');
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            const userList = Object.entries(data || {}).map(([uid, info]) => ({ uid, ...info }));
            setUsers(userList.filter(u => u.uid !== auth.currentUser?.uid));
        });
    }, []);

    useEffect(() => {
        const hasVisitedHome = localStorage.getItem("hasVisitedHome");
        if (!hasVisitedHome && currentPath === "/") {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                localStorage.setItem("hasVisitedHome", "true");
            }, 500); // your shimmer duration
        }
    }, [])

    function handleLogout() {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("token"); // If you store a token, clear it
                alert("Logged out successfully");
                navigate("/"); // Redirect to the login or home page
            })
            .catch((error) => {
                console.error("Logout Error:", error);
            });
    }

    if (loading) return <ShimmerUI />
    return (
        <div className="home-container">
            <div className="navbar">
                <div className="home-logo" style={{ paddingBottom: "30px", borderBottom: "1px solid white" }}>
                    <img style={{ height: "64px", width: "64px" }} src="/home-logo-img.png" alt="" />
                    <p style={{ marginTop: "10px", marginBottom: "0" }}>Chatterino</p>
                </div>
                {/* <hr style={{ width: "80%" }} /> */}
                <div className="nav-items" style={{ width: "100%" }}>
                    <div className="nav-item">
                        <Link to="/" className={`${currentPath === "/" ? "active" : ""} nav-links`}>Home</Link >
                    </div>
                    <div className="nav-item">
                        <Link to="/chats" className={`${currentPath === "chats" ? "active" : ""} nav-links`}>Chat</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/profile" className={`${currentPath === "/profile" ? "active" : ""} nav-links`}>Profile</Link>
                    </div>
                </div>
            </div >
            <div className="section-two">
                <div style={{ borderBottom: "1px solid offwhite", background: "black" }}>
                    Home Page
                </div>
                <Feed /><Feed /><Feed /><Feed /><Feed /><Feed /><Feed /><Feed /><Feed /><Feed /><Feed />
            </div>
            <div className="section-three">
                <div style={{ borderBottom: "1px solid white", paddingLeft: "5px" }}>
                    <button onClick={handleLogout} style={{ margin: "10px", border: "1px solid white", padding: "5px 10px", cursor: "pointer" }}>Logout</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                    <h2>Connect with these users</h2>
                    {users.map((u) => (
                        <div key={u.uid} className="chat-user-div" onClick={() => setSelectedUser(u)} style={{ width: "70%", padding: "5px", border: "1px solid white", borderRadius: "10px", cursor: "pointer", margin: "5px 0" }}>
                            {u.name || <u className="email"></u>}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default HomeLoggedIn