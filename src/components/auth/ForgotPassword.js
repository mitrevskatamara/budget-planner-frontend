import {Button, Card, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router";
import '../assets/css/forgotPassword.css';
import {useDispatch, useSelector} from "react-redux";
import {sendEmail} from "../../actions/authActions";
import React, {useEffect, useState} from "react";
import {SET_MESSAGE} from "../../actions/types";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const auth = useSelector(state => state.auth)

    const findByEmail = () => {
        dispatch(sendEmail(email));
    }

    useEffect(() => {
        if (auth.validMessage) {
            navigate("/emailSent/" + email);
            dispatch({
                type: SET_MESSAGE
            })
        }

    }, [auth])

    return (
        <Container className="d-flex justify-content-center align-items-center container-forgot-password">
            <Card className="card-forgot-password">
                <Card.Header><b>Reset your password</b></Card.Header>
                <Card.Body>
                    Please enter your email address. We'll send you a link to reset your password.
                    <Form>
                        <Form.Group style={{marginTop: '10px', marginBottom: '10px'}}>
                            <Form.Control
                                name="email"
                                value={email}
                                type="text"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)} isInvalid={!!auth.message}/>
                            <Form.Control.Feedback type='invalid'>
                                {auth.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <Button onClick={() => navigate("/login")} variant="outline-secondary">Back</Button>&nbsp;
                    <Button onClick={findByEmail}>Send email</Button>
                </Card.Body>
            </Card>
        </Container>
    )
};

export default ForgotPassword;