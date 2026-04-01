import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { database, auth } from "../../firebase";
import { get, ref, push, onValue } from "firebase/database";
import { languagesList } from "../../constants/languages";
import { MessageCircleMore, Brain } from 'lucide-react';

function ChatsPage() {
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
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [groupMessages]);

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

    return (
        <div className="flex flex-col h-full w-full md:flex-row overflow-hidden bg-[#0d1117] text-[#c9d1d9]">
            <div className="flex h-auto w-full flex-col border-b border-[#30363d] bg-[#161b22] md:h-full md:w-[280px] md:border-b-0 md:border-r">
                <div className="p-6">
                    <h3 className="mb-6 text-2xl font-bold text-white flex items-center gap-2">
                        <span className="text-[#58a6ff]">#</span> Channels
                    </h3>
                    <div className="flex flex-row gap-2 overflow-x-auto pb-4 md:flex-col md:overflow-x-visible md:pb-0 scrollbar-none">
                        {users.length === 0 ? (
                            <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] text-center">
                                <p className="text-sm text-gray-500">No channels joined yet.</p>
                                <Link to="/profile" className="mt-2 inline-block text-xs font-bold text-[#58a6ff] hover:underline">
                                    Update Profile →
                                </Link>
                            </div>
                        ) : (
                            users.map((lang, i) => (
                                <button
                                    key={i}
                                    className={`cursor-pointer group flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${selectedGroup === lang
                                        ? "bg-[#238636] text-white shadow-lg shadow-[#238636]/20"
                                        : "text-[#8b949e] hover:bg-[#21262d] hover:text-white"
                                        }`}
                                    onClick={() => setSelectedGroup(lang)}
                                >
                                    <span className={`h-2 w-2 rounded-full transition-colors ${selectedGroup === lang ? "bg-white" : "bg-[#30363d] group-hover:bg-[#58a6ff]"}`}></span>
                                    {lang}
                                </button>
                            ))
                        )}
                    </div>
                </div>
                <div className="mt-auto hidden md:block p-6">
                    <div className="rounded-2xl bg-linear-to-br from-[#1f6feb] to-[#111] p-0.5">
                        <div className="flex flex-col items-center rounded-[14px] bg-[#161b22] p-4 text-center">
                            <div className="flex items-center gap-1">
                                <Brain className="h-4" />
                                <p className="text-xs font-bold text-gray-400">Pro Tip</p>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">Chat in your target language to learn faster!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
                {!selectedGroup ? (
                    <div className="flex flex-1 flex-col items-center justify-center p-12 text-center bg-[#0d1117]">
                        {/* <div className="mb-6 rounded-3xl bg-[#161b22] p-8 border border-[#30363d] animate-pulse">
                            <img
                                src="/chat-arrow.png"
                                alt="arrow"
                                className="h-[80px] opacity-20 grayscale"
                            />
                        </div> */}
                        <img src="/favicon-img.png" />
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Huddle</h2>
                        <p className="text-gray-500 max-w-sm">Select a language channel from the sidebar to start connecting with others.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22]/50 px-6 py-4 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#238636] text-xl font-bold text-white">
                                    {selectedGroup[0]}
                                </div>
                                <div className="text-start">
                                    <h3 className="text-lg font-bold text-white uppercase"># {selectedGroup}</h3>
                                    <p className="text-xs text-[#8b949e]">Public Language Channel</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#30363d]">
                            {groupMessages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                                    <MessageCircleMore className="text-4xl mb-4" />
                                    <p className="text-lg font-medium">This is the start of #{selectedGroup}</p>
                                    <p className="text-sm">Be the first to say hello!</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {groupMessages.map((msg, index) => {
                                        const isMe = msg.sender === auth.currentUser.displayName;
                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-end gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                                            >
                                                {!isMe && (
                                                    <div className="h-8 w-8 shrink-0 rounded-lg bg-[#30363d] flex items-center justify-center text-[10px] font-bold text-white">
                                                        {msg.sender[0]}
                                                    </div>
                                                )}
                                                <div className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
                                                    <div className="flex items-center gap-2 mb-1 px-1">
                                                        <span className="text-[10px] font-bold text-gray-400 capitalize">{msg.sender}</span>
                                                        <span className="text-[9px] text-gray-500">
                                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${isMe
                                                            ? "bg-[#238636] text-white rounded-br-none"
                                                            : "bg-[#21262d] text-[#c9d1d9] rounded-bl-none border border-[#30363d]"
                                                            }`}
                                                    >
                                                        {msg.text}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        <div className="border-t border-[#30363d] bg-[#0d1117] p-6">
                            <form onSubmit={sendGroupMessage} className="relative mx-auto max-w-4xl">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder={`Message #${selectedGroup}`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full rounded-2xl border border-[#30363d] bg-[#161b22] py-4 pl-6 pr-16 text-sm text-white outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all shadow-xl"
                                />
                                <button
                                    type="submit"
                                    disabled={!message.trim()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#238636] text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                </button>
                            </form>
                            <p className="mt-2 text-center text-[10px] text-gray-500">
                                Press <span className="rounded border border-[#30363d] bg-[#161b22] px-1 font-mono">Enter</span> to send
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ChatsPage;
