import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import SocialLogin from "./SocialLogin";
import LoginForm from "./LoginForm";
import '../assets/css/login.css';

const Login = () => {

    return (
        <Container>
            <br/>
            <Row xs={3}>
                <Col>

                </Col>
                <Col>
                    <LoginForm/>
                </Col>
                <Col>

                </Col>
            </Row>
     </Container>
    );
};

export default Login;