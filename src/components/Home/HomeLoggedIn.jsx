import { useMemo, useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref, update, onValue, remove } from "firebase/database";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import NewPostModal from "../NewPost/NewPostModal";
import { useAuth } from "../../context/AuthContext";
import PostCard from "./subcomponents/PostCard";

function HomeLoggedIn() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);

    const { currentUser, auth } = useAuth();
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
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const triggerAlert = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    const handleAddLike = (postId, likes = {}) => {
        const userId = currentUser.uid;
        const isLiked = likes[userId];
        if (isLiked) {
            remove(ref(database, `posts/${postId}/likes/${userId}`));
        } else {
            update(ref(database, `posts/${postId}/likes`), { [userId]: true });
        }
    };

    return (
        <div className="relative flex h-full w-full overflow-hidden bg-[#0d1117]">
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] animate-pulse rounded-full bg-blue-900/20 blur-[120px]"></div>
                <div className="absolute -right-[10%] bottom-[10%] h-[40%] w-[40%] animate-pulse rounded-full bg-purple-900/10 blur-[100px] [animation-delay:2s]"></div>
                <div className="absolute left-[20%] top-[40%] h-[30%] w-[30%] animate-pulse rounded-full bg-emerald-900/10 blur-[80px] [animation-delay:4s]"></div>
            </div>

            <div className="relative z-10 grid h-full w-full grid-cols-1 md:grid-cols-[1fr_350px]">
                <div className="relative flex h-full flex-col overflow-hidden border-r border-white/5 bg-[#161b22]/20 backdrop-blur-sm">
                    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-[#0d1117]/80 px-8 py-5 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight text-white">
                                Feed
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-[10px] font-black uppercase tracking-widest text-red-500 transition-all hover:bg-red-500/20 md:hidden"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 scrollbar-none">
                        <div className="mx-auto flex flex-col gap-6">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostCard
                                        key={post.postId}
                                        post={post}
                                        postUser={usersMap[post.userId]}
                                        currentUserId={currentUser?.uid}
                                        onLike={handleAddLike}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-[32px] border border-white/5 bg-white/5 p-20 text-center backdrop-blur-md">
                                    <span className="text-4xl mb-4 opacity-50">📭</span>
                                    <p className="text-sm font-bold text-gray-400">No posts yet. Be the first to share something!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="hidden h-full flex-col border-l border-white/5 bg-[#0d1117]/40 backdrop-blur-2xl md:flex">
                    <div className="p-8 border-b border-white/5">
                        <div className="mb-8 flex items-start gap-4">
                            <img
                                src={currentUser?.photoURL || "/noimg-icon.png"}
                                className="h-15 w-15 rounded-2xl p-0.5 ring-1 ring-white shadow-lg object-cover"
                                alt="Me"
                            />
                            <div className="flex items-start flex-col">
                                <span className="text-sm font-black text-white">{currentUser?.displayName || "User"}</span>
                                <span className="text-[11px] text-start text-gray-500 tracking-widest">professional moron / gifted amateur</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                className="cursor-pointer group relative flex items-center justify-center gap-2 overflow-hidden rounded-[50px] [corner-shape:squircle] bg-sky-500 hover:bg-sky-500/90 py-3.5 text-xs font-bold text-black shadow-lg shadow-white/5 transition-all active:scale-[0.98]"
                                onClick={handleNewPost}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                                    New Post
                                </span>
                                <div className="absolute inset-0 z-0 bg-black opacity-0 transition-opacity group-hover:opacity-5"></div>
                            </button>

                            <button
                                className="cursor-pointer flex items-center justify-center gap-2 rounded-[50px] [corner-shape:squircle] border border-red-500/20 bg-red-500/10 py-3.5 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300"
                                onClick={handleLogout}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 scrollbar-none">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Suggested</h2>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        </div>

                        <div className="flex flex-col gap-3">
                            {users.filter(u => u.uid !== currentUser?.uid).slice(0, 8).map((u) => (
                                <div
                                    key={u.uid}
                                    className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 transition-all hover:border-white/10 hover:bg-white/10"
                                    onClick={triggerAlert}
                                >
                                    <img
                                        src={u.photoURL || "/noimg-icon.png"}
                                        className="h-11 w-11 rounded-xl ring-1 ring-white/90 p-0.5 object-cover grayscale-30 group-hover:grayscale-0 transition-all"
                                        alt={u.name}
                                    />
                                    <div className="flex flex-col items-start overflow-hidden">
                                        <span className="truncate text-[12px] font-bold text-gray-300 group-hover:text-white transition-colors">{u.name || "Anonymous"}</span>
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">View Profile</span>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className={`fixed bottom-10 -right-12 z-100 -translate-x-1/2 flex items-center gap-3 rounded-[50px] [corner-shape:squircle] border border-white/30 bg-[#161b22] px-4 py-2.5 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 ${showAlert ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-sm font-bold tracking-wide">Friend request sent!</span>
                </div>
            </div>

            <button
                className="group fixed bottom-24 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-[24px] bg-white text-black shadow-2xl shadow-white/10 transition-all hover:scale-105 active:scale-95 md:hidden"
                onClick={handleNewPost}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            </button>

            {showPostModal && (
                <NewPostModal onClose={() => setShowPostModal(false)} />
            )}
        </div>
    );
}

export default HomeLoggedIn;
