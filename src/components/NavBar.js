import {Link} from "react-router-dom";
import {Container, Dropdown, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {logout} from "../actions/authActions";
import {useNavigate} from "react-router";
import notification from './img/notification-icon.png';
import NotificationBar from "./notification/NotificationBar";
import {useState} from "react";
import {getPaginatedNotifications, markAsReadNotification} from "../actions/notificationActions";
import '../components/assets/css/navBar.css';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(logout());
        navigate("/");
        window.location.reload();
    }

    const publicLinks = (
        <>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Link to="/register" className="navbar-brand">Register</Link>
                    <Link to="/login" className="navbar-brand">Login</Link>
                </Navbar.Text>
            </Navbar.Collapse>
        </>
    );

    let signedIn;
    let user = '';

    if (localStorage.getItem("user")) {
        const currentUser = localStorage.getItem("user");
        user = JSON.parse(currentUser);
        signedIn = true;
    } else {
        signedIn = false;
    }

    const checkRole = () => {
        if (user !== '') {
            return user.roles.some(a => a === 'ROLE_ADMIN');
        }
        return false;
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const onDropdownItemClick = (id) => {
        dispatch(markAsReadNotification(id))
        window.location.reload();
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        dispatch(getPaginatedNotifications(1,4))
    };

    const onLinkClicked = () => {
        setDropdownOpen(false);
    }

    const userLinks = (
        <>
            <Navbar.Collapse>
                <Navbar.Text>
                    <Link to="/budgets" className="navbar-brand">Budgets</Link>&nbsp;
                    <Link to="/transactions" className="navbar-brand">Transactions</Link>&nbsp;
                    <Link to="/statistics" className="navbar-brand">Statistics</Link>&nbsp;
                    <Link to="/converter" className="navbar-brand">Converter</Link>
                </Navbar.Text>
            </Navbar.Collapse>
            <Nav className="justify-content-end">
                <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                    <Dropdown.Toggle variant="outline-dark">
                        <img src={notification} alt="Notification" width="20px" height="20px"/>
                    </Dropdown.Toggle>
                    <NotificationBar onItemClicked={onDropdownItemClick} onLinkClicked={onLinkClicked}/>
                </Dropdown>
                &nbsp;
                <NavDropdown title={user.firstName + " " + user.lastName} id="collasible-nav-dropdown">
                    <NavDropdown.Item onClick={() => navigate("/user/" + user.username)}>
                        Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/admin")} hidden={!checkRole()}>
                        Admin Panel
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutUser}>
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </>
    )

    return (
        <Navbar style={{height: '44px'}} collapseOnSelect  bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                {signedIn ? userLinks : publicLinks}
            </Container>
        </Navbar>
    );
};

export default NavBar;