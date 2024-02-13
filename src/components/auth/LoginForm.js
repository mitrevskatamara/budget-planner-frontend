import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {login} from "../../actions/authActions";
import '../assets/css/loginForm.css';
import {SET_MESSAGE} from "../../actions/types";

const initialState = {
    username: "",
    password: "",
};
const LoginForm = () => {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const credentialChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        if ( !!errors[event.target.name] ) setErrors({
            ...errors,
            [event.target.name]: null
        })
    };

    const validateUser = (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors)
        } else {
            dispatch(login(user.username, user.password));
        }
    };

    useEffect(() => {
        dispatch({
            type: SET_MESSAGE
        })
    }, [auth.validMessage])

    const findFormErrors = () => {
        const {username, password} = user;
        const newErrors = {};
        if (!username || username === '') newErrors.username = 'Please input your username!'
        else if (!password || password === '') newErrors.password = 'Please input your password!'

        return newErrors;
    };

    if (auth.isSignedIn) {
        navigate("/");
    }
    return (
        <Row style={{width: '400px'}} className="login-form">
            <h3 className="text-center">Login to your Budget Planner account</h3>
            <Col className="col-form">
                <Form>
                    <Form.Group>
                        <Form.Label>Username / Email</Form.Label>
                        <Form.Control
                            name="username"
                            value={user.username}
                            type="text"
                            placeholder="Enter your username or email"
                            onChange={credentialChange} isInvalid={!!errors.username}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            autoComplete="on"
                            value={user.password}
                            placeholder="Enter your password"
                            type="password"
                            onChange={credentialChange} isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br/>
                    <hr/>
                    <div className="form-group" hidden={!auth.validMessage && auth.message === ''}>
                        <div className="alert alert-danger" role="alert">
                            {auth.message}
                        </div>
                    </div>
                </Form>
                <Button className="login-button" onClick={validateUser} type="submit">Login</Button>
                <div className="text-center">
                    <Link className="forgot-password-link" to="/forgotPassword">Forgot password?</Link>
                </div>
            </Col>
        </Row>
    )
}

export default LoginForm;