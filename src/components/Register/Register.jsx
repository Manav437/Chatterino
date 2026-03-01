import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../firebase.js";
import "./Register.css";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsAgreed, setTermsAgreed] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAddUser = async (event) => {
        event.preventDefault();

        if (!name || !email || !password) {
            setError("Please fill in all the fields!");
            return;
        }
        if (!termsAgreed) {
            setError("You must agree to the terms and conditions.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name,
            });

            await set(ref(database, "users/" + user.uid), {
                name: name,
                email: email,
                uid: user.uid,
            });

            navigate("/");
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please login.");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters long.");
            } else {
                setError("Failed to create an account. Please try again.");
            }
            console.error("Error registering user:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <Link className="logo-link" to="/">
                <img src="/mogul-moves.svg" alt="Mogul Moves Logo" />
            </Link>
            <div className="register-card">
                <h1 style={{ margin: "0" }}>SIGN UP</h1>
                <form
                    autoComplete="off"
                    onSubmit={handleAddUser}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        minWidth: "300px",
                    }}
                >
                    <label style={{ textAlign: "start" }}>Username</label>
                    <input
                        className="register-input"
                        autoComplete="new-name"
                        placeholder="noobmaster"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label style={{ textAlign: "start" }}>Email</label>
                    <input
                        className="register-input"
                        autoComplete="new-email"
                        placeholder="xyz@hotmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label style={{ textAlign: "start" }}>Password</label>
                    <input
                        className="register-input"
                        autoComplete="new-password"
                        placeholder="********"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            margin: "3px 0",
                            textAlign: "start",
                            fontSize: "13px",
                        }}
                    >
                        <input
                            style={{ cursor: "pointer" }}
                            type="checkbox"
                            checked={termsAgreed}
                            onChange={(e) => setTermsAgreed(e.target.checked)}
                        />
                        I agree to terms and conditions.
                    </label>

                    <button
                        className="register-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign up"}
                    </button>

                    <div className="error-placeholder">
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </form>

                <p style={{ margin: "5px 0 3px 0" }}>
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "#328E6E",
                            textDecoration: "underline",
                            textUnderlineOffset: "3px",
                        }}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
