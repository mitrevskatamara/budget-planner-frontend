import {Button, Container} from "react-bootstrap";
import '../assets/css/errorPage.css';
import {useParams} from "react-router-dom";
import {sendVerifyEmail} from "../../actions/authActions";
import {useDispatch} from "react-redux";
import success from '../img/success.png';

const VerifyEmailSent = () => {
    const dispatch = useDispatch();
    const {email} = useParams();

    const findByEmail = () => {
        dispatch(sendVerifyEmail(email));
        window.location.reload()
    }

    return (
        <Container>
            <div className="d-flex flex-column align-items-center">
                <img alt="success" src={success} style={{width: '150px'}}/>
                <h3>Successful registration!</h3>
                <hr/>
                <h4>The next step is to verify your email address.</h4>
                <h5>Email is sent to your <b>{email}</b>. Please, check your email address.</h5>
                <br/>
                <p>Just click on the link in the email to complete <b>verifying your email address</b>.
                    <br/> If you don't see it, you may need to <b>check your spam</b> folder.</p>
                <br/>
                <h6>Still can't find the email?</h6>
                <Button variant="outline-secondary" onClick={findByEmail}>Resend email</Button>
            </div>
        </Container>
    )
};

export default VerifyEmailSent;