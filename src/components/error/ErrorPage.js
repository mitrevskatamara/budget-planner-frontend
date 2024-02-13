import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../assets/css/errorPage.css';

const ErrorPage = () => {

    return (
        <Container className="centered-container">
            <div className="d-flex flex-column align-items-center">
                <h2>Oops...</h2>
                <h2 style={{ fontSize: '100px' }}>404</h2>
                <h2>Not found</h2>
                <br />
                <p>We can't seem to find the page you're looking for.</p>
                <Link to="/">Go back</Link>
            </div>
        </Container>
    )
};

export default ErrorPage;