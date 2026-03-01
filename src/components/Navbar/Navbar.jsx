import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const navLinks = [
    { to: "/", label: "Home", icon: "/home-icon.png" },
    { to: "/chats", label: "Chat", icon: "/chat-icon.png" },
    { to: "/profile", label: "Profile", icon: "/user-icon.png" },
];

export const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo-container">
                <img src="/mogul-moves-3.svg" alt="Chatterino Logo" />
                <h2>Chatterino</h2>
            </Link>

            <ul className="nav-items">
                {navLinks.map((link) => (
                    <li key={link.to}>
                        <NavLink
                            to={link.to}
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            <img src={link.icon} alt={`${link.label} icon`} />
                            <span>{link.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
