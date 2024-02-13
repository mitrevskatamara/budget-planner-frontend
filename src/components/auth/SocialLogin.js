import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../../utils";
import fbLogo from '../img/fb-logo.png';
import googleLogo from '../img/google-logo.png';
import githubLogo from '../img/github-logo.png';
import {Button, Col, Container, Row} from "react-bootstrap";
import '../assets/css/socialLogin.css';

const SocialLogin = () => {
    return (
        <Container>
            <Row style={{marginTop: '40px'}}>
                <Col xs={4} >
                    <Button className="buttons" href={GOOGLE_AUTH_URL}>
                        <img src={googleLogo} alt="Google" className="images"/> Log in with Google
                    </Button>
                    <Button className="buttons" href={FACEBOOK_AUTH_URL}>
                        <img src={fbLogo} alt="Facebook" className="images"/> Log in with Facebook
                    </Button>
                    <Button className="buttons" href={GITHUB_AUTH_URL}>
                        <img src={githubLogo} alt="Github" className="images"/> Log in with Github
                    </Button>
                    <p className="new-account">
                        <br/>
                        New to Budget Planner?
                        <a href="/register" className="link"> Create an account.</a>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default SocialLogin;