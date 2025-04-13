import { Link, useNavigate } from "react-router-dom";


function HomeNotLoggedIn() {
    const navigate = useNavigate()
    return (
        <div className="home-not-logged-in" style={{ textAlign: "center", margin: "0 auto", minWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "100px", borderBottom: "1px solid #2C2C2C", paddingBottom: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                    <h3 style={{ margin: "0", paddingLeft: "5px" }}>mnv</h3>
                    <h3 style={{ margin: "0" }}>gsn</h3>
                </div>

                <img src="/mogul-moves-3.svg" alt="" style={{ height: "90px" }} />

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", height: "100%" }}>
                    <h3 style={{ margin: "0", paddingRight: "5px" }}>April</h3>
                    <h3 style={{ margin: "0", paddingRight: "5px" }}>2025</h3>
                </div>
            </div>



            <h1 className="home-header" style={{ width: "100%", fontSize: "9.5rem", marginTop: "0", marginBottom: "0" }}>CHATTERINO</h1>
            <p style={{ fontStyle: "italic" }}>💬 Connect. Chat. Share. Your world, your way.</p>

            {/* <hr style={{ width: "60%", border: "none", height: "2px", background: "#8E7DBE" }} />

            <div style={{ width: "60%", margin: "0 auto", lineHeight: "1.5" }}>
                <h2>Chatterino is a modern social platform to chat with friends, share moments, and discover new connections in a fun, simple way.</h2>
            </div> */}

            <hr style={{ width: "95%", border: "none", height: "2px", background: "#2C2C2C" }} />
            <div className="get-started">
                <h3>Let's get you started!</h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <button className="glow-on-hover" onClick={(e) => navigate("/register")}>Sign Up</button>
                    <button className="glow-on-hover" onClick={(e) => navigate("/login")}>Sign In</button>
                </div>

            </div>

            <img style={{ maxWidth: "98%", marginTop: "20px", height: "70vh", width: "100%", borderRadius: "10px" }}
                src="https://framerusercontent.com/images/CDNP3QX8DV14r9QNpxxQYRDunY.png?scale-down-to=4096" alt="" />

            <div style={{ textAlign: "center" }}>
                <p>By signing up, you agree to our <a style={{ color: "lightgreen" }} href="#">Terms of Service</a> and <a style={{ color: "lightgreen" }} href="#">Privacy Policy</a>.</p>
                Connect with us on <Link style={{ color: "#8E7DBE" }} to="https://x.com/manav437">@manav437 on X</Link>
            </div>

        </div >
    )
}

export default HomeNotLoggedIn