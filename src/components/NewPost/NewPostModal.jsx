import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import "./NewPostModal.css";

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
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h2>Create a Post</h2>
                    <button className="close-btn" onClick={onClose}>
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
                    />
                    <div className="form-footer">
                        <span
                            className={`char-counter ${isOverLimit ? "limit-exceeded" : ""}`}
                        >
                            {charsLeft}
                        </span>
                        <button
                            type="submit"
                            className="submit-post-btn"
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
