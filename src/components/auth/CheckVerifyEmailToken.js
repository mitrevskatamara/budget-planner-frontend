import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {checkToken} from "../../actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import VerifyAccount from "./VerifyAccount";
import ExpireVerifyToken from "./ExpiteVerifyToken";

const CheckVerifyEmailToken = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(checkToken(token));
    }, []);

    return (
        <Container>
            {auth.validToken ? <VerifyAccount/> : <ExpireVerifyToken token={token}/>}
        </Container>
    )
}


export default CheckVerifyEmailToken;