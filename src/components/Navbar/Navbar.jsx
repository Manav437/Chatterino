import { Link, NavLink } from "react-router-dom";

const navLinks = [
    {
        to: "/",
        label: "Home",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        )
    },
    {
        to: "/chats",
        label: "Chat",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
        )
    },
    {
        to: "/profile",
        label: "Profile",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        )
    },
];

export const Navbar = () => {
    return (
        <nav className="fixed bottom-0 left-0 z-50 flex gap-4 w-screen border-t border-white/10 bg-[#161b22]/80 px-4 py-3 backdrop-blur-xl md:relative md:bottom-auto md:left-auto md:h-screen md:w-full md:flex-col md:justify-between md:border-r md:border-t-0 md:px-4 shadow-2xl">
            <Link
                to="/"
                className="hidden items-center justify-center gap-3 py-4 text-inherit no-underline md:flex group"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img src="/favicon-img.png" alt="Logo" className="relative h-8 transition-transform group-hover:scale-110 duration-500" />
                </div>
                <h2 className="m-0 text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">Huddle</h2>
            </Link>

            <div className="flex flex-col flex-1">
                <ul className="my-0 flex w-full list-none justify-around gap-4 p-0 md:flex-col md:justify-start md:gap-4">
                    {navLinks.map((link) => (
                        <li key={link.to} className="flex-1 md:flex-none">
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `flex flex-col items-center justify-center gap-1.5 rounded-lg py-1.5 font-bold no-underline transition-all duration-300 md:flex-row md:justify-start md:gap-4 md:px-5 md:py-3 ${isActive
                                        ? "bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                                        : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                                    }`
                                }
                            >
                                <span className="transition-transform duration-300">{link.icon}</span>
                                <span className="text-[10px] md:text-sm">{link.label}</span>
                                <div className="ml-auto hidden h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] md:block transition-opacity duration-500 opacity-0 aria-[current='page']:opacity-100"></div>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto hidden w-full md:block">
                    <div className="rounded-md border border-white/5 p-2 bg-white/5 text-center backdrop-blur-md opacity-30 hover:opacity-100 transition-opacity">
                        <img src="/nav-gif.gif" className="rounded-md h-14 w-full" />
                    </div>
                </div>
            </div>
        </nav>
    );
};
