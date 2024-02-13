import {Card, Col, Row} from "react-bootstrap";
import warningIcon from "../img/warning-icon.png";
import deleteIcon from "../img/delete-icon.png";
import React from "react";
import '../assets/css/notificationCard.css';
import {formatDate} from "../../helpers/formatDate";

const NotificationCard = (props) => {
    const notification = props.notification;

    function getNotificationIcon() {
        return notification.notificationType === 'LOW_BUDGET' ? warningIcon : deleteIcon;
    }

    return (
        <Card className="notification-card">
            <Row>
                <Col md={2}>
                    <Card.Img src={getNotificationIcon()} style={{width: '32px'}} />
                </Col>
                <Col md={8}>
                    <div className="notification-card-text">
                        {notification.read ? (
                            <span>{notification.content}</span>
                        ) : (
                            <b>{notification.content}</b>
                        )}
                        <p className="text-end">{formatDate(notification.date)}</p>
                    </div>
                </Col>
            </Row>
        </Card>
    )
}

export default NotificationCard;