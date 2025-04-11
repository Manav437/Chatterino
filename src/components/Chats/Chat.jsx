import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { database, auth } from '../../firebase';
import { get, ref, push, onValue } from 'firebase/database';
import "./Chats.css";

const languagesList = ["English", "Hindi", "Japanese", "French", "Korean", "Spanish", "German"]

const keyboardLayouts = {
    English: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    Hindi: ["अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ", "क", "ख", "ग", "घ", "च", "छ", "ज", "झ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह"],
    Japanese: ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ"],
    French: "ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ".split(""),
    Korean: ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
    Spanish: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜ".split(""),
    German: "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß".split("")
};

function ChatsPage() {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [users, setUsers] = useState([]);
    const [groupMessages, setGroupMessages] = useState([]);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const currentPath = location.pathname;
    const messagesEndRef = useRef(null);

    const user = auth.currentUser;

    useEffect(() => {
        const currentUserRef = ref(database, `users/${auth.currentUser?.uid}`);
        get(currentUserRef).then(snapshot => {
            const userData = snapshot.val();
            if (!userData) return;

            const userLanguages = [
                ...(userData.speaks || []),
                ...(userData.learning || [])
            ];

            // Filter the chatrooms the user should see
            const userGroups = languagesList.filter(lang => userLanguages.includes(lang));
            setUsers(userGroups); // rename "users" to something like "availableGroups" if preferred
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



    const sendGroupMessage = async (e) => {
        e.preventDefault();
        if (!selectedGroup || message.trim() === '') return;

        const groupRef = ref(database, `groupMessages/${selectedGroup}`);
        await push(groupRef, {
            text: message,
            sender: auth.currentUser?.displayName,
            timestamp: Date.now()
        });

        setMessage('');
    };

    return (
        <div style={{ display: "flex", width: "95vw", height: "90vh" }}>
            {/* Sidebar Navigation */}
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
            <div style={{ width: "15%", paddingLeft: "10px", paddingRight: "10px", borderRight: "1px solid white" }}>
                <h3>Available Language Chatrooms:</h3>
                {users.map((lang, i) => (
                    <div key={i} className="chat-user-div" onClick={() => setSelectedGroup(lang)} style={{ padding: "5px", border: "1px solid white", borderRadius: "10px", cursor: "pointer", margin: "5px 0" }}>
                        #{lang}
                    </div>
                ))}

            </div>

            {/* Main Chat Section */}
            <div style={{ width: "80%", display: "flex", flexDirection: "column" }}>
                {selectedGroup && (
                    <div style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        padding: "10px 20px",
                        borderBottom: "1px solid #ccc",
                        backgroundColor: "black"
                    }}>
                        Chatting in: <strong>#{selectedGroup}</strong>
                    </div>
                )}
                {/* Chat Body */}
                <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <div style={{ flex: 1, overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "4px", marginBottom: "10px" }}>
                        {groupMessages.map((msg, index) => (
                            <div key={index} style={{ marginBottom: "8px" }}>
                                ({new Date(msg.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}) <strong>{msg.sender}</strong>: {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={sendGroupMessage} style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                        />
                        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
                            Send
                        </button>
                    </form>
                    {selectedGroup && keyboardLayouts[selectedGroup] && (
                        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {keyboardLayouts[selectedGroup].map((char, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setMessage(prev => prev + char)}
                                    style={{
                                        padding: "10px",
                                        fontSize: "16px",
                                        borderRadius: "5px",
                                        backgroundColor: "#333",
                                        color: "white",
                                        border: "1px solid white",
                                        cursor: "pointer"
                                    }}
                                >
                                    {char}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => setMessage(prev => prev.slice(0, -1))}
                                style={{
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    backgroundColor: "#d9534f",
                                    color: "white",
                                    border: "1px solid white",
                                    cursor: "pointer"
                                }}
                            >
                                ⌫
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div >
    );
}

export default ChatsPage;
