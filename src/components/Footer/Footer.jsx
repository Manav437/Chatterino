import { Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
    return (
        <footer className="mt-20 w-full px-4 pb-12">
            <div className="mx-auto max-w-6xl rounded-[2.5rem] glass-card border border-white/10 p-12 shadow-2xl">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="flex flex-col items-start space-y-6">
                        <div className="flex flex-col leading-tight">
                            <span className="font-display text-2xl font-black tracking-tighter text-white">
                                HUDDLE
                            </span>
                        </div>
                        <p className="text-sm text-start leading-relaxed text-gray-400">
                            Connecting communities through seamless chat and shared
                            experiences. Your space to be yourself, together.
                        </p>
                    </div>

                    <div className="flex flex-col space-y-6">
                        <h4 className="font-display text-lg font-bold text-white">SOCIALS</h4>
                        <div className="flex items-center flex-col space-y-4">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/manav437"
                                className="group flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
                            >
                                <Github size={18} className="transition-transform group-hover:scale-110" />
                                <span className="text-sm font-medium">Github</span>
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.linkedin.com/in/manav-gusain/"
                                className="group flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
                            >
                                <Linkedin size={18} className="transition-transform group-hover:scale-110" />
                                <span className="text-sm font-medium">LinkedIn</span>
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://x.com/Manav437"
                                className="group flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
                            >
                                <Twitter size={18} className="transition-transform group-hover:scale-110" />
                                <span className="text-sm font-medium">Twitter / X</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-6">
                        <h4 className="font-display text-lg font-bold text-white">ABOUT</h4>
                        <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-400">
                            <li><a href="#" className="transition-colors hover:text-white">Our story</a></li>
                            <li><a href="#" className="transition-colors hover:text-white">Terms & Conditions</a></li>
                            <li><a href="#" className="transition-colors hover:text-white">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-6">
                        <h4 className="font-display text-lg font-bold text-white">HELP</h4>
                        <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-400">
                            <li><a href="#" className="transition-colors hover:text-white">FAQs</a></li>
                            <li><a href="#" className="transition-colors hover:text-white">Contact</a></li>
                            <li><a href="#" className="transition-colors hover:text-white">Community Guidelines</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 w-full border-t border-white/5 pt-12 overflow-hidden">
                    <div className="flex animate-[scroll_30s_linear_infinite] whitespace-nowrap opacity-10 hover:[animation-play-state:paused]">
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="font-display mx-4 text-6xl font-black tracking-tighter text-white">
                                HUDDLE
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between border-t border-white/5 pt-8 md:flex-row">
                    <p className="text-xs font-bold tracking-widest text-gray-500">
                        &copy; 2025 HUDDLE. ALL RIGHTS RESERVED.
                    </p>
                    <p className="mt-4 text-xs font-bold tracking-widest text-gray-500 md:mt-0">
                        MANAV GUSAIN
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;