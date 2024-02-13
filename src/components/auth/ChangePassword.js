import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import '../assets/css/changePassword.css';
import {useLocation} from "react-router-dom";
import {changePassword} from "../../actions/authActions";
import {SET_MESSAGE} from "../../actions/types";
import {useNavigate} from "react-router";

const initialState = {
    password: '',
    confirmedPassword: ''
};

const ChangePassword = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(initialState);

    useEffect(() => {
        console.log(auth)
        if (auth.validMessage) {
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false)
                navigate("/login")
            }, 5000)
            dispatch({
                type: SET_MESSAGE
            })
        }
    }, [auth])


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

    const onClickChangePassword = (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();

        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors)
        } else {
            dispatch(changePassword(token, user.password));
        }
    };

    const findFormErrors = () => {
        const {password, confirmedPassword} = user;
        const newErrors = {};

        if (!password || password === '') newErrors.password = 'Please input your password'
        else if (password !== confirmedPassword) newErrors.confirmedPassword = 'Passwords do not match!'

        return newErrors;
    };

    const redirectToLogin = () => {
        navigate("/login");
    }

    const handleClose = () => {
        setShowModal(false);
        navigate("/login");
    }

    return (
        <Container style={{
            marginTop: '30px',
            height: '380px',
            width: '500px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '50px'
        }}>
            <Form>
                <h2 className="text-center" style={{marginBottom: '20px'}}>Change your password</h2>
                <Row>
                    <Form.Group>
                        <Form.Label>New password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter your password here" value={user.password} onChange={onChange} isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Confirmed password</Form.Label>
                        <Form.Control type="password" name="confirmedPassword" placeholder="Confirm your password here" value={user.confirmedPassword}
                                      onChange={onChange} isInvalid={!!errors.confirmedPassword}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.confirmedPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Modal show={showModal} centered={true} animation={true} onHide={handleClose}>
                        <Modal.Header closeButton>
                            Your password is changed successfully!
                        </Modal.Header>
                        <Modal.Footer>
                            <Button id="yesButton" className="custom-primary-button" onClick={redirectToLogin}>
                                Go to Login
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
                <Row>
                    <Col>
                        <Button style={{width: '100%', marginTop:'20px'}} onClick={onClickChangePassword}>Change password</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default ChangePassword;