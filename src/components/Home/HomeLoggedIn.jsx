import { useMemo, useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref, update, onValue, remove } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import NewPostModal from "../NewPost/NewPostModal";
import "./Home.css";

function HomeLoggedIn() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const usersRef = ref(database, "users");
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            const userList = Object.entries(data || {}).map(([uid, info]) => ({
                uid,
                ...info,
            }));
            setUsers(userList);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const postsRef = ref(database, "posts");
        const unsubscribe = onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const postList = Object.entries(data).map(([postId, info]) => ({
                    postId,
                    ...info,
                }));
                postList.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(postList);
            } else {
                setPosts([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const usersMap = useMemo(() => {
        return users.reduce((acc, user) => {
            acc[user.uid] = user;
            return acc;
        }, {});
    }, [users]);

    const handleNewPost = () => {
        setShowPostModal(true);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/"); // Navigate after successful sign out
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const triggerAlert = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    const handleAddLike = (postId, likes = {}) => {
        const userId = auth.currentUser.uid;
        const isLiked = likes[userId];
        if (isLiked) {
            remove(ref(database, `posts/${postId}/likes/${userId}`));
        } else {
            update(ref(database, `posts/${postId}/likes`), { [userId]: true });
        }
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="section-two">
                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        width: "100%",
                        borderBottom: "2px solid #333",
                        background: "rgba(26, 26, 26, 0.8)",
                        lineHeight: "2rem",
                        fontSize: "20px",
                        padding: "10px 0",
                    }}
                >
                    <h5 style={{ fontSize: "1.7rem", margin: "0" }}>HOME</h5>
                </div>
                <div className="post-feed">
                    {posts.map((post) => {
                        const postUser = usersMap[post.userId];

                        return (
                            <div key={post.postId} className="post-card">
                                <div className="post-header">
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "20px",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <img
                                            src={
                                                postUser?.photoURL ||
                                                "./user-icon.png"
                                            }
                                            alt="user"
                                            className="post-avatar"
                                        />
                                        <div className="post-user-info">
                                            <p className="post-username">
                                                {postUser?.name || post.userId}
                                            </p>
                                            <p className="post-time">
                                                {(() => {
                                                    const date = new Date(
                                                        post.createdAt,
                                                    );
                                                    const time =
                                                        date.toLocaleTimeString(
                                                            "en-IN",
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            },
                                                        );
                                                    const day = String(
                                                        date.getDate(),
                                                    ).padStart(2, "0");
                                                    const month = String(
                                                        date.getMonth() + 1,
                                                    ).padStart(2, "0");
                                                    const year =
                                                        date.getFullYear();

                                                    const formattedDate = `${day}/${month}/${year}`;
                                                    return `${time}, ${formattedDate}`;
                                                })()}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            margin: "auto 0 auto auto",
                                            display: "flex",
                                            gap: "10px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "10px 0",
                                        }}
                                    >
                                        <button
                                            className="like-btn"
                                            onClick={() =>
                                                handleAddLike(
                                                    post.postId,
                                                    post.likes,
                                                )
                                            }
                                        >
                                            {post.likes &&
                                            post.likes[auth.currentUser.uid]
                                                ? "👎🏻 Dislike"
                                                : "👍🏻 Like"}
                                        </button>

                                        <p
                                            style={{
                                                fontSize: "1.1rem",
                                                width: "25px",
                                                borderRadius: "50%",
                                                background: "#2C2C2C",
                                            }}
                                        >
                                            {post.likes
                                                ? Object.values(
                                                      post.likes,
                                                  ).filter((v) => v === true)
                                                      .length
                                                : 0}
                                        </p>
                                    </div>
                                </div>
                                <div className="post-body">
                                    <p>{post.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="section-three">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "20px auto",
                        padding: ".5rem 1rem",
                        gap: "20px",
                    }}
                >
                    <button
                        className="home-addpost-btn"
                        onClick={handleNewPost}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid white",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            style={{ height: "15px", marginRight: "5px" }}
                            src="/add-logo.png"
                            alt=""
                        />
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
                            cursor: "pointer",
                        }}
                    >
                        <img
                            style={{ height: "15px", marginRight: "5px" }}
                            src="/logout-icon.png"
                            alt=""
                        />
                        Logout
                    </button>
                </div>

                <div
                    style={{
                        margin: "0 auto",
                        width: "90%",
                        borderTop: "1px solid #333",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "20px",
                    }}
                >
                    <h2>Connect with users</h2>
                    {users.map((u) => (
                        <div
                            key={u.uid}
                            className="chat-user-div"
                            onClick={triggerAlert}
                            style={{
                                width: "80%",
                                padding: "5px",
                                border: ".5px solid #333",
                                borderRadius: "10px",
                                cursor: "pointer",
                                margin: "5px 0",
                            }}
                        >
                            {u.name || <u className="email"></u>}
                        </div>
                    ))}

                    <div className={`custom-alert ${showAlert ? "show" : ""}`}>
                        Friend request sent! ✉️
                    </div>
                </div>
            </div>
            {showPostModal && (
                <NewPostModal onClose={() => setShowPostModal(false)} />
            )}
        </div>
    );
}

export default HomeLoggedIn;
