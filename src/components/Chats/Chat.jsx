import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { database, auth } from '../../firebase';
import { get, ref, push, onValue } from 'firebase/database';
import keyboardLayouts from "../../constants/keyboardLayout"
import "./Chats.css";

const languagesList = ["English", "Hindi", "Japanese", "French", "Korean", "Spanish", "German"];


function ChatsPage() {
    const [keyboardLayout, setKeyboardLayout] = useState(keyboardLayouts.english);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [users, setUsers] = useState([]);
    const [groupMessages, setGroupMessages] = useState([]);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const currentPath = location.pathname;
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const currentUserRef = ref(database, `users/${auth.currentUser?.uid}`);
        get(currentUserRef).then(snapshot => {
            const userData = snapshot.val();
            if (!userData) return;

            const userLanguages = [
                ...(userData.speaks || []),
                ...(userData.learning || [])
            ];

            const userGroups = languagesList.filter(lang => userLanguages.includes(lang));
            setUsers(userGroups);
        });
    }, []);

    useEffect(() => {
        if (!selectedGroup) return;

        const groupRef = ref(database, `groupMessages/${selectedGroup}`);
        const unsubscribe = onValue(groupRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const sorted = Object.values(data).sort((a, b) => a.timestamp - b.timestamp);
                setGroupMessages(sorted);
            } else {
                setGroupMessages([]);
            }
        });

        return () => unsubscribe();
    }, [selectedGroup]);

    useEffect(() => {
        if (selectedGroup) {
            const layout = keyboardLayouts[selectedGroup.toLowerCase()] || keyboardLayouts.english;
            setKeyboardLayout(layout);
        }
    }, [selectedGroup]);


    const sendGroupMessage = async (e) => {
        e.preventDefault();
        if (!selectedGroup || message.trim() === '') return;

        const groupRef = ref(database, `groupMessages/${selectedGroup}`);
        await push(groupRef, {
            text: message,
            sender: auth.currentUser?.displayName || auth.currentUser?.email || "Anonymous",
            timestamp: Date.now()
        });

        setMessage('');
    };

    const handleKeyboardKeyPress = (button) => {
        if (button === "{bksp}") {
            setMessage((prev) => prev.slice(0, -1));
        } else if (button === "{space}") {
            setMessage((prev) => prev + " ");
        } else if (button === "{enter}") {
            // Do something on enter
        } else {
            setMessage((prev) => prev + button);
        }

        setTimeout(() => inputRef.current?.focus(), 0);
    };

    return (
        <div style={{ display: "flex", width: "95vw", height: "100vh" }}>
            <div className="navbar">
                <div className="home-logo" style={{ paddingBottom: "30px", borderBottom: "1px solid white" }}>
                    <img style={{ height: "64px", width: "64px" }} src="/mogul-moves-3.svg" alt="" />
                    <p style={{ marginTop: "10px", marginBottom: "0" }}>Chatterino</p>
                </div>
                <div className="nav-items" style={{ width: "100%" }}>
                    <div className="nav-item">
                        <img style={{ height: "25px" }} src="/home-icon.png" alt="" />
                        <Link style={{ fontWeight: "bold", minWidth: "70%", fontSize: "1.2rem" }} to="/" className={`${currentPath === "/" ? "active" : ""} nav-links`}>Home</Link>
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
            </div>

            <div style={{ borderRadius: "10px 0 0 10px ", display: "flex", flexDirection: "column", margin: "auto", width: "15%", height: "95vh", padding: "10px", borderRight: "1px solid white" }}>
                <h3 style={{ padding: "5px", margin: "0", marginBottom: "5px", borderRadius: "10px", background: "black" }}>Available Language Chatrooms:</h3>
                <hr style={{ width: "100%", background: "white", }} />
                {users.length === 0 ? (
                    <p>No chatrooms yet. Update your profile!</p>
                ) : (
                    users.map((lang, i) => (
                        <div key={i} className="chat-user-div" onClick={() => setSelectedGroup(lang)} style={{ border: selectedGroup === lang ? "2px solid #FFFECE" : "1px solid white", background: selectedGroup === lang ? "#8AB2A6" : "black", color: selectedGroup === lang ? "#18230F" : "white", padding: "5px", borderRadius: "10px", cursor: "pointer", margin: "5px 0" }}>
                            #{lang}
                        </div>
                    ))
                )}
                <div className="chat-doodle" style={{ height: "100%", width: "100%" }}>

                </div>
            </div>

            <div style={{ gap: "5px", borderRadius: "7px", margin: "auto", height: "98vh", marginLeft: "10px", width: "60%", display: "flex", flexDirection: "column", }}>
                {selectedGroup && (
                    <div style={{ borderRadius: "7px", fontWeight: "bold", fontSize: "20px", padding: "10px 20px", borderBottom: "2px solid #ccc", backgroundColor: "black" }}>
                        Chatting in : <strong style={{ fontStyle: "italic", textDecoration: "underline", textUnderlineOffset: "2px" }}>#{selectedGroup}</strong>
                    </div>
                )}
                <div style={{ borderRadius: "7px", background: "black", flex: 1, padding: "20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    {!selectedGroup ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "100%", background: "black", borderRadius: "20px", flex: 1 }}>
                            <img style={{ height: "50px" }} src="/chat-arrow.png" alt="" />
                            <h1>Please select a chatroom :)</h1>
                        </div> // Just renders empty space
                    ) : (
                        <>
                            <div style={{ background: "#2C2C2C", flex: 1, overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "4px", marginBottom: "10px" }}>
                                {groupMessages.length === 0 ? (
                                    <p>No messages yet. Be the first to say something!</p>
                                ) : (
                                    groupMessages.map((msg, index) => (
                                        <div key={index} style={{
                                            color: "black",
                                            marginBottom: "8px",
                                            backgroundColor: msg.sender === auth.currentUser.displayName ? "#F7CFD8" : "#A6D6D6",
                                            padding: "5px",
                                            borderRadius: "5px"
                                        }}>
                                            ({new Date(msg.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}) <strong>{msg.sender}</strong>: {msg.text}
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            <form onSubmit={sendGroupMessage} style={{ background: "black", display: "flex", gap: "10px" }}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    style={{ background: "#2c2c2c", color: "white", flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                                />
                                <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
                                    Send
                                </button>
                            </form>
                            <div>
                                <Keyboard theme={"hg-theme-default dark-keyboard"} layout={keyboardLayouts[selectedGroup.toLowerCase()] || keyboardLayouts.english} onKeyPress={handleKeyboardKeyPress} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
}

export default ChatsPage;
