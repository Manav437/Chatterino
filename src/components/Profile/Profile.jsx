import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { auth, database } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { languagesList } from "../../constants/languages";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [bio, setBio] = useState("");

    const [speaks, setSpeaks] = useState([]);
    const [learning, setLearning] = useState([]);

    const [displayName, setDisplayName] = useState("");
    const [displayPhoto, setDisplayPhoto] = useState("");
    const [displayBio, setDisplayBio] = useState("");
    const [displaySpeaks, setDisplaySpeaks] = useState([]);
    const [displayLearning, setDisplayLearning] = useState([]);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
            setDisplayName(currentUser.displayName || "");
            setDisplayPhoto(currentUser.photoURL || "");
            loadUserProfile(currentUser.uid);
        }
    }, []);

    const loadUserProfile = async (uid) => {
        const userRef = ref(database, `users/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            setDisplayBio(data.bio || "");
            setDisplaySpeaks(data.speaks || []);
            setDisplayLearning(data.learning || []);
        }
    };

    const updateUserProfile = async () => {
        try {
            const currentUser = auth.currentUser;
            const updatedName = name.trim() || currentUser.displayName;
            const updatedPhoto = photo.trim() || currentUser.photoURL;
            const updatedBio = bio.trim() || displayBio;

            await updateProfile(currentUser, {
                displayName: updatedName,
                photoURL: updatedPhoto,
            });

            const userRef = ref(database, `users/${auth.currentUser.uid}`);
            const updatedData = {
                name: updatedName,
                bio: updatedBio,
                photoURL: updatedPhoto,
            };

            if (speaks.length > 0) updatedData.speaks = speaks;
            if (learning.length > 0) updatedData.learning = learning;

            await update(userRef, updatedData);

            setDisplayName(updatedName);
            setDisplayPhoto(updatedPhoto);
            setDisplayBio(updatedBio);
            if (speaks.length > 0) setDisplaySpeaks(speaks);
            if (learning.length > 0) setDisplayLearning(learning);

            triggerToast("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error.message);
            triggerToast("Failed to update profile.");
        }
        setName("");
        setPhoto("");
        setBio("");
    };

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleMultiSelect = (setter) => (e) => {
        const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
        setter(values);
    };

    return (
        <div className="relative flex h-full w-full flex-col items-center overflow-y-auto bg-[#0d1117] px-4 py-4 md:p-4">
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] animate-pulse rounded-full bg-blue-900/20 blur-[120px]"></div>
                <div className="absolute -right-[10%] bottom-[10%] h-[40%] w-[40%] animate-pulse rounded-full bg-purple-900/10 blur-[100px] [animation-delay:2s]"></div>
                <div className="absolute left-[20%] top-[40%] h-[30%] w-[30%] animate-pulse rounded-full bg-emerald-900/10 blur-[80px] [animation-delay:4s]"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl">
                <div className="flex gap-4 items-center justify-center md:justify-normal md:items-end mb-6 text-center">
                    <h1 className="font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                        PROFILE
                    </h1>
                    <p className="mt-2 text-gray-400 tracking-wide brightness-125 hidden md:block">
                        Manage your profile and language preferences
                    </p>
                </div>

                {user ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-[400px_1fr] lg:gap-12">
                        <div
                            className="flex flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#161b22]/40 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-blue-500/5 group"
                        >
                            <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    Public Profile
                                </h2>
                                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold text-blue-400 uppercase tracking-widest border border-blue-500/20">Active</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="relative mb-8 group-hover:scale-102 transition-transform duration-500">
                                    <div className="absolute inset-0 animate-pulse rounded-3xl bg-blue-500/20 blur-2xl"></div>
                                    <img
                                        src={displayPhoto || "/noimg-icon.png"}
                                        alt="Profile"
                                        className="relative h-40 w-40 rounded-3xl border-2 border-white/10 object-cover p-1 shadow-2xl grayscale-50 group-hover:grayscale-0 transition-all"
                                    />
                                </div>

                                <div className="w-full space-y-4">
                                    <div className="flex flex-col rounded-2xl bg-white/5 p-2 border border-white/5">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Email Address</span>
                                        <span className="text-sm font-medium text-gray-300 truncate">{user.email}</span>
                                    </div>
                                    <div className="flex flex-col rounded-2xl bg-white/5 p-2 border border-white/5">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Display Name</span>
                                        <span className="text-base font-bold text-white">{displayName}</span>
                                    </div>
                                    <div className="flex flex-col rounded-2xl bg-white/5 p-2 border border-white/5">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">About Me</span>
                                        <span className="text-sm leading-relaxed text-gray-300 italic">"{displayBio || "I'm still writing my story..."}"</span>
                                    </div>
                                </div>

                                <div className="mt-8 w-full space-y-6 pt-4">
                                    <div className="space-y-4">
                                        <div className="p-1">
                                            <h3 className="mb-2 flex items-center gap-2 text-xs font-black text-white uppercase tracking-[0.2em] opacity-50">
                                                <span>🗣️</span> Fluent In
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {displaySpeaks.length > 0 ? displaySpeaks.map((lang) => (
                                                    <span
                                                        key={lang}
                                                        className="rounded-xl bg-[#238636]/20 border border-[#238636]/30 px-4 py-1.5 text-xs font-bold text-[#4cd964] shadow-sm shadow-[#238636]/10"
                                                    >
                                                        {lang}
                                                    </span>
                                                )) : <span className="text-xs text-gray-600 italic">No languages specified</span>}
                                            </div>
                                        </div>

                                        <div className="p-1">
                                            <h3 className="mb-2 flex items-center gap-2 text-xs font-black text-white uppercase tracking-[0.2em] opacity-50">
                                                <span>📚</span> Currently Learning
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {displayLearning.length > 0 ? displayLearning.map((lang) => (
                                                    <span
                                                        key={lang}
                                                        className="rounded-xl bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-xs font-bold text-blue-400 shadow-sm shadow-blue-500/10"
                                                    >
                                                        {lang}
                                                    </span>
                                                )) : <span className="text-xs text-gray-600 italic">Start your journey!</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex flex-col rounded-[32px] border border-white/10 bg-[#0d1117] p-8 md:p-10 shadow-2xl shadow-black/50 transition-all duration-300 hover:border-white/20"
                        >
                            <div className="mb-10 flex items-center justify-between border-b border-white/5 pb-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    Account Settings
                                </h2>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Update your details</p>
                            </div>

                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder={displayName || "Your Name"}
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none ring-blue-500/20 transition-all focus:border-blue-500/50 focus:ring-4"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Profile Photo URL</label>
                                        <input
                                            type="text"
                                            value={photo}
                                            onChange={(e) => setPhoto(e.target.value)}
                                            placeholder="https://..."
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none ring-blue-500/20 transition-all focus:border-blue-500/50 focus:ring-4"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Your Story (Bio)</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder={displayBio || "Tell us about yourself..."}
                                        rows="3"
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none ring-blue-500/20 transition-all focus:border-blue-500/50 focus:ring-4 resize-none"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Fluency</label>
                                            <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">Multi-select</span>
                                        </div>
                                        <select
                                            multiple
                                            value={speaks}
                                            onChange={handleMultiSelect(setSpeaks)}
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none scrollbar-none h-[180px] focus:border-blue-500/50 overflow-y-auto"
                                        >
                                            {languagesList.map((lang) => (
                                                <option key={lang} value={lang} className="p-3 my-1 rounded-xl cursor-pointer hover:bg-blue-500 transition-colors checked:bg-blue-600/50 border border-transparent checked:border-blue-400">
                                                    {lang}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Goals</label>
                                            <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded">Learning</span>
                                        </div>
                                        <select
                                            multiple
                                            value={learning}
                                            onChange={handleMultiSelect(setLearning)}
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none scrollbar-none h-[180px] focus:border-blue-500/50 overflow-y-auto"
                                        >
                                            {languagesList.map((lang) => (
                                                <option key={lang} value={lang} className="p-3 my-1 rounded-xl cursor-pointer hover:bg-purple-500 transition-colors checked:bg-purple-600/50 border border-transparent checked:border-purple-400">
                                                    {lang}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={updateUserProfile}
                                        className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 py-5 font-black text-white shadow-xl shadow-blue-900/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Update Profile
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </span>
                                        <div className="absolute inset-0 z-0 bg-linear-to-r from-blue-400 to-indigo-400 opacity-0 transition-opacity group-hover:opacity-20"></div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-[40px] border border-white/10 bg-[#161b22]/40 p-24 text-center backdrop-blur-3xl shadow-2xl">
                        <div className="mb-8 rounded-3xl bg-white/5 p-8 border border-white/10">
                            <span className="text-6xl">🔒</span>
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4">Identity Unverified</h2>
                        <p className="mb-10 text-gray-400 max-w-sm">Please log in to your account to view and manage your secure profile settings.</p>
                        <Link
                            to="/login"
                            className="rounded-2xl bg-white px-12 py-4 text-sm font-black text-black shadow-xl shadow-white/10 transition-all hover:scale-105 active:scale-95"
                        >
                            Login Securely
                        </Link>
                    </div>
                )}
            </div>

            <div
                className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-100 flex items-center gap-3 rounded-2xl bg-[#161b22] border border-blue-500/30 px-6 py-4 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 ${showToast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}
            >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-sm font-bold tracking-wide">{toastMessage}</span>
            </div>
        </div>
    );
};

export default ProfilePage;
