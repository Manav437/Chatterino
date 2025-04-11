// components/NewPostModal.js
import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import "./NewPostModal.css"

const NewPostModal = ({ onClose }) => {
    const [content, setContent] = useState("");
    const db = getDatabase();
    const auth = getAuth();

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || !content.trim()) return;

        const newPostRef = push(ref(db, "posts"));
        await set(newPostRef, {
            userId: user.uid,
            content: content.trim(),
            createdAt: Date.now(),
        });

        setContent("");
        onClose(); // Close modal after posting
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>Create a Post</h2>
                <form onSubmit={handlePostSubmit}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        rows="4"
                    />
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    );
};

export default NewPostModal;
