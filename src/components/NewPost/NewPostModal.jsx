import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";

const MAX_CHARS = 280;

const NewPostModal = ({ onClose }) => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const charsLeft = MAX_CHARS - content.length;
    const isOverLimit = charsLeft < 0;

    const db = getDatabase();
    const auth = getAuth();

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || !content.trim() || isOverLimit) return;

        setLoading(true);

        try {
            const newPostRef = push(ref(db, "posts"));
            await set(newPostRef, {
                userId: user.uid,
                content: content.trim(),
                createdAt: Date.now(),
                likes: {}, // Initialize likes object
            });
            setContent("");
            onClose();
        } catch (error) {
            console.error("Failed to create post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[1000] flex animate-[fadeIn_0.2s_ease-out] items-center justify-center bg-black/70"
            onClick={onClose}
        >
            <div
                className="relative w-[90%] max-w-[500px] animate-[scaleUp_0.2s_ease-out] rounded-lg border border-[#3e4042] bg-[#242526] p-4 text-[#e4e6eb]"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="mb-4 flex items-center justify-between border-b border-[#3e4042] pb-4">
                    <h2 className="m-0 text-xl">Create a Post</h2>
                    <button
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-none p-1 transition-colors duration-200 hover:bg-[#3a3b3c]"
                        onClick={onClose}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 6L6 18"
                                stroke="#b0b3b8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 6L18 18"
                                stroke="#b0b3b8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </header>
                <form onSubmit={handlePostSubmit} className="modal-form">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        autoFocus
                        className="mb-4 h-[120px] w-[95%] resize-none rounded-lg border border-[#3e4042] bg-[#18191a] p-3 font-inherit text-base leading-relaxed text-[#e4e6eb] outline-none focus:border-[#2d88ff]"
                    />
                    <div className="flex items-center justify-between">
                        <span
                            className={`text-[0.8rem] font-medium ${isOverLimit ? "text-[#e41e3f]" : "text-[#b0b3b8]"}`}
                        >
                            {charsLeft}
                        </span>
                        <button
                            type="submit"
                            className="cursor-pointer rounded-lg border-none bg-[#2d88ff] px-5 py-2.5 text-base font-semibold text-white transition-colors duration-200 hover:enabled:bg-[#1a73e8] disabled:cursor-not-allowed disabled:bg-[#3a3b3c] disabled:opacity-70"
                            disabled={loading || !content.trim() || isOverLimit}
                        >
                            {loading ? "Posting..." : "Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPostModal;
