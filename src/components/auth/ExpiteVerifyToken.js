import {Alert, Button, Container, Modal, Row} from "react-bootstrap";
import {useNavigate} from "react-router";
import '../assets/css/forgotPassword.css'
import {useDispatch} from "react-redux";
import {sendVerifyEmailAgain} from "../../actions/authActions";
import {useState} from "react";

const ExpireVerifyToken = (props) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setShowModal(false);
        navigate("/");
    }

    const resendEmail = () => {
        dispatch(sendVerifyEmailAgain(props.token))
        setTimeout(() => {
            setShowModal(true);
        }, 2000)
    }

    return (
        <Container className="d-flex justify-content-center align-items-center container-forgot-password">
            <Row style={{width: '550px'}}>
                <Alert variant="danger">
                    <Alert.Heading><b>Your session is expired!</b></Alert.Heading>
                    <p>
                        Click on the button to resend you a new email for email verification.
                    </p>
                    <hr/>
                    <div className="d-flex justify-content-center">
                        <Button variant="outline-secondary" onClick={resendEmail}>Resend email</Button>
                    </div>
                </Alert>
            </Row>
            <Row>
                <Modal show={showModal} centered={true} animation={true} onHide={handleClose}>
                    <Modal.Body closeButton>
                        Email is sent to your email address. Please check your inbox.
                    </Modal.Body>
                </Modal>
            </Row>
        </Container>
    )

}

export default ExpireVerifyToken;