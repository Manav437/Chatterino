import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { database, auth } from "../../firebase";
import { get, ref, push, onValue } from "firebase/database";
import keyboardLayouts from "../../constants/keyboardLayout";
import { Navbar } from "../Navbar/Navbar";
import "./Chats.css";

const languagesList = [
    "English",
    "Hindi",
    "Japanese",
    "French",
    "Korean",
    "Spanish",
    "German",
];

function ChatsPage() {
    const [keyboardLayout, setKeyboardLayout] = useState(
        keyboardLayouts.english,
    );
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [users, setUsers] = useState([]);
    const [groupMessages, setGroupMessages] = useState([]);
    const [message, setMessage] = useState("");

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const currentUserRef = ref(database, `users/${auth.currentUser?.uid}`);
        get(currentUserRef).then((snapshot) => {
            const userData = snapshot.val();
            if (!userData) return;

            const userLanguages = [
                ...(userData.speaks || []),
                ...(userData.learning || []),
            ];

            const userGroups = languagesList.filter((lang) =>
                userLanguages.includes(lang),
            );
            setUsers(userGroups);
        });
    }, []);

    useEffect(() => {
        if (!selectedGroup) return;

        const groupRef = ref(database, `groupMessages/${selectedGroup}`);
        const unsubscribe = onValue(groupRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const sorted = Object.values(data).sort(
                    (a, b) => a.timestamp - b.timestamp,
                );
                setGroupMessages(sorted);
            } else {
                setGroupMessages([]);
            }
        });

        return () => unsubscribe();
    }, [selectedGroup]);

    useEffect(() => {
        if (selectedGroup) {
            const layout =
                keyboardLayouts[selectedGroup.toLowerCase()] ||
                keyboardLayouts.english;
            setKeyboardLayout(layout);
        }
    }, [selectedGroup]);

    const sendGroupMessage = async (e) => {
        e.preventDefault();
        if (!selectedGroup || message.trim() === "") return;

        const groupRef = ref(database, `groupMessages/${selectedGroup}`);
        await push(groupRef, {
            text: message,
            sender:
                auth.currentUser?.displayName ||
                auth.currentUser?.email ||
                "Anonymous",
            timestamp: Date.now(),
        });

        setMessage("");
    };

    const handleKeyboardKeyPress = (button) => {
        if (button === "{bksp}") {
            setMessage((prev) => prev.slice(0, -1));
        } else if (button === "{space}") {
            setMessage((prev) => prev + " ");
        } else if (button === "{enter}") {
            // handle enter
        } else {
            setMessage((prev) => prev + button);
        }

        setTimeout(() => inputRef.current?.focus(), 0);
    };

    return (
        <div className="chats-page-container">
            <Navbar />

            <div className="chat-sidebar">
                <h3>Available Language Chatrooms:</h3>
                <hr />
                {users.length === 0 ? (
                    <p>No chatrooms yet. Update your profile!</p>
                ) : (
                    users.map((lang, i) => (
                        <div
                            key={i}
                            className={`chat-user-div ${
                                selectedGroup === lang ? "active-chat" : ""
                            }`}
                            onClick={() => setSelectedGroup(lang)}
                        >
                            #{lang}
                        </div>
                    ))
                )}
                <div className="chat-doodle"></div>
            </div>

            <div className="chat-main">
                {selectedGroup && (
                    <div className="chat-header">
                        Chatting in: <strong>#{selectedGroup}</strong>
                    </div>
                )}

                <div className="chat-window">
                    {!selectedGroup ? (
                        <div className="no-chatroom">
                            <img src="/chat-arrow.png" alt="arrow" />
                            <h1>Please select a chatroom :)</h1>
                        </div>
                    ) : (
                        <>
                            <div className="messages-box">
                                {groupMessages.length === 0 ? (
                                    <p>
                                        No messages yet. Be the first to say
                                        something!
                                    </p>
                                ) : (
                                    groupMessages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`message ${
                                                msg.sender ===
                                                auth.currentUser.displayName
                                                    ? "my-message"
                                                    : "other-message"
                                            }`}
                                        >
                                            (
                                            {new Date(
                                                msg.timestamp,
                                            ).toLocaleTimeString("en-GB", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                            ) <strong>{msg.sender}</strong>:{" "}
                                            {msg.text}
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <form
                                onSubmit={sendGroupMessage}
                                className="chat-form"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button type="submit">Send</button>
                            </form>

                            <div className="keyboard-container">
                                <Keyboard
                                    theme={"hg-theme-default dark-keyboard"}
                                    layout={keyboardLayout}
                                    onKeyPress={handleKeyboardKeyPress}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatsPage;
