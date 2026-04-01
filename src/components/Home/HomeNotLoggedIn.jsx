import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight, Globe, MessagesSquare, Sparkles, Zap, Shield, Heart } from "lucide-react";
import Footer from "../Footer/Footer";

function HomeNotLoggedIn() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const navigate = useNavigate();

    return (
        <div className="bg-mesh-gradient min-h-screen w-full overflow-x-hidden text-[#f1f1f1]">
            <header className="fixed top-6 left-1/2 z-50 w-[95%] md:w-[80%] -translate-x-1/2 flex items-center justify-between rounded-2xl glass-card px-6 py-3 transition-all duration-300">
                <div className="flex flex-col leading-tight">
                    <span className="text-md font-bold tracking-tighter text-emerald-400">
                        MNV GSN
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <img
                        src="/mogul-moves-3.svg"
                        alt="Logo"
                        className="h-10 w-auto cursor-pointer transition-transform duration-500 hover:rotate-3 hover:scale-110"
                    />
                </div>

                <div className="flex flex-col items-end text-sm font-medium text-gray-400">
                    <span className="font-bold text-white">APRIL 2025</span>
                </div>
            </header>

            <div
                className="mx-auto flex max-w-6xl flex-col px-4 py-8"
                data-aos="fade-in"
                data-aos-duration="1200"
            >
                <section className="relative mt-32 flex flex-col items-center py-16 text-center">
                    <div className="absolute top-0 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[120px]"></div>

                    <h1
                        className="font-display mb-4 bg-linear-to-b from-white to-gray-500 bg-clip-text text-7xl font-black tracking-[-0.04em] text-transparent md:text-9xl"
                        data-aos="fade-up"
                        data-aos-duration="1500"
                    >
                        HUDDLE
                    </h1>

                    <p
                        className="mb-12 max-w-2xl text-xl leading-relaxed text-gray-400 md:text-2xl"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Connect deeply. Chat freely. Share meaningfully.{" "}
                        <br className="hidden md:block" />
                        <span className="text-emerald-400/80 italic">
                            Your world, your community, your way.
                        </span>
                    </p>

                    <div
                        className="flex flex-wrap items-center justify-center gap-6"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <button
                            className="cursor-pointer group relative flex h-14 w-44 items-center justify-center overflow-hidden rounded-[50px] [corner-shape:squircle] bg-white font-bold text-black transition-all hover:scale-101"
                            onClick={() => navigate("/register")}
                        >
                            <span className="flex items-center relative z-10">
                                Get Started <ChevronRight size={20} className="group-hover:translate-x-0.5 duration-300" />
                            </span>
                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-emerald-400 to-teal-400 transition-transform duration-300 group-hover:translate-x-0"></div>
                        </button>

                        <button
                            className="cursor-pointer glass-card flex h-14 w-44 items-center justify-center rounded-[50px] [corner-shape:squircle] font-bold text-white transition-all hover:bg-white/5 hover:scale-101"
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </button>
                    </div>
                </section>

                <div
                    className="relative my-20 group ring-4 ring-white/20 overflow-hidden rounded-4xl"
                    data-aos="zoom-out"
                    data-aos-duration="1000"
                >
                    <div className="absolute inset-0 -z-10 bg-emerald-500/20 blur-[100px] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"></div>
                    <img
                        className="w-full rounded-4xl border border-white/10 shadow-2xl transition-all duration-700 group-hover:border-white/20"
                        src="/feed-img.png"
                        alt="App Interface"
                    />
                </div>

                <section className="py-24" id="features">
                    <div className="mb-24 flex items-center justify-center gap-4 md:gap-10 text-center">
                        <div className="h-px w-full bg-emerald-500/30"></div>
                        <h2 className="font-display w-fit text-4xl font-bold tracking-tight text-white md:text-6xl flex items-center gap-4">
                            FEATURES
                        </h2>
                        <div className="h-px w-full bg-emerald-500/30"></div>
                    </div>

                    <div className="space-y-48">
                        <div className="group flex flex-col items-center gap-16 md:flex-row">
                            <div className="relative flex-1" data-aos="fade-right">
                                <div className="absolute -inset-4 rounded-[40px] bg-emerald-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <img
                                    className="relative rounded-4xl border border-white/10 shadow-2xl transition-all duration-500"
                                    src="/post-img.png"
                                    alt="Global Feed"
                                />
                                <div className="absolute -bottom-10 -right-10 -z-10 h-48 w-48 rounded-full bg-emerald-500/20 blur-[100px]"></div>
                            </div>

                            <div className="flex-1 space-y-8" data-aos="fade-left">
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                                    <Globe size={18} className="text-emerald-400" />
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Discover</span>
                                </div>
                                <h3 className="font-display text-5xl font-bold tracking-tight text-white">
                                    STAY CONNECTED
                                </h3>
                                <p className="text-xl leading-relaxed text-gray-400">
                                    Share your thoughts and let your voice be heard. Capture life’s moments and stay closer to your community every single day with a global feed built for connection.
                                </p>
                            </div>
                        </div>

                        <div className="group flex flex-col-reverse items-center gap-16 lg:flex-row-reverse">
                            <div className="relative lg:flex-[1.2]" data-aos="zoom-in-left">
                                <div className="absolute -inset-4 rounded-[40px] bg-blue-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <img
                                    className="relative rounded-4xl border border-white/10 shadow-2xl transition-all duration-500"
                                    src="/chat-img.png"
                                    alt="Smart Chatrooms"
                                />
                                <div className="absolute -top-20 -left-20 -z-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[120px]"></div>
                            </div>

                            <div className="flex-1 space-y-8" data-aos="fade-right">
                                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
                                    <MessagesSquare size={18} className="text-blue-400" />
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Communicate</span>
                                </div>
                                <h3 className="font-display text-5xl font-bold tracking-tight text-white">
                                    SMART CHATROOMS
                                </h3>
                                <p className="text-xl leading-relaxed text-gray-400">
                                    Instantly jump into chatrooms tailored to your language passions. Connect with people who share your journey and vibe with a community that grows with you.
                                </p>
                            </div>
                        </div>

                        <div className="group flex flex-col items-center gap-16 md:flex-row relative">
                            <div className="relative flex-1 md:order-1" data-aos="fade-up">
                                <div className="absolute -inset-4 rounded-[40px] bg-purple-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <img
                                    className="relative rounded-4xl border border-white/10 shadow-2xl transition-all duration-500"
                                    src="/profile-img.png"
                                    alt="Profile Customization"
                                />
                                <div className="absolute -bottom-20 -right-20 -z-10 h-80 w-80 rounded-full bg-purple-500/10 blur-[140px]"></div>
                            </div>

                            <div className="flex-1 space-y-8 z-10 md:order-2" data-aos="fade-left">
                                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2">
                                    <Sparkles size={18} className="text-purple-400" />
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-purple-400">Personalize</span>
                                </div>
                                <h3 className="font-display text-5xl font-bold tracking-tight text-white">
                                    MAKE IT YOURS
                                </h3>
                                <p className="text-xl leading-relaxed text-gray-400">
                                    Customize your profile with a unique identity. A bio that tells your story and a profile picture that shows the real you.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}

export default HomeNotLoggedIn;
