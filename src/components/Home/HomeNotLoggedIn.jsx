import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../Footer/Footer"

function HomeNotLoggedIn() {

    useEffect(() => {
        AOS.init({
            duration: 1000,  // Animation duration
            once: true,       // Run animation only once
        });
    }, []);

    const navigate = useNavigate()
    return (
        <div className="home-not-logged-in" data-aos="slide-up" data-aos-duration="1200">
            <div className="not-logged-navbar">
                <div className="navbar-one">
                    <h3 className="h3-one" >mnv</h3>
                    <h3 className="h3-two" >gsn</h3>
                </div>

                <img src="/mogul-moves-3.svg" alt="" data-aos="zoom-in" data-aos-easing="ease-out-bounce" data-aos-duration="1500" />

                <div className="navbar-two">
                    <h3 className="h3-three">April</h3>
                    <h3 className="h3-four">2025</h3>
                </div>
            </div>


            <h1 className="home-header" data-aos="fade-zoom-in" data-aos-duration="2000">CHATTERINO</h1>
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

            <img className="not-login-img"
                src="https://framerusercontent.com/images/CDNP3QX8DV14r9QNpxxQYRDunY.png?scale-down-to=4096" alt="" />

            <div className="features">
                <h1 style={{ letterSpacing: "1.5px", fontSize: "3rem" }}>Features</h1>
                <div className="feature-one">
                    <div style={{ paddingBottom: "20px", borderBottom: "3px dashed #2C2C2C", width: "90%", display: "flex", flexDirection: "row", alignItems: "center" }} data-aos="fade-up">
                        <img style={{ border: "1px solid white", height: "50vh", borderRadius: "20px", width: "45%" }} src="/feed-posts-img.png" alt="" />

                        <div style={{ height: "70%", display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "55%" }}>
                            <h3 style={{ textAlign: "start", fontSize: "2rem", margin: "0 auto", width: "80%", marginTop: "0", textDecoration: "underline", textUnderlineOffset: "4px" }}>POSTS</h3>
                            <p style={{ textAlign: "start", margin: "20px auto", width: "80%" }} data-aos="fade-up">Share your thoughts, express yourself freely,
                                and let your voice be heard. Whether it's a quick update, a memorable photo, or a
                                heartfelt story, every post is a chance to connect. Capture life’s moments —
                                big or small — and stay closer to friends, family, and your community,
                                every single day. Inspire, engage, and be part of conversations that matter.</p>
                        </div>
                    </div>

                </div>

                <div className="feature-two">
                    <div style={{ paddingBottom: "20px", borderBottom: "3px dashed #2C2C2C", width: "90%", display: "flex", flexDirection: "row", alignItems: "center" }} data-aos="fade-up">
                        <div style={{ height: "70%", display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "55%" }}>
                            <h3 style={{ textAlign: "end", fontSize: "2rem", margin: "0 auto", width: "80%", textDecoration: "underline", textUnderlineOffset: "4px" }}>CHATROOMS</h3>
                            <p style={{ textAlign: "end", margin: "20px auto", width: "80%" }} data-aos="fade-up">Auto-generated chatrooms tailored to the languages
                                you speak and learn — instantly connect with people who share your passions and
                                vibe with your journey. Practice, make friends, and exchange cultures in real time.
                                Every conversation brings you closer to fluency and meaningful connections, all in
                                a space designed just for you.</p>
                        </div>

                        <img style={{ border: "1px solid white", height: "50vh", width: "45%", borderRadius: "20px" }} src="/chatroom-img.png" alt="" />
                    </div>
                </div>

                <div className="feature-three">
                    <div style={{ width: "90%", display: "flex", flexDirection: "row", alignItems: "center" }} data-aos="fade-up">
                        <img style={{ border: "1px solid white", height: "50vh", width: "45%", borderRadius: "20px" }} src="/update-profile.png" alt="" />

                        <div style={{ height: "60%", display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "55%" }}>
                            <h3 style={{ textAlign: "start", fontSize: "2rem", margin: "0 auto", width: "80%", textDecoration: "underline", textUnderlineOffset: "4px" }}>CUSTOMISE PROFILE</h3>
                            <p style={{ textAlign: "start", margin: "20px auto", width: "80%", }} data-aos="fade-up">Make it yours. Customize your profile with
                                a unique username, a bio that tells your story, and a profile picture that shows the
                                real you. Let your personality shine and give others a
                                glimpse into who you are, all in one place.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div >
    )
}

export default HomeNotLoggedIn