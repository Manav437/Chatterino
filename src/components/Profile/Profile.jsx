import React, { useState, useEffect } from "react"
import { auth, database } from "../../firebase"
import { useLocation } from "react-router-dom";
import { updateProfile } from "firebase/auth"
import { ref, get, update } from "firebase/database";
import { Link } from "react-router-dom";
import './Profile.css'

const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [bio, setBio] = useState("");

    const [displayName, setDisplayName] = useState("");
    const [displayPhoto, setDisplayPhoto] = useState("");
    const [displayBio, setDisplayBio] = useState("");

    const location = useLocation();
    const currentPath = location.pathname;


    useEffect(() => {
        const currentUser = auth.currentUser;
        console.log(currentUser)
        if (currentUser) {
            setUser(currentUser);
            setName("");
            setPhoto("");
            setBio("")
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
            // setBio(data.bio || "");
            setDisplayBio(data.bio || "");
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
            await update(userRef, {
                name: updatedName,
                bio: updatedBio
            });

            setDisplayName(updatedName);
            setDisplayPhoto(updatedPhoto);
            setDisplayBio(updatedBio);

            alert("Profile updated!");
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
        setName("")
        setPhoto("")
        setBio("")
    };

    return (
        <div className="profile-container" style={{ display: "flex" }}>
            <div className="navbar">
                <div className="home-logo">
                    <img style={{ height: "64px", width: "64px" }} src="/home-logo-img.png" alt="" />
                    <p style={{ marginTop: "10px", marginBottom: "0" }}>Chatterino</p>
                </div>
                <hr style={{ width: "80%" }} />
                <div className="nav-items">
                    <div className="nav-item">
                        <Link className={`${currentPath === "/" ? "active" : ""} nav-links`} to="/">Home</Link >
                    </div>
                    <div className="nav-item">
                        <Link to="/chats" className={`${currentPath === "/chats" ? "active" : ""} nav-links`}>Chat</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/profile" className={`${currentPath === "/profile" ? "active" : ""} nav-links`}>Profile</Link>
                    </div>
                </div>
            </div >

            <div className="profile" style={{ display: "flex", flexDirection: "column" }}>
                <h1>Profile Page</h1>
                {user ?
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                        <img style={{ height: "100px", width: "100px", padding: "5px", borderRadius: "10px", border: "2px solid green" }} src={auth.currentUser.photoURL} alt="" />
                        <p><strong>Email :</strong> {user.email}</p>
                        <p><strong>Name :</strong> {displayName}</p>
                        <p><strong>Bio :</strong> {displayBio}</p>
                        <hr style={{ width: "30%" }} />
                        <h2>Update your Details</h2>

                        <input style={{ fontSize: "15px", marginBottom: "10px", height: "20px", width: "200px" }} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        <input style={{ fontSize: "15px", marginBottom: "10px", height: "20px", width: "200px" }} type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo URL" />
                        <textarea style={{ fontSize: "15px", height: "20px", marginBottom: "10px" }} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>
                        <button style={{ padding: "6px", borderRadius: "10px", cursor: 'pointer', background: "green", color: "white", border: "1px solid white" }} onClick={updateUserProfile}><strong>Update Profile</strong></button>
                    </div>
                    : <h2>'Please log in to view your profile'</h2>
                }
            </div>
        </div>
    )
}

export default ProfilePage