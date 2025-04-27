import "./Home.css"
import Feed from "../Feed/Feed"
import { database } from '../../firebase';
import { ref, update, onValue, remove } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NewPostModal from "../NewPost/NewPostModal";

// import UserList from "../UserList"
// import ShimmerUI from "../Shimmer/Shimmer";

function HomeLoggedIn() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const auth = getAuth();
    const [showPostModal, setShowPostModal] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();


    useEffect(() => {
        const usersRef = ref(database, 'users');
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            const userList = Object.entries(data || {}).map(([uid, info]) => ({ uid, ...info }));
            setUsers(userList);
        });
    }, []);

    useEffect(() => {
        const postsRef = ref(database, 'posts');
        onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const postList = Object.entries(data).map(([postId, info]) => ({
                    postId,
                    ...info
                }));
                // Optional: Sort newest first
                postList.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(postList);
            }
        });
    }, []);



    const handleNewPost = () => {
        setShowPostModal(true);
    }

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

    const triggerAlert = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000); // Hide after 3s
    };

    const handleAddLike = (postId, likes = {}) => {
        const userId = auth.currentUser.uid;
        const postLikesRef = ref(database, `posts/${postId}/likes/${userId}`);
        const isLiked = likes[userId];

        if (isLiked) {
            // Remove like
            remove(postLikesRef);
        } else {
            // Add like
            update(ref(database, `posts/${postId}/likes`), {
                [userId]: true
            });
        }

        // Update local state instantly
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.postId === postId
                    ? {
                        ...post,
                        likes: isLiked
                            ? Object.fromEntries(Object.entries(post.likes || {}).filter(([key]) => key !== userId))
                            : { ...post.likes, [userId]: true }
                    }
                    : post
            )
        );
    };

    // useEffect(() => {
    //     if (usersLoaded && postsLoaded) {
    //         setTimeout(() => {
    //             setLoading(false);
    //         }, 500); // your shimmer duration
    //     }
    // }, [usersLoaded, postsLoaded]);


    return (
        <div className="home-container">
            <div className="navbar">
                <div className="home-logo" style={{ paddingBottom: "30px", borderBottom: "1px solid white" }}>
                    <img style={{ height: "64px", width: "64px" }} src="/mogul-moves-3.svg" alt="" />
                    <p style={{ marginTop: "10px", marginBottom: "0" }}>Chatterino</p>
                </div>
                {/* <hr style={{ width: "80%" }} /> */}
                <div className="nav-items" style={{ width: "100%" }}>
                    <div className="nav-item">
                        <img style={{ height: "25px" }} src="/home-icon.png" alt="" />
                        <Link style={{ fontWeight: "bold", minWidth: "70%", fontSize: "1.2rem" }} to="/" className={`${currentPath === "/" ? "active" : ""} nav-links`}>Home</Link >
                    </div>
                    <div className="nav-item">
                        <img style={{ height: "25px" }} src="/chat-icon.png" alt="" />
                        <Link style={{ fontWeight: "bold", minWidth: "70%", fontSize: "1.2rem" }} to="/chats" className={`${currentPath === "/chats" ? "active" : ""} nav-links`}>Chat</Link>
                    </div>
                    <div className="nav-item">
                        <img style={{ height: "25px" }} src="/user-icon.png" alt="" />
                        <Link style={{ fontWeight: "bold", minWidth: "70%", fontSize: "1.2rem" }} to="/profile" className={`${currentPath === "/profile" ? "active" : ""} nav-links`}>Profile</Link>
                    </div>
                </div>
            </div >
            <div className="section-two">
                <div style={{ zIndex: "1000", height: "20px", position: "fixed", top: "0", width: "47.5%", borderBottom: "1px solid white", background: "rgba(26, 26, 26, 0.8)", lineHeight: "2rem", fontSize: "20px", paddingTop: "20px", paddingBottom: "20px" }}>
                    <h5 style={{ margin: "0" }}>HOME</h5>
                </div>
                <div className="post-feed" style={{ marginTop: "80px" }}>
                    {posts.map((post) => {
                        const postUser = users.find(u => u.uid === post.userId);
                        {/* console.log(postUser) */ }
                        return (
                            <div key={post.postId} className="post-card">
                                <div className="post-header">
                                    {/* {console.log(postUser.photoURL)} */}
                                    <img src={postUser?.photoURL || "./user-icon.png"} alt="user" className="post-avatar" />
                                    <div className="post-user-info">
                                        <p className="post-username">{postUser?.name || post.userId}</p>
                                        <p className="post-time">{new Date(post.createdAt).toLocaleString('en-IN', {
                                            year: "numeric",
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</p>
                                    </div>

                                    <div style={{
                                        margin: "auto 0 auto 50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0"
                                    }}>
                                        <button onClick={() => handleAddLike(post.postId, post.likes)} style={{
                                            fontSize: "17px",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                            background: "#2c2c2c",
                                            border: "1px solid white",
                                            borderRadius: "10px",
                                            color: "inherit"
                                        }}>
                                            {/* <img src="/like-img.png" alt="" /> */}
                                            {post.likes && post.likes[auth.currentUser.uid] ? "👎🏻 Dislike" : "👍🏻 Like"}
                                        </button>

                                        <p style={{ marginLeft: "10px", width: "25px", borderRadius: "50%", background: "#2C2C2C" }}>{post.likes ? Object.values(post.likes).filter(v => v === true).length : 0}</p>
                                    </div>
                                </div>
                                <div className="post-body">
                                    <p>{post.content}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className="section-three">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid white",
                    width: "80%",
                    margin: "20px auto",
                    paddingLeft: "5px",
                    marginBottom: "10px",
                    gap: "10px",
                    paddingBottom: "20px"
                }}>
                    <button
                        className="home-addpost-btn"
                        onClick={handleNewPost}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid white",
                            padding: "5px 10px",
                            cursor: "pointer"
                        }}
                    >
                        <img style={{ height: "15px", marginRight: "5px" }} src="/add-logo.png" alt="" />
                        New Post
                    </button>

                    <button
                        className="home-logout-btn bg-red-500"
                        onClick={handleLogout}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid white",
                            padding: "5px 10px",
                            cursor: "pointer"
                        }}
                    >
                        <img style={{ height: "15px", marginRight: "5px" }} src="/logout-icon.png" alt="" />
                        Logout
                    </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                    <h2>Connect with these users</h2>
                    {users.map((u) => (
                        <div key={u.uid} className="chat-user-div" onClick={triggerAlert} style={{ width: "70%", padding: "5px", border: "1px solid white", borderRadius: "10px", cursor: "pointer", margin: "5px 0" }}>
                            {u.name || <u className="email"></u>}
                        </div>
                    ))}

                    <div className={`custom-alert ${showAlert ? "show" : ""}`}>
                        Friend request sent! ✉️
                    </div>
                </div>
            </div>
            {showPostModal && <NewPostModal onClose={() => setShowPostModal(false)} />}

        </div >

    )
}

export default HomeLoggedIn