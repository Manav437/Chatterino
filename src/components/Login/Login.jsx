import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ChevronLeft } from "lucide-react";

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

                <div className="flex w-full max-w-md flex-col items-center gap-8 rounded-3xl p-8 md:p-10">
                    <div className="text-center">
                        <h1 className="mb-2 text-4xl font-bold tracking-tight text-white uppercase">Welcome Back</h1>
                        <p className="text-gray-400 text-sm">Please enter your details to sign in.</p>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="flex w-full flex-col gap-5"
                    >
                        <div className="space-y-2 flex flex-col items-start">
                            <label className="pl-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="manav.communify@example.com"
                                className="w-full h-11 text-sm rounded-xl border-2 border-white/10 bg-white/5 px-4 text-white outline-none transition-all duration-300 focus:border-emerald-500/30 focus:bg-white/10"
                                required
                            />
                        </div>

                        <div className="space-y-2 flex flex-col items-start">
                            <label className="pl-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">Password</label>
                            <input
                                type="password"
                                value={password}
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-11 text-sm rounded-xl border-2 border-white/10 bg-white/5 px-4 text-white outline-none transition-all duration-300 focus:border-emerald-500/30 focus:bg-white/10"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between py-1">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-400">
                                <input type="checkbox" className="h-4 w-4 rounded border-white/10 bg-white/5 accent-emerald-500" />
                                <span>Remember me</span>
                            </label>
                            <Link to="#" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300">
                                Forgot password?
                            </Link>
                        </div>

                        {error && (
                            <p className="text-center text-sm font-medium text-rose-500 bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">
                                {error}
                            </p>
                        )}

                        <button
                            className="h-11 w-full cursor-pointer rounded-[50px] [corner-shape:squircle] bg-white font-bold text-black transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden mt-2"
                            disabled={loading}
                        >
                            <span className="relative z-10">{loading ? "Logging in..." : "Sign In"}</span>
                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-emerald-400 to-teal-400 transition-transform duration-300 group-hover:translate-x-0"></div>
                        </button>
                    </form>

                    <p className="text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-sm font-semibold text-blue-400/90 hover:text-blue-300 hover:underline underline-offset-2 decoration-1"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
