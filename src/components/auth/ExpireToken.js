import {Alert, Button, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router";
import '../assets/css/forgotPassword.css'

const ExpireToken = () => {

    const navigate = useNavigate();

    const findByEmail = () => {
       navigate('/forgotPassword');
    }

    return (
        <Container className="d-flex justify-content-center align-items-center container-forgot-password">
            <Row style={{width: '550px'}}>
            <Alert variant="danger">
                <Alert.Heading><b>Your session is expired!</b></Alert.Heading>
                <p>
                    Do you want to resend new email for changing password?
                </p>
                <hr />
                <div className="d-flex justify-content-center">
                    <Button variant="outline-secondary" onClick={findByEmail}>Resend email</Button>
                </div>
            </Alert>
            </Row>
        </Container>
    )

}

export default ExpireToken;