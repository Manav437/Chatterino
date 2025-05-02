import React, { useState, useEffect } from "react"
import { auth, database } from "../../firebase"
import { useLocation } from "react-router-dom";
import { updateProfile } from "firebase/auth"
import { ref, get, update } from "firebase/database";
import { Link } from "react-router-dom";
import './Profile.css'

const languagesList = ["English", "Hindi", "Japanese", "French", "Korean", "Spanish", "German"]

const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [bio, setBio] = useState("");

    const [speaks, setSpeaks] = useState([])
    const [learning, setLearning] = useState([])

    const [displayName, setDisplayName] = useState("");
    const [displayPhoto, setDisplayPhoto] = useState("");
    const [displayBio, setDisplayBio] = useState("");
    const [displaySpeaks, setDisplaySpeaks] = useState([])
    const [displayLearning, setDisplayLearning] = useState([])

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const currentUser = auth.currentUser;
        console.log(currentUser)
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
            setDisplaySpeaks(data.speaks || [])
            setDisplayLearning(data.learning || [])
        }
    };

    const updateUserProfile = async () => {
        try {
            const currentUser = auth.currentUser;

            const updatedName = name.trim() !== "" ? name : currentUser.displayName;
            const updatedPhoto = photo.trim() !== "" ? photo : currentUser.photoURL;
            const updatedBio = bio.trim() !== "" ? bio : displayBio;

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
        setName("")
        setPhoto("")
        setBio("")
    };

    const handleMultiSelect = (setter) => (e) => {
        const values = Array.from(e.target.selectedOptions, opt => opt.value)
        setter(values)
    }

    return (
        <div className="profile-container" style={{ display: "flex" }}>
            <div className="navbar">
                <div className="home-logo" style={{ paddingBottom: "30px", borderBottom: "1px solid white" }}>
                    <img style={{ height: "64px", width: "64px" }} src="/mogul-moves-3.svg" alt="logo" />
                    <p style={{ marginTop: "10px", marginBottom: "0" }}>Chatterino</p>
                </div>
                <div className="nav-items" style={{ width: "100%" }}>
                    <div className="nav-item">
                        <img style={{ height: "25px" }} src="/home-icon.png" alt="" />
                        <Link style={{ fontWeight: "bold", minWidth: "70%", fontSize: "1.2rem" }} className={`${currentPath === "/" ? "active" : ""} nav-links`} to="/">Home</Link >
                    </div>
                    <div className="nav-item" >
                        <img style={{ height: "25px" }} src="/chat-icon.png" alt="" />
                        <Link style={{ fontWeight: "bold", width: "70%", fontSize: "1.2rem" }} to="/chats" className={`${currentPath === "/chats" ? "active" : ""} nav-links`}>Chat</Link>
                    </div>
                    <div className="nav-item">
                        <img style={{ height: "25px" }} src="/user-icon.png" alt="" />
                        <Link style={{ fontWeight: "bold", width: "70%", fontSize: "1.2rem" }} to="/profile" className={`${currentPath === "/profile" ? "active" : ""} nav-links`}>Profile</Link>
                    </div>
                </div>
            </div >

            <div className="profile" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <h1 style={{ width: "25%", textAlign: "center", border: "1px solid white", borderRadius: "15px", padding: "5px 7px", background: "black", marginTop: "10px", color: "white" }}>Profile Page</h1>
                {user ?
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "40px",
                        flexWrap: "wrap",
                        paddingTop: "15px",
                        justifyContent: "center",
                        // borderTop: "2px solid white"
                    }}>
                        <div style={{
                            flex: 1,
                            minWidth: "300px",
                            maxWidth: "400px",
                            backgroundColor: "black",
                            padding: "30px",
                            border: "1px solid white",
                            borderRadius: "15px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            textAlign: "center"
                        }}>
                            <img
                                src={displayPhoto || "/noimg-icon.png"}
                                alt="Profile"
                                style={{
                                    height: "125px",
                                    width: "125px",
                                    borderRadius: "25px",
                                    objectFit: "cover",
                                    border: "2px solid white",
                                    padding: "2px",
                                    background: "lightgreen",
                                    marginBottom: "10px"
                                }}
                            />
                            <p style={{ color: "#F5EEDD", fontWeight: "bold", fontSize: "16px" }}>📧 {user.email}</p>
                            <p style={{ color: "#fff" }}>🧑 <strong style={{ textDecoration: "underline", textUnderlineOffset: "2px" }}>Name</strong>: {displayName}</p>
                            <p style={{ color: "#fff" }}>💬 <strong style={{ textDecoration: "underline", textUnderlineOffset: "2px" }}>Bio</strong>: {displayBio || "[No bio yet]"}</p>

                            <hr style={{ border: "none", height: "2px", background: "white", borderRadius: "5px" }} />

                            {displaySpeaks.length > 0 && (
                                <div style={{ marginTop: "15px" }}>
                                    <strong style={{ color: "#fff" }}>🗣️ Speaks:</strong>
                                    <div style={{ borderRadius: "20px", background: "white", padding: "10px", display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
                                        {displaySpeaks.map(lang => (
                                            <span key={lang} style={{
                                                cursor: "alias",
                                                padding: "5px 10px",
                                                borderRadius: "15px",
                                                border: "1px solid black",
                                                backgroundColor: "#d1e7dd",
                                                fontSize: "13px",
                                                color: "black"
                                            }}>{lang}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {displayLearning.length > 0 && (
                                <div style={{ marginTop: "15px" }}>
                                    <strong style={{ color: "#fff" }}>📚 Learning:</strong>
                                    <div style={{ borderRadius: "20px", background: "white", padding: "10px", display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
                                        {displayLearning.map(lang => (
                                            <span key={lang} style={{
                                                cursor: "alias",
                                                padding: "5px 10px",
                                                borderRadius: "15px",
                                                border: "1px solid black",
                                                backgroundColor: "#cff4fc",
                                                fontSize: "13px",
                                                color: "#055160"
                                            }}>{lang}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="update-profile" style={{
                            flex: 1,
                            minWidth: "300px",
                            maxWidth: "400px",
                            padding: "20px",
                            borderRadius: "15px",
                            border: "1px solid white",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "black",
                            // textAlign: "center"
                        }}>
                            <h2 style={{ margin: "0", marginBottom: "20px", color: "white", textAlign: "center" }}>⛭ <span style={{ textDecoration: "underline", textUnderlineOffset: "5px" }}>Update Your Details</span> </h2>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="New Name"
                                style={{ background: "#222222", padding: "10px", marginBottom: "10px", width: "90%", borderRadius: "8px" }}
                            />
                            <input
                                type="text"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                placeholder="New Photo URL"
                                style={{ background: "#222222", padding: "10px", marginBottom: "10px", width: "90%", borderRadius: "8px" }}
                            />
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="New Bio"
                                rows="3"
                                style={{ background: "#222222", padding: "10px", marginBottom: "0px", width: "90%", borderRadius: "8px", resize: "none" }}
                            ></textarea>

                            <hr style={{ width: "98%", height: "2px", background: "white", border: "none", borderRadius: "5px" }} />

                            <label style={{ color: "white", fontWeight: "bold" }}>Languages You Speak:</label>
                            <select multiple size={7} value={speaks} onChange={handleMultiSelect(setSpeaks)} style={{ maxHeight: "110px", background: "#222222", padding: "2px 8px", marginBottom: "10px", width: "95%", borderRadius: "8px", border: ".5px solid #ccc" }}>
                                {languagesList.map(lang => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>

                            <label style={{ color: "white", fontWeight: "bold" }}>Languages You're Learning:</label>
                            <select multiple size={7} value={learning} onChange={handleMultiSelect(setLearning)} style={{ maxHeight: "110px", background: "#222222", padding: "2px 8px", marginBottom: "15px", width: "95%", borderRadius: "8px", border: ".5px solid #ccc" }}>
                                {languagesList.map(lang => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>

                            <button onClick={updateUserProfile} style={{ padding: "10px", width: "100%", borderRadius: "8px", backgroundColor: "#4CAF50", color: "white", fontWeight: "bold", border: "none", cursor: "pointer" }}>
                                Update Profile
                            </button>
                        </div>
                    </div>
                    : <h2>'Please log in to view your profile'</h2>
                }
            </div>
        </div >
    )
}

export default ProfilePage;