import React from 'react';
import {formatDate} from "../../helpers/formatDate";
import warningIcon from "../img/warning-icon.png";
import deleteIcon from "../img/delete-icon.png";
import {Card, Col, Dropdown, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import threeDotsIcon from "../img/three-dots-icon.png";

const NotificationCardList = ({ notification, onDeleteItemClick, onMarkAsReadClick }) => {

    function getNotificationIcon() {
        return notification.notificationType === 'LOW_BUDGET' ? warningIcon : deleteIcon;
    }

    return (
        <Card style={{ width: '600px', marginBottom: '10px' }}>
            <Row>
                <Col md={2}>
                    <Card.Img src={getNotificationIcon()} style={{ width: '40px', margin: '10px' }} />
                </Col>
                <Col style={{ margin: '10px' }}>
                    <Card.Text>
                        <Row>
                            <Col>
                                {notification.read ? (
                                    <>
                                        {notification.content}
                                    </>
                                ) : (
                                    <b>{notification.content}</b>
                                )}
                            </Col>
                            <Col xs={1} style={{ marginRight: '20px' }}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-light" id={`dropdown-${notification.id}`}>
                                        <img alt="threeDotsIcon" src={threeDotsIcon} style={{ width: '20px' }} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="no-arrow" align={{ lg: 'start' }}>
                                        {notification.read ? (
                                            <>
                                                <Dropdown.Item onClick={() => onMarkAsReadClick(notification.id)}>Mark as unread</Dropdown.Item>
                                            </>
                                        ) : (
                                            <>
                                                <Dropdown.Item onClick={() => onMarkAsReadClick(notification.id)}>Mark as read</Dropdown.Item>
                                            </>
                                        )}
                                        <Dropdown.Item onClick={() => onDeleteItemClick(notification.id)}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={8}>
                                <Link to="/budgets">Check your budget status...</Link>
                            </Col>
                            <Col>
                                <span className="text-end">{formatDate(notification.date)}</span>
                            </Col>
                        </Row>
                    </Card.Text>
                </Col>
            </Row>
        </Card>
    );
}

export default NotificationCardList;
