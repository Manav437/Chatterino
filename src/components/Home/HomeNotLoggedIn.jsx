import { Link, useNavigate } from "react-router-dom";


function HomeNotLoggedIn() {
    const navigate = useNavigate()
    return (
        <div className="home-not-logged-in" style={{ minWidth: "400px" }}>
            <img src="/mogul-moves-3.svg" alt="" style={{ height: "50px" }} />
            <h1 style={{ marginTop: "0", marginBottom: "0" }}>CHATTERINO</h1>
            <p style={{ fontStyle: "italic" }}>💬 Connect. Chat. Share. Your world, your way.</p>

            <hr style={{ width: "60%", border: "none", height: "2px", background: "#8E7DBE" }} />

            <div style={{ width: "60%", margin: "0 auto", lineHeight: "1.5" }}>
                <h2>Chatterino is a modern social platform to chat with friends, share moments, and discover new connections in a fun, simple way.</h2>
            </div>

            <hr style={{ width: "60%", border: "none", height: "2px", background: "#8E7DBE" }} />
            <div className="get-started">
                <h3>Let's get you started!</h3>
                <button className="glow-on-hover" onClick={(e) => navigate("/register")}>Sign Up</button>
                <button className="glow-on-hover" onClick={(e) => navigate("/login")}>Sign In</button>
            </div>

            <img style={{ marginTop: "20px", height: "200px", width: "700px", border: "1px solid white", padding: "5px", borderRadius: "10px" }}
                src="https://i.pinimg.com/originals/ca/26/2e/ca262e0354eea311c41134c3e4bc3bc2.gif" alt="" />

            <div style={{ textAlign: "center" }}>
                <p>By signing up, you agree to our <a style={{ color: "lightgreen" }} href="#">Terms of Service</a> and <a style={{ color: "lightgreen" }} href="#">Privacy Policy</a>.</p>
                Connect with us on <Link style={{ color: "#8E7DBE" }} to="https://x.com/manav437">@manav437 on X</Link>
            </div>

        </div>
    )
}

export default HomeNotLoggedIn