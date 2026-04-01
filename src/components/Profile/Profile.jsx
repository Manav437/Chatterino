import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { auth, database } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { languagesList } from "../../constants/languages";
import { User, Link as LinkIcon, Languages, BookOpen, Save, ShieldCheck } from "lucide-react";

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
            setSpeaks(data.speaks || []);
            setLearning(data.learning || []);
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
                speaks: speaks,
                learning: learning
            };

            await update(userRef, updatedData);

            setDisplayName(updatedName);
            setDisplayPhoto(updatedPhoto);
            setDisplayBio(updatedBio);
            setDisplaySpeaks(speaks);
            setDisplayLearning(learning);

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

    const toggleLanguage = (lang, setter, currentList) => {
        if (currentList.includes(lang)) {
            setter(currentList.filter(l => l !== lang));
        } else {
            setter([...currentList, lang]);
        }
    };

    return (
        <div className="relative flex h-full md:h-screen w-full flex-col overflow-y-auto md:overflow-hidden bg-[#0d1117] text-white">
            {/* <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] animate-pulse rounded-full bg-emerald-900/10 blur-[120px]"></div>
                <div className="absolute -right-[10%] bottom-[10%] h-[40%] w-[40%] animate-pulse rounded-full bg-blue-900/10 blur-[100px] [animation-delay:2s]"></div>
            </div> */}

            <div className="relative z-10 flex h-full w-full flex-col md:flex-row">
                {user ? (
                    <>
                        <div className="w-full md:w-[400px] lg:w-[450px] p-6 lg:p-6 flex flex-col h-auto md:h-full border-b md:border-b-0 md:border-r border-white/5 bg-[#161b22]/20 backdrop-blur-sm">
                            <div className="mb-10 flex items-center justify-between">
                                <h1 className="font-display text-4xl font-black tracking-tighter">PROFILE</h1>
                                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] border border-emerald-500/20">Active</span>
                            </div>

                            <div className="flex flex-col items-center flex-1 md:overflow-y-auto scrollbar-none">
                                <div className="relative mb-8 group">
                                    {/* <div className="absolute inset-0 bg-emerald-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div> */}
                                    <img
                                        src={displayPhoto || "/noimg-icon.png"}
                                        alt="Profile"
                                        className="relative h-48 w-48 rounded-[2.5rem] border-4 border-white/10 object-cover shadow-2xl transition-transform duration-300"
                                    />
                                </div>

                                <div className="space-y-6 w-full">
                                    <div className="text-center">
                                        <h2 className="font-display text-2xl font-bold text-white">{displayName}</h2>
                                        <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-widest">{user.email}</p>
                                    </div>

                                    <div className="rounded-3xl glass-card border border-white/5 p-6 space-y-6">
                                        <div>
                                            <span className="text-[10px] font-black text-emerald-400/60 uppercase tracking-[0.2em]">The Story</span>
                                            <p className="text-sm leading-relaxed text-gray-300 mt-2 font-medium italic">
                                                {displayBio || "Still writing the chapters of my journey..."}
                                            </p>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400/60 uppercase tracking-[0.2em]">
                                                    <Languages size={14} /> Speaks
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {displaySpeaks.length > 0 ? displaySpeaks.map((lang) => (
                                                        <span key={lang} className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1 text-xs font-bold text-emerald-400">{lang}</span>
                                                    )) : <span className="text-xs text-gray-600">No languages set</span>}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-blue-400/60 uppercase tracking-[0.2em]">
                                                    <BookOpen size={14} /> Learning
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {displayLearning.length > 0 ? displayLearning.map((lang) => (
                                                        <span key={lang} className="rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1 text-xs font-bold text-blue-400">{lang}</span>
                                                    )) : <span className="text-xs text-gray-600">Start learning today!</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 h-auto md:h-full md:overflow-y-auto p-6 lg:p-12 scrollbar-none bg-[#0d1117]">
                            <div className="mx-auto max-w-3xl space-y-12 pb-12">
                                <section className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px flex-1 bg-white/5"></div>
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Basic Details</h3>
                                        <div className="h-px flex-1 bg-white/5"></div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest px-2">
                                                <User size={14} className="text-emerald-500" /> Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder={displayName || "Your Name"}
                                                className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-sm font-bold text-white outline-none ring-emerald-500/20 transition-all focus:border-emerald-500/50 focus:ring-4"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest px-2">
                                                <LinkIcon size={14} className="text-emerald-500" /> Photo URL
                                            </label>
                                            <input
                                                type="text"
                                                value={photo}
                                                onChange={(e) => setPhoto(e.target.value)}
                                                placeholder="https://images.unsplash.com/..."
                                                className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-sm font-bold text-white outline-none ring-emerald-500/20 transition-all focus:border-emerald-500/50 focus:ring-4"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest px-2">
                                            <ShieldCheck size={14} className="text-emerald-500" /> Bio / Tagline
                                        </label>
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder={displayBio || "What's on your mind?"}
                                            rows="3"
                                            className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-sm font-bold text-white outline-none ring-emerald-500/20 transition-all focus:border-emerald-500/50 focus:ring-4 resize-none"
                                        ></textarea>
                                    </div>
                                </section>

                                <section className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px flex-1 bg-white/5"></div>
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Language Preferences</h3>
                                        <div className="h-px flex-1 bg-white/5"></div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between px-2">
                                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Fluent In</label>
                                                <span className="text-[10px] text-emerald-400 font-black bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Selection</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 rounded-3xl border border-white/5 bg-white/5 p-4 h-[200px] overflow-y-auto scrollbar-none content-start">
                                                {languagesList.map((lang) => (
                                                    <button
                                                        key={lang}
                                                        onClick={() => toggleLanguage(lang, setSpeaks, speaks)}
                                                        className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all duration-300 ${speaks.includes(lang)
                                                            ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/40 scale-105"
                                                            : "bg-white/5 text-gray-500 hover:bg-white/10 border border-white/5"
                                                            }`}
                                                    >
                                                        {lang}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between px-2">
                                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Goals</label>
                                                <span className="text-[10px] text-blue-400 font-black bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">Learning</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 rounded-3xl border border-white/5 bg-white/5 p-4 h-[200px] overflow-y-auto scrollbar-none content-start">
                                                {languagesList.map((lang) => (
                                                    <button
                                                        key={lang}
                                                        onClick={() => toggleLanguage(lang, setLearning, learning)}
                                                        className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all duration-300 ${learning.includes(lang)
                                                            ? "bg-blue-500 text-black shadow-lg shadow-blue-500/40 scale-105"
                                                            : "bg-white/5 text-gray-500 hover:bg-white/10 border border-white/5"
                                                            }`}
                                                    >
                                                        {lang}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={updateUserProfile}
                                        className="cursor-pointer group relative flex items-center justify-center overflow-hidden rounded-[50px] [corner-shape:squircle] bg-white py-5 font-black text-black shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                                    >
                                        <span className="relative z-10 flex items-center gap-3 tracking-tight text-lg">
                                            <Save size={20} />
                                            Update Profile
                                        </span>
                                        <div className="absolute inset-0 z-0 bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-10"></div>
                                    </button>
                                    {/* <p className="text-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Double check your information before saving.</p> */}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full w-full items-center justify-center p-6">
                        <div className="flex max-w-sm flex-col items-center justify-center rounded-[3rem] border border-white/10 bg-[#161b22]/40 p-16 text-center backdrop-blur-3xl shadow-2xl">
                            <div className="mb-8 rounded-[2rem] bg-white/5 p-8 border border-white/10">
                                <span className="text-6xl">🔒</span>
                            </div>
                            <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">RESTRICTED</h2>
                            <p className="mb-10 text-sm font-medium text-gray-500 leading-relaxed">Identity verification required. Access your profile vault securely.</p>
                            <Link
                                to="/login"
                                className="w-full rounded-2xl bg-white px-12 py-4 text-xs font-black text-black shadow-xl shadow-white/10 transition-all hover:scale-105 active:scale-95"
                            >
                                AUTHORIZE ACCESS
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <div
                className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-100 flex items-center gap-3 rounded-full bg-[#161b22] border border-emerald-500/30 px-6 py-4 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 ${showToast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}
            >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-sm font-bold tracking-tight">{toastMessage}</span>
            </div>
        </div>
    );
};

export default ProfilePage;
