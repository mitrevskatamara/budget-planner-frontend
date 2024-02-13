import {Container, Navbar} from "react-bootstrap";
import logo from './img/logo.png';

const LogoNavBar = () => {
    return (
        <Navbar style={{backgroundColor: '#f0f0f0', height: '65px'}}>
            <Container>
                <Navbar.Brand href="/">
                    <img alt="logo" src={logo} style={{width: '48px'}}/> &nbsp;
                    Budget Planner
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default LogoNavBar;