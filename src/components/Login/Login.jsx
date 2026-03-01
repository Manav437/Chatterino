import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            if (
                error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password"
            ) {
                setError("Invalid email or password. Please try again.");
            } else if (error.code === "auth/too-many-requests") {
                setError(
                    "Access to this account has been temporarily disabled due to many failed login attempts.",
                );
            } else {
                setError(
                    "An unexpected error occurred. Please try again later.",
                );
            }
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Link to="/">
                <img src="/mogul-moves-2.svg" alt="Logo" />
            </Link>

            <div className="auth-card">
                <h1>LOGIN</h1>

                <form onSubmit={handleLogin} className="auth-form">
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="xyz@hotmail.com"
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="**********"
                            required
                        />
                    </label>

                    <label
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                    >
                        <input type="checkbox" />
                        <span style={{ fontSize: "13px" }}>Remember me</span>
                    </label>

                    {error && <p className="error-message">{error}</p>}

                    <button className="auth-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p>
                    Don’t have an account?{" "}
                    <Link to="/register" className="auth-link">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
