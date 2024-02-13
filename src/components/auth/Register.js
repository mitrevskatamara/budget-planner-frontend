import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register, sendVerifyEmail} from "../../actions/authActions";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import '../assets/css/register.css';
import {SET_MESSAGE} from "../../actions/types";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmedPassword: ''
};

const Register = () => {
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(initialState);
    const auth = useSelector((state) => state.auth)

    const onChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
        if ( !!errors[event.target.name] ) setErrors({
            ...errors,
            [event.target.name]: null
        })
    };

    const registerUser = (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();

        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors)
        } else {
            dispatch(register(user));
        }
    };

    useEffect(() => {
        const emailSend = async () => {
            if (auth.validMessage) {
                await dispatch(sendVerifyEmail(user.email));
                dispatch({
                    type: SET_MESSAGE,
                });
                navigate("/verifyEmailSent/" + user.email);
            }
        };

        emailSend();
    }, [auth.validMessage, dispatch, navigate, user.email]);

    const findFormErrors = () => {
        const {firstName, lastName, email, username, password, confirmedPassword} = user;
        const newErrors = {};

        if (!firstName || firstName === '') newErrors.firstName = 'Please input your first name!'
        else if (!lastName || lastName === '') newErrors.lastName = 'Please input your last name!'
        else if (!email || email === '') newErrors.email = 'Please input your email!'
        else if (!username || username === '') newErrors.username = 'Please input your username!'
        else if (!password || password === '') newErrors.password = 'Please input your password'
        else if (password !== confirmedPassword) newErrors.confirmedPassword = 'Passwords do not match!'

        return newErrors;
    };

    return (
        <Container>
            <Form className="register-form">
                <h2 className="title-register-form">Create an account</h2>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" name="firstName" value={user.firstName} placeholder="Enter your first name" onChange={onChange} isInvalid={!!errors.firstName}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" name="lastName"  value={user.lastName} placeholder="Enter your last name" onChange={onChange} isInvalid={!!errors.lastName}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={user.email} placeholder="Enter your email" onChange={onChange} isInvalid={!!errors.email}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Enter your username" value={user.username} onChange={onChange}
                                      isInvalid={!!errors.username}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter your password" value={user.password} onChange={onChange} isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Confirmed password</Form.Label>
                        <Form.Control type="password" name="confirmedPassword" placeholder="Confirm your password" value={user.confirmedPassword}
                                      onChange={onChange} isInvalid={!!errors.confirmedPassword}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.confirmedPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    {
                        auth.message === 'Successful new user register!' ?
                            <div className="form-group" hidden={!auth.validMessage && auth.message === ''}>
                                <div className="alert alert-success" role="alert">
                                    {auth.message}
                                </div>
                            </div> :
                            <div className="form-group" hidden={!auth.validMessage && auth.message === ''}>
                                <div className="alert alert-danger" role="alert">
                                    {auth.message}
                                </div>
                            </div>
                    }
                </Row>
                <Row>
                    <Col>
                        <Button style={{width: '100%', marginTop: '10px'}} onClick={registerUser}>Register</Button>
                    </Col>
                </Row>
                <Row>
                    <div className="login-div">
                        Already have an account? <Link to="/login" className="login-link"> Login.</Link>
                    </div>
                </Row>
            </Form>
        </Container>
    )
}

export default Register;