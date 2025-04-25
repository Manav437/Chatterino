import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer"

function HomeNotLoggedIn() {
    const navigate = useNavigate()
    return (
        <div className="home-not-logged-in">
            <div className="not-logged-navbar">
                <div className="navbar-one">
                    <h3 className="h3-one" >mnv</h3>
                    <h3 className="h3-two" >gsn</h3>
                </div>

                <img src="/mogul-moves-3.svg" alt="" />

                <div className="navbar-two">
                    <h3 className="h3-three">April</h3>
                    <h3 className="h3-four">2025</h3>
                </div>
            </div>


            <h1 className="home-header">CHATTERINO</h1>
            <p className="header-text">💬 Connect. Chat. Share. Your world, your way.</p>

            {/* <hr style={{ width: "60%", border: "none", height: "2px", background: "#8E7DBE" }} />

            <div style={{ width: "60%", margin: "0 auto", lineHeight: "1.5" }}>
                <h2>Chatterino is a modern social platform to chat with friends, share moments, and discover new connections in a fun, simple way.</h2>
            </div> */}

            <hr style={{ width: "100%", border: "none", height: "2px", background: "#2C2C2C" }} />
            <div className="get-started">
                <h3>Let's get you started!</h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <button className="glow-on-hover" onClick={(e) => navigate("/register")}>Sign Up</button>
                    <button className="glow-on-hover" onClick={(e) => navigate("/login")}>Sign In</button>
                </div>

            </div>

            <img style={{ marginTop: "20px", width: "98%", borderRadius: "20px" }}
                src="https://framerusercontent.com/images/CDNP3QX8DV14r9QNpxxQYRDunY.png?scale-down-to=4096" alt="" />

            <div className="features">
                <h1>Features</h1>
                <div className="feature-one">
                    <div style={{ width: "70%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <div className="one-img-div">
                            <h3 style={{ marginTop: "0", textDecoration: "underline", textUnderlineOffset: "4px" }}>POSTS</h3>
                            <img src="/feed-posts-img.png" alt="" />
                        </div>
                        <p>Post your daily thoughts, share your moments, and connect with friends.</p>
                    </div>
                </div>

                <div className="feature-two">
                    <div style={{ width: "70%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <p>Auto-generated chatrooms based on the languages you speak and learn — instantly connect with people who vibe like you.</p>
                        <div className="two-img-div">
                            <h3 style={{ marginTop: "0", textDecoration: "underline", textUnderlineOffset: "4px" }}>CHATROOMS</h3>
                            <img src="/chatroom-img.png" alt="" />
                        </div>
                    </div>
                </div>

                <div className="feature-three">
                    <div style={{ width: "70%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <div className="three-img-div">
                            <h3 style={{ margin: "0", textDecoration: "underline", textUnderlineOffset: "4px" }}>CUSTOMISE PROFILE</h3>
                            <div style={{ margin: "10px", display: "flex" }}>
                                <img src="/update-profile-img1.png" alt="" />
                            </div>
                        </div>
                        <p>Customise your profile with a unique username, bio, and profile picture.</p>
                    </div>
                </div>
            </div>

            <Footer />

        </div >
    )
}

export default HomeNotLoggedIn