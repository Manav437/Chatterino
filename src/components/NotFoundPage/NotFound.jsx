import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="not-found-page">
            <h1 style={{ margin: "20px", fontSize: "100px" }}>😓</h1>
            <h1>404</h1>
            <h2>Page not found</h2>
            <p style={{ marginBottom: "0" }}>The page you are looking for doesn't exist or an error occured.</p>
            <p>Go back, or head over to <Link className="go-back" style={{ textDecoration: "underline", textUnderlineOffset: "2px" }} to="https://chatterino.onrender.com/"><strong>chatterino.onrender.com</strong></Link>  to choose a new direction.</p>
        </div>
    )
}


export default NotFoundPage;