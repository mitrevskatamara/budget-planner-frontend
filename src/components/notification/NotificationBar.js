import React, {useEffect} from 'react';
import {Dropdown} from 'react-bootstrap';
import {getStompClient} from "../../ws/stopmClient";
import NotificationCard from "./NotificationCard";
import '../assets/css/notificationBar.css';
import {useDispatch, useSelector} from "react-redux";
import {getPaginatedNotifications} from "../../actions/notificationActions";
import {Link} from "react-router-dom";

const NotificationBar = ({ onItemClicked, onLinkClicked }) => {
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notification);

    useEffect(() => {
        const stompClient = getStompClient();

        stompClient.connect({}, () => {
            console.log('WebSocket connected');

            stompClient.subscribe('/topic/notification', (frame) => {
                const receivedMessage = JSON.parse(frame.body);
                const user = JSON.parse(localStorage.getItem('user'));

                if (user.id.toString() === receivedMessage.userId) {
                    console.log(receivedMessage)
                    dispatch(getPaginatedNotifications(1, 4));
                }
            });
        });

        return () => {
            stompClient.disconnect();
            console.log('WebSocket disconnected');
        };

    }, []);

    return (
        <Dropdown.Menu className="custom-dropdown-menu"
                       style={{height: '460px', width: '270px', backgroundColor: '#f0f0f0'}} align={{lg: 'end'}}>
            <Dropdown.Header className="text-center" style={{height: '45px'}}>
                <h5><b>Notifications</b></h5>
                <Dropdown.Divider/>
            </Dropdown.Header>
            {notification.notifications.slice(0, 4).map((n, index) => (
                <Dropdown.Item key={index} onClick={() => onItemClicked(n.id)}>
                    <NotificationCard notification={n}/>
                    <Dropdown.Divider/>
                </Dropdown.Item>
            ))}
            <div className="d-flex justify-content-center">
                <Link onClick={() => onLinkClicked()} to="/notifications" style={{textDecoration: 'none', fontSize: '14px'}} className="text-center">
                    View your notifications list
                </Link>
            </div>
        </Dropdown.Menu>
    );
};

export default NotificationBar;