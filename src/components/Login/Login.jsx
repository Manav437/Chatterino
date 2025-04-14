import { use, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import "./Login.css"

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const auth = getAuth()

    const handleLogin = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("User logged in successfully:", user)
                localStorage.setItem("token", user.accessToken)
                navigate("/")
            })
            .catch((error) => {
                alert("Invalid email or password")
            })
    }

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
            <Link to="/"><img src="/mogul-moves-2.svg" style={{ position: "absolute", left: "20px", top: "20px", height: "100px" }} alt="" /></Link>
            <div className="login-div" style={{ borderRadius: "20px", padding: "20px", border: "3px solid #2C2C2C", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50%", gap: "20px" }}>
                <h1 style={{ margin: "0" }}>LOGIN</h1>
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", minWidth: "300px" }}>
                    <label style={{ display: "flex", flexDirection: "column" }}>
                        Email
                        <input type="email" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} style={{ height: "30px", padding: "5px", width: "95%", paddingLeft: "10px" }} placeholder="Enter your email" required />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column" }}>
                        Password
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginTop: "5px", padding: "5px", height: "30px", width: "95%", paddingLeft: "10px" }} placeholder="Enter your password" required />
                    </label>
                    <button className="login-btn" style={{
                        fontSize: "16px",
                        width: "100%",
                        margin: "0 auto",
                        height: "35px",
                        cursor: "pointer",
                        backgroundColor: "#67AE6E",
                        color: "white",
                        border: "none",
                        borderRadius: "4px"
                    }}>Log In</button>
                </form>
                <p>Don't have an account? <Link style={{ color: "#328E6E" }} to='/register'>SignUp</Link></p>
            </div>
        </div>
    )
}

export default LoginPage