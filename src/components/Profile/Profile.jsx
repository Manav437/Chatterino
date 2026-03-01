import React, { useState, useEffect } from "react";
import { auth, database } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { Navbar } from "../Navbar/Navbar";
import "./Profile.css";

const languagesList = [
    "English",
    "Hindi",
    "Japanese",
    "French",
    "Korean",
    "Spanish",
    "German",
];

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

            alert("Profile updated!");
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
        setName("");
        setPhoto("");
        setBio("");
    };

    const handleMultiSelect = (setter) => (e) => {
        const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
        setter(values);
    };

    return (
        <div className="profile-container">
            <Navbar />

            <div className="profile">
                <h1 className="profile-heading">Edit Profile</h1>

                {user ? (
                    <div className="profile-sections">
                        {/* LEFT: Display user info */}
                        <div className="profile-card">
                            <h2 className="section-title">
                                ⚝ <span>User Profile</span>
                            </h2>
                            <img
                                src={displayPhoto || "/noimg-icon.png"}
                                alt="Profile"
                                className="profile-photo"
                            />

                            <p className="profile-email">📧 {user.email}</p>
                            <p className="profile-detail">
                                🧑 <strong>Name:</strong> {displayName}
                            </p>
                            <p className="profile-detail">
                                💬 <strong>Bio:</strong>{" "}
                                {displayBio || "[No bio yet]"}
                            </p>

                            <hr className="divider" />

                            {displaySpeaks.length > 0 && (
                                <div className="language-section">
                                    <strong>🗣️ Speaks:</strong>
                                    <div className="language-tags">
                                        {displaySpeaks.map((lang) => (
                                            <span
                                                className="tag tag-speak"
                                                key={lang}
                                            >
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {displayLearning.length > 0 && (
                                <div className="language-section">
                                    <strong>📚 Learning:</strong>
                                    <div className="language-tags">
                                        {displayLearning.map((lang) => (
                                            <span
                                                className="tag tag-learn"
                                                key={lang}
                                            >
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT: Update profile */}
                        <div className="update-profile">
                            <h2 className="section-title">
                                ⛭ <span>Update Your Details</span>
                            </h2>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="New Name"
                            />
                            <input
                                type="text"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                placeholder="New Photo URL"
                            />
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="New Bio"
                                rows="3"
                            ></textarea>

                            <hr className="divider" />

                            <label>Languages You Speak:</label>
                            <select
                                multiple
                                size={7}
                                value={speaks}
                                onChange={handleMultiSelect(setSpeaks)}
                            >
                                {languagesList.map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>

                            <label>Languages You're Learning:</label>
                            <select
                                multiple
                                size={7}
                                value={learning}
                                onChange={handleMultiSelect(setLearning)}
                            >
                                {languagesList.map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>

                            <button onClick={updateUserProfile}>
                                Update Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <h2>Please log in to view your profile</h2>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
