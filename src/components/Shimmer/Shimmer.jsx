import "../Home/Home.css"
import { useNavigate, Link } from "react-router-dom";

function ShimmerUI() {

    return (
        <div className="home-container">
            <div className="navbar">
                <div className="home-logo">
                    <img style={{ height: "64px", width: "64px", borderRadius: "50%", marginRight: "5px" }} src="/grey-img.png" alt="" />
                    <p style={{ marginTop: "8px", marginBottom: "0", width: "180px", background: "grey", borderRadius: "20px" }}></p>
                </div>
                <div className="nav-items">
                    <div style={{ background: "grey" }} className="nav-item">
                        <div style={{ height: "25px", width: "50px" }} className="nav-links"></div>
                    </div>
                    <div style={{ background: "grey" }} className="nav-item">
                        <div style={{ height: "25px" }} className="nav-links"></div>
                    </div>
                    <div style={{ background: "grey" }} className="nav-item">
                        <div style={{ height: "25px" }} className="nav-links"></div>
                    </div>
                </div>
            </div >
            <div className="section-two">
                <div style={{ height: "25px", borderBottom: "1px solid offwhite", background: "black" }}>

                </div>
                <div style={{ height: "200px", border: "1px solid white", margin: "5px" }}></div>
                <div style={{ height: "200px", border: "1px solid white", margin: "5px" }}></div>
                <div style={{ height: "200px", border: "1px solid white", margin: "5px" }}></div>
                <div style={{ height: "200px", border: "1px solid white", margin: "5px" }}></div>
                <div style={{ height: "200px", border: "1px solid white", margin: "5px" }}></div>
            </div>
            <div className="section-three">
                <div style={{ borderBottom: "1px solid white", paddingLeft: "5px" }}>
                    <button style={{ height: "30px", width: "65px", margin: "10px", padding: "5px 10px", cursor: "pointer" }}></button>
                </div>
                <div>
                    <div style={{ margin: "20px auto", borderRadius: "15px", height: "40px", width: "300px", background: "grey" }}></div>
                </div>
            </div>
        </div >
    )
}

export default ShimmerUI