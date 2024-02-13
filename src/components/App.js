import React, {useEffect} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {clearMessage} from "../actions/messageActions";
import {useLocation, useNavigate} from "react-router";
import frontPage from './img/home-page.png';
import '../app.css';

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = localStorage.getItem("user");
    const user = JSON.parse(currentUser);


    const cleanUpState = (dispatch) => {
        dispatch(clearMessage());
    };

    useEffect(() => {
        cleanUpState(dispatch);
        return () => {
            cleanUpState(dispatch);
        };
    }, [location, dispatch]);

    const onLoginClick = () => {
        navigate('/login');
    }

    const onRegisterClick = () => {
        navigate('/register');
    }

    return (
        <Container>
            <br/>
            {user ?
                (
                    <Row>
                        <Col>
                            <h2 className="text-center">
                                Welcome {user.firstName} {user.lastName} to your Personal Budget Planner!</h2>
                            <h3 className="text-center"> Let's start your financial journey...</h3>
                        </Col>
                    </Row>
                )
                :
                (
                    <Row>
                        <Col md={5} style={{marginTop: '230px', marginLeft: '120px'}}>
                            <p style={{fontSize: '30px'}} className="text-end">
                                Begin your financial journey with <b><br/>Budget Planner<br/></b> and take control of
                                your money <b>today</b>.
                            </p>
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button className="custom-button" onClick={onLoginClick}>Login</Button>&nbsp;
                                <Button className="custom-button-register" onClick={onRegisterClick} variant="dark">New? Create an account.</Button>
                            </div>
                        </Col>
                        <Col>
                            <img alt="frontPage" src={frontPage} style={{width: '530px', marginTop: '20px'}}/>
                        </Col>
                    </Row>
                )
            }
        </Container>
    );
};

export default App;