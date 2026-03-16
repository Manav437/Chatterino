import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight } from "lucide-react";
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
            <div
                className="mx-auto flex max-w-6xl flex-col px-4 py-8"
                data-aos="fade-in"
                data-aos-duration="1200"
            >

                <header className="glass-card flex items-center justify-between rounded-3xl px-4 py-2 mb-12">
                    <div className="flex flex-col leading-tight">
                        <span className="text-md font-bold tracking-tighter text-emerald-400">MNV GSN</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <img
                            src="/mogul-moves-3.svg"
                            alt="Logo"
                            className="h-12 w-auto cursor-pointer transition-transform duration-500 hover:rotate-12 hover:scale-110"
                        />
                    </div>

                    <div className="flex flex-col items-end text-sm font-medium text-gray-400">
                        <span className="font-bold text-white">APRIL 2025</span>
                    </div>
                </header>

                <section className="relative flex flex-col items-center py-16 text-center">
                    <div className="absolute top-0 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[120px]"></div>

                    <h1
                        className="mb-4 bg-linear-to-b from-white to-gray-500 bg-clip-text text-7xl font-black tracking-[-0.04em] text-transparent md:text-9xl [font-family:'Funnel_Display',sans-serif]"
                        data-aos="fade-up"
                        data-aos-duration="1500"
                    >
                        COMMUNIFY
                    </h1>

                    <p
                        className="mb-12 max-w-2xl text-xl leading-relaxed text-gray-400 md:text-2xl"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Connect deeply. Chat freely. Share meaningfully. <br className="hidden md:block" />
                        <span className="text-emerald-400/80 italic">Your world, your community, your way.</span>
                    </p>

                    <div
                        className="flex flex-wrap items-center justify-center gap-6"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <button
                            className="cursor-pointer group relative flex h-14 w-44 items-center justify-center overflow-hidden rounded-xl bg-white font-bold text-black transition-all hover:scale-103"
                            onClick={() => navigate("/register")}
                        >
                            <span className="flex items-center relative z-10">Get Started <ChevronRight size={20} /></span>
                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-emerald-400 to-teal-400 transition-transform duration-300 group-hover:translate-x-0"></div>
                        </button>

                        <button
                            className="cursor-pointer glass-card flex h-14 w-44 items-center justify-center rounded-xl font-bold text-white transition-all hover:bg-white/5 hover:scale-103"
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </button>
                    </div>
                </section>

                <div
                    className="relative my-20 group ring-4 ring-white/20 rounded-20 overflow-hidden rounded-[2rem]"
                    data-aos="zoom-out"
                    data-aos-duration="1500"
                >
                    <div className="absolute inset-0 -z-10 bg-emerald-500/20 blur-[100px] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"></div>
                    <img
                        className="w-full rounded-[2rem] border border-white/10 shadow-2xl transition-all duration-700 group-hover:border-white/20 group-hover:scale-[1.01]"
                        src="/chatterino-img.png"
                        alt="App Interface"
                    />
                </div>

                <section className="py-24" id="features">
                    <div className="mb-20 flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-emerald-500/50"></div>
                        <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl [font-family:Safiro]">
                            CORE FEATURES
                        </h2>
                        <div className="h-px w-12 bg-emerald-500/50"></div>
                    </div>

                    <div className="space-y-32">
                        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center">
                            <div className="relative flex-1" data-aos="fade-right">
                                <img
                                    className="rounded-3xl border border-white/10 shadow-lg"
                                    src="/feed-posts-img.png"
                                    alt="Global Feed"
                                />
                                <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl"></div>
                            </div>

                            <div className="flex-1 space-y-6 text-center md:text-left" data-aos="fade-left">
                                <span className="text-sm font-bold tracking-widest text-emerald-400 uppercase">Discover</span>
                                <h3 className="text-4xl font-black text-white [font-family:Safiro]">STAY CONNECTED</h3>
                                <p className="text-lg leading-relaxed text-gray-400">
                                    Share your thoughts and let your voice be heard. Capture life’s moments, from quick updates to memorable stories, and stay closer to your community every single day.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-center">
                            <div className="flex-1 space-y-6 text-center md:text-left" data-aos="fade-right">
                                <span className="text-sm font-bold tracking-widest text-emerald-400 uppercase">Communicate</span>
                                <h3 className="text-4xl font-black text-white [font-family:Safiro]">SMART CHATROOMS</h3>
                                <p className="text-lg leading-relaxed text-gray-400">
                                    Auto-generated chatrooms tailored to the languages you speak and learn. Instantly connect with people who share your passion and vibe with your journey.
                                </p>
                            </div>

                            <div className="relative flex-1" data-aos="fade-left">
                                <img
                                    className="rounded-3xl border border-white/10 shadow-lg"
                                    src="/chatroom-img.png"
                                    alt="Smart Chatrooms"
                                />
                                <div className="absolute -top-6 -left-6 -z-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"></div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center">
                            <div className="relative flex-1" data-aos="fade-right">
                                <img
                                    className="rounded-3xl border border-white/10 shadow-lg"
                                    src="/update-profile.png"
                                    alt="Profile Customization"
                                />
                                <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"></div>
                            </div>

                            <div className="flex-1 space-y-6 text-center md:text-left" data-aos="fade-left">
                                <span className="text-sm font-bold tracking-widest text-emerald-400 uppercase">Personalize</span>
                                <h3 className="text-4xl font-black text-white [font-family:Safiro]">MAKE IT YOURS</h3>
                                <p className="text-lg leading-relaxed text-gray-400">
                                    Customize your profile with a unique identity. A bio that tells your story and a profile picture that shows the real you. Let your personality shine.
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
