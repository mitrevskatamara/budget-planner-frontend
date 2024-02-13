import {Button, Container, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setEmailVerified} from "../../actions/authActions";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {SET_MESSAGE} from "../../actions/types";
import {useNavigate} from "react-router";

const VerifyAccount = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const emailVerification = () => {
        dispatch(setEmailVerified(token));
    }

    const redirectToLogin = () => {
        navigate("/login");
    }

    const handleClose = () => {
        setShowModal(false);
        navigate("/login");
    }

    useEffect(() => {
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

    return (
        <Container className="d-flex flex-column align-items-center" style={{
            marginTop: '100px',
            width: '750px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '50px'
        }}>
            <Row>
                <h2><b>Verify your email address</b></h2>

            </Row>
            <Row style={{marginTop: '10px'}}>
                <h4 className="text-center">To start using Budget Planner, please verify your email address:</h4>
            </Row>
            <Row style={{marginTop: '15px'}}>
                <Button onClick={emailVerification}>Verify your account</Button>
            </Row>
            <Row>
                <Modal show={showModal} centered={true} animation={true} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <b>Your email is verified successfully!</b>
                    </Modal.Header>
                    <Modal.Body>
                        You can start using your Budget Planner account.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id="yesButton" className="custom-primary-button" onClick={redirectToLogin}>
                            Go to Login
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </Container>
    )
}

export default VerifyAccount;