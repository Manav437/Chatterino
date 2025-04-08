import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { database, auth } from '../../firebase';
import { ref, push, onValue } from 'firebase/database';
import "./Chats.css";

function ChatsPage() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [privateMessages, setPrivateMessages] = useState([]);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const currentPath = location.pathname;
    const messagesEndRef = useRef(null);

    const user = auth.currentUser;

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
        if (!selectedUser) return;
        const currentUID = auth.currentUser?.uid;
        const chatId = [currentUID, selectedUser.uid].sort().join('_');
        const messagesRef = ref(database, `privateMessages/${chatId}`);

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const sortedMsgs = Object.values(data).sort((a, b) => a.timestamp - b.timestamp);
                setPrivateMessages(sortedMsgs);
            } else {
                setPrivateMessages([]);
            }
        });

        return () => unsubscribe();
    }, [selectedUser]);


    const sendPrivateMessage = async (e) => {
        e.preventDefault();
        if (!selectedUser || message.trim() === '') return;

        const currentUID = auth.currentUser?.uid;
        const chatId = [currentUID, selectedUser.uid].sort().join('_');
        const messagesRef = ref(database, `privateMessages/${chatId}`);
        await push(messagesRef, {
            text: message,
            sender: auth.currentUser?.displayName,
            timestamp: Date.now()
        });

        setMessage('');
    };

    return (
        <div style={{ display: "flex", width: "90vw", height: "90vh" }}>
            {/* Sidebar Navigation */}
            <div className="navbar" style={{ width: "5%", padding: "10px", borderRight: "1px solid #ccc" }}>
                <div className="home-logo" style={{ textAlign: "center" }}>
                    <img style={{ height: "64px", width: "64px" }} src="/home-logo-img.png" alt="" />
                    <p style={{ marginTop: "10px", marginBottom: "0" }}>Chatterino</p>
                </div>
                <hr style={{ height: ".1px", width: "100%" }} />
                <div className="nav-items" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link className={`${currentPath === "/" ? "active" : ""} nav-links`} to="/">Home</Link>
                    <Link className={`${currentPath === "/chats" ? "active" : ""} nav-links`} to="/chats">Chat</Link>
                    <Link className={`${currentPath === "/profile" ? "active" : ""} nav-links`} to="/profile">Profile</Link>
                </div>
            </div >
            <div style={{ width: "15%", paddingLeft: "10px", paddingRight: "10px", borderRight: "1px solid white" }}>
                <h3>Select User to Chat:</h3>
                {users.map((u) => (
                    <div key={u.uid} className="chat-user-div" onClick={() => setSelectedUser(u)} style={{ padding: "5px", border: "1px solid white", borderRadius: "10px", cursor: "pointer", margin: "5px 0" }}>
                        {u.email || u.name}
                    </div>
                ))}
            </div>

            {/* Main Chat Section */}
            <div style={{ width: "80%", display: "flex", flexDirection: "column" }}>
                {selectedUser && (
                    <div style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        padding: "10px 20px",
                        borderBottom: "1px solid #ccc",
                        backgroundColor: "black"
                    }}>
                        Chatting with: <strong>{selectedUser.name || selectedUser.email}</strong>
                    </div>
                )}
                {/* Chat Body */}
                <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <div style={{ flex: 1, overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "4px", marginBottom: "10px" }}>
                        {privateMessages.map((msg, index) => (
                            <div key={index} style={{ marginBottom: "8px" }}>
                                ({new Date(msg.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}) <strong>{msg.sender}</strong>: {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Send Message Input */}
                    <form onSubmit={sendPrivateMessage} style={{ display: "flex", gap: "10px" }}>
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
                </div>
            </div>
        </div >
    );
}

export default ChatsPage;
