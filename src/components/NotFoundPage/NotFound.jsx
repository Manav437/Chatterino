function NotFoundPage() {
    return (
        <div>
            <h1 style={{ margin: "20px", fontSize: "100px" }}>😓</h1>
            <h1>404</h1>
            <h2>Page not found</h2>
            <p style={{ marginBottom: "0" }}>The page you are looking for doesn't exist or an error occured.</p>
            <p>Go back, or head over to <a style={{ color: "grey", textDecoration: "underline", textUnderlineOffset: "2px" }} href="https://chatterino.onrender.com/"><strong>chatterino.onrender.com</strong></a>  to choose a new direction.</p>
        </div>
    )
}


export default NotFoundPage;