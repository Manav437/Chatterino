import { Link, useNavigate } from "react-router-dom";


function HomeNotLoggedIn() {
    const navigate = useNavigate()
    return (
        <div className="home-not-logged-in">
            <h1>CHATTERINO</h1>
            <p style={{ fontStyle: "italic" }}>💬 Connect. Chat. Share. Your world, your way.</p>

            <hr style={{ width: "60%", border: "none", height: "2px", background: "black" }} />

            <div style={{ width: "60%", margin: "0 auto", lineHeight: "1.5" }}>
                <h2>Chatterino is a modern social platform to chat with friends, share moments, and discover new connections in a fun, simple way.</h2>
            </div>

            <hr style={{ width: "60%", border: "none", height: "2px", background: "black" }} />
            <div className="get-started">
                <h3>Let's get you started!</h3>
                <button onClick={(e) => navigate("/register")}>Sign Up</button>
                <button onClick={(e) => navigate("/login")}>Log In</button>
            </div>

            <img style={{ height: "200px", width: "600px", border: "1px solid white", padding: "5px", borderRadius: "10px" }}
                src="/home-cover-img.png" alt="" />

            <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", textAlign: "center" }}>
                <p>By signing up, you agree to our <a style={{ color: "lightgreen" }} href="#">Terms of Service</a> and <a style={{ color: "lightgreen" }} href="#">Privacy Policy</a>.</p>
                Connect with us on <Link style={{ color: "lightpink" }} to="https://x.com/manav437">@manav437 on X</Link>
            </div>

        </div>
    )
}

export default HomeNotLoggedIn