import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer"

function HomeNotLoggedIn() {
    const navigate = useNavigate()
    return (
        <div className="home-not-logged-in" style={{ textAlign: "center", margin: "0 auto", minWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "100px", borderBottom: "2px solid #2C2C2C", paddingBottom: "10px" }}>
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
            <p style={{ fontStyle: "italic", color: "#E3D2C3", fontSize: "1.5rem" }}>💬 Connect. Chat. Share. Your world, your way.</p>

            {/* <hr style={{ width: "60%", border: "none", height: "2px", background: "#8E7DBE" }} />

            <div style={{ width: "60%", margin: "0 auto", lineHeight: "1.5" }}>
                <h2>Chatterino is a modern social platform to chat with friends, share moments, and discover new connections in a fun, simple way.</h2>
            </div> */}

            <hr style={{ width: "95%", border: "none", height: "2px", background: "#2C2C2C" }} />
            <div className="get-started">
                <h3 style={{ color: "#FDFAF6", fontSize: "1.3rem" }}>Let's get you started!</h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <button className="glow-on-hover" onClick={(e) => navigate("/register")}>Sign Up</button>
                    <button className="glow-on-hover" onClick={(e) => navigate("/login")}>Sign In</button>
                </div>

            </div>

            <img style={{ maxWidth: "98%", marginTop: "20px", height: "70vh", width: "100%", borderRadius: "2   0px" }}
                src="https://framerusercontent.com/images/CDNP3QX8DV14r9QNpxxQYRDunY.png?scale-down-to=4096" alt="" />

            <div style={{ borderTop: "2px solid #2C2C2C" }}>
                <h1>Features</h1>
                <div style={{ display: "flex", justifyContent: "flex-start", margin: "0", marginBottom: "10px" }}>
                    <div style={{ background: "#030303", marginLeft: "20px", border: "3px solid #2C2C2C", borderRadius: "20px", display: "flex", flexDirection: "column", justifyContent: "center", height: "520px", width: "60%" }}>
                        <h3 style={{ marginTop: "0", textDecoration: "underline", textUnderlineOffset: "4px" }}>POSTS</h3>
                        <img style={{ margin: "0 auto", borderRadius: "10px", border: "1px solid grey", height: "400px", width: "80%" }} src="/feed-posts-img.png" alt="" />
                    </div>
                    <p style={{ borderLeft: "3px solid #000", borderRadius: "10px", fontSize: "1.2rem", paddingLeft: "10px", margin: "20% auto", width: "20%" }}>Post your daily thoughts, share your moments, and connect with friends.</p>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", margin: "0", marginBottom: "10px" }}>
                    <p style={{ borderRadius: "10px", borderRight: "3px solid #000", fontSize: "1.2rem", margin: "auto", width: "20%", paddingRight: "10px" }}>Auto-generated chatrooms based on the languages you speak and learn — instantly connect with people who vibe like you.</p>
                    <div style={{ background: "#030303", marginLeft: "20px", border: "3px solid #2C2C2C", borderRadius: "20px", display: "flex", flexDirection: "column", justifyContent: "center", height: "520px", width: "60%" }}>
                        <h3 style={{ marginTop: "0", textDecoration: "underline", textUnderlineOffset: "4px" }}>CHATROOMS</h3>
                        <img style={{ marginLeft: "20px", borderRadius: "10px", border: "1px solid grey", height: "400px", width: "90%" }} src="/chatroom-img.png" alt="" />
                    </div>

                </div>

                <div style={{ display: "flex", justifyContent: "flex-start", margin: "0", marginBottom: "10px" }}>
                    <div style={{ background: "#030303", marginLeft: "20px", border: "3px solid #2C2C2C", borderRadius: "20px", display: "flex", flexDirection: "column", justifyContent: "center", height: "520px", width: "60%" }}>
                        <h3 style={{ margin: "0", textDecoration: "underline", textUnderlineOffset: "4px" }}>CUSTOMISE PROFILE</h3>
                        <div style={{ margin: "10px", display: "flex" }}>
                            <img style={{ margin: "0 auto", borderRadius: "10px", border: "1px solid grey", height: "400px", width: "90%" }} src="/update-profile-img1.png" alt="" />
                        </div>
                    </div>
                    <p style={{ borderRadius: "10px", borderLeft: "3px solid #000", fontSize: "1.2rem", margin: "auto", width: "20%", paddingLeft: "10px" }}>Customise your profile with a unique username, bio, and profile picture.</p>
                </div>
            </div>

            <Footer />

        </div >
    )
}

export default HomeNotLoggedIn