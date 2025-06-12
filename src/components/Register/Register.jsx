import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // Import Navigate for redirection
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";  // Import Firebase Auth
import { getDatabase, ref, set } from "firebase/database";
import { auth, database } from "../../firebase.js";  // Firebase config initialization
import "./Register.css";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleAddUser = async () => {
        if (!name || !email || !password) {
            alert("Please fill all the fields!");
            return;
        }

        try {
            // Create a user with email and password using Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name
            });
            // console.log("User registered successfully:", user.displayName);


            await set(ref(database, "users/" + user.uid), {
                name: name,
                email: email,
                uid: user.uid
            });

            // console.log("User registered successfully:", user);
            alert("Registration successfull! 🥳");

            setName("");
            setEmail("");
            setPassword("");
            localStorage.setItem("token", user.accessToken);  // Store the token in local storage
            useNavigate("/")
        } catch (err) {
            setError(err.message);  // Display any error message
            console.error("Error registering user:", err);
        }
    };

    return (
        <div className="register-container">
            <Link to="/"><img src="/mogul-moves.svg" alt="" /></Link>
            <div className="register-div">
                <h1 style={{ margin: "0" }}>SIGN UP</h1>
                <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        minWidth: "300px"
                    }}>
                    <label style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ margin: "3px 0" }}>Username</p>
                        <input className="register-input"
                            autoComplete="new-name"
                            placeholder="noobmaster"
                            style={{ height: "30px", padding: "5px", paddingLeft: "10px" }}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required

                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ margin: "3px 0" }}>Email</p>
                        <input
                            autoComplete="new-email"
                            className="register-input"
                            placeholder="xyz@hotmail.com"
                            style={{ height: "30px", padding: "5px", paddingLeft: "10px" }}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required

                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ margin: "3px 0" }}>Password</p>
                        <input
                            autoComplete="new-password"
                            placeholder="********"
                            style={{ height: "30px", padding: "5px", paddingLeft: "10px" }}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label style={{ margin: "3px 0", textAlign: "start" }}>
                        <input style={{ cursor: "pointer" }} type="checkbox" />I agree to terms and conditions.
                    </label>
                    <button className="register-btn" type="submit" style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        height: "35px",
                        cursor: "pointer",
                        border: "none",
                        borderRadius: "4px"
                    }}>Sign Up</button>
                </form>


                {error && <p style={{ color: "red" }}>{error}</p>}  {/* Show error if any */}
                <p style={{ margin: "0 0 3px 0" }}>Already have an account? <Link to='/login' style={{ color: "#328E6E", textDecoration: "underline", textUnderlineOffset: "3px" }}>Login</Link></p>
            </div>
        </div>
    );
}

export default RegisterPage;
