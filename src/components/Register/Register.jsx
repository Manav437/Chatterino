import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../firebase.js";
import { ChevronLeft } from 'lucide-react';

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
        <div className="flex h-screen w-screen overflow-hidden bg-[#111]">
            <div className="hidden h-full w-[30%] md:block">
                <img
                    src="/auth-img.webp"
                    alt="Authentication"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="bg-mesh-gradient relative flex h-full flex-1 flex-col items-center justify-center px-4 md:w-[70%]">
                <Link to="/" className="absolute text-white left-8 top-8 z-20 flex bg-white/10 pl-1 pr-1.5 py-1 rounded-md hover:bg-white/20">
                    <ChevronLeft />
                </Link>

                <div className="flex w-full max-w-md flex-col items-center gap-8 p-8 md:p-10">
                    <div className="text-center">
                        <h1 className="mb-2 text-4xl font-bold tracking-tight text-white uppercase">Create Account</h1>
                        <p className="text-gray-400 text-sm">Join our community and start sharing.</p>
                    </div>

                    <form
                        onSubmit={handleAddUser}
                        className="flex w-full flex-col gap-4"
                        autoComplete="off"
                    >
                        <div className="space-y-1.5 flex flex-col items-start">
                            <label className="pl-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">Username</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="noobmaster"
                                className="w-full h-11 text-sm rounded-xl border-2 border-white/10 bg-white/5 px-4 text-white outline-none transition-all focus:border-emerald-500/30 duration-300 focus:bg-white/10"
                                required
                            />
                        </div>

                        <div className="space-y-1.5 flex flex-col items-start">
                            <label className="pl-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="manav.communify@example.com"
                                className="w-full h-11 text-sm rounded-xl border-2 border-white/10 bg-white/5 px-4 text-white outline-none transition-all focus:border-emerald-500/30 duration-300 focus:bg-white/10"
                                required
                            />
                        </div>

                        <div className="space-y-1.5 flex flex-col items-start" autoFocus={false}>
                            <label className="pl-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-11 text-sm rounded-xl border-2 border-white/10 bg-white/5 px-4 text-white outline-none transition-all focus:border-emerald-500/30 duration-300 focus:bg-white/10"
                                required
                            />
                        </div>

                        <label className="flex cursor-pointer items-center justify-center gap-2 py-1 text-sm text-gray-400">
                            <input
                                type="checkbox"
                                checked={termsAgreed}
                                onChange={(e) => setTermsAgreed(e.target.checked)}
                                className="h-4 w-4 rounded border-white/10 bg-white/5 accent-emerald-500"
                            />
                            <span>I agree to terms and conditions.</span>
                        </label>

                        {error && (
                            <p className="text-center text-sm font-medium text-rose-500 bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">
                                {error}
                            </p>
                        )}

                        <button
                            className="h-11 w-full cursor-pointer rounded-[50px] [corner-shape:squircle] bg-white font-bold text-black transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden mt-2"
                            type="submit"
                            disabled={loading}
                        >
                            <span className="relative z-10">{loading ? "Signing Up..." : "Sign Up"}</span>
                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-emerald-400 to-teal-400 transition-transform duration-300 group-hover:translate-x-0"></div>
                        </button>
                    </form>

                    <p className="text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-sm font-semibold text-blue-400/90 hover:text-blue-300 hover:underline underline-offset-2 decoration-1"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
