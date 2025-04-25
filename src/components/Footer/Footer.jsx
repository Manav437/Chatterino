import "./Footer.css"

function Footer() {
    return (
        <div style={{ display: "flex", flexDirection: "column", borderTop: "2px solid #2C2C2C" }}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px" }}>
                <div className="footer-links" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flexDirection: "column", paddingLeft: "20px" }} >
                    <p style={{ marginBottom: "20px" }}><strong>SOCIALS</strong></p>
                    <p><a target="_blank" href="https://www.instagram.com/_man.av/">Insta</a></p>
                    <p><a target="_blank" href="https://www.linkedin.com/in/manav-gusain/">Linked In</a></p>
                    <p><a target="_blank" href="https://x.com/Manav437">X</a></p>
                    <p><a target="_blank" href="https://in.pinterest.com/elite_like_that/">Pinterest</a></p>
                </div>

                <div className="footer-links" style={{ display: "flex", flexDirection: "column" }}>
                    <p style={{ marginBottom: "20px" }}><strong>ABOUT</strong></p>
                    <p><a href="">Our story</a></p>
                    <p><a href="">Terms & Conditions</a></p>
                    <p><a href="">Privacy Policy</a></p>
                    <p><a href="">Cookie Policy</a></p>
                </div>

                <div className="footer-links" style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingRight: "20px" }}>
                    <p style={{ marginBottom: "20px" }}><strong>HELP</strong></p>
                    <p><a href="">FAQs</a></p>
                    <p><a href="">Contact</a></p>
                </div>
            </div>

            <div className="marquee" style={{ margin: "20px", paddingTop: "20px", borderTop: "2px solid #2C2C2C" }}>
                <div className="marquee-content">
                    <h1 className="h1-one">CHATTERINO</h1>
                    <h1 className="h1-two">CHATTERINO</h1>
                    <h1 className="h1-three">CHATTERINO</h1>
                    <h1 className="h1-four">CHATTERINO</h1>
                    <h1 className="h1-one">CHATTERINO</h1>
                    <h1 className="h1-two">CHATTERINO</h1>
                    <h1 className="h1-three">CHATTERINO</h1>
                    <h1 className="h1-four">CHATTERINO</h1>
                </div>
            </div>

        </div>
    )
}

export default Footer;