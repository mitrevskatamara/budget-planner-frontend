import {Container, Pagination} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteNotification, getPaginatedNotifications, markAsReadNotification} from "../../actions/notificationActions";
import '../assets/css/notificationList.css';
import DeleteNotificationModal from "../modal/DeleteNotificatiobModal";
import NotificationCardList from "./NotificationCardList";

const NotificationList = () => {
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notification);
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 4;

    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = notification.notifications.slice(indexOfFirstNotification, indexOfLastNotification);

    const totalPages = Math.ceil(notification.notifications.length / notificationsPerPage);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNotificationId, setSelectedNotificationId] = useState(null);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        dispatch(getPaginatedNotifications(1,10));
    }, []);

    const onDeleteItemClick = (id) => {
        setSelectedNotificationId(id);
        setShowDeleteModal(true);
    };

    const onCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const onDeleteClick = () => {
        dispatch(deleteNotification(selectedNotificationId));
        setShowDeleteModal(false);
        window.location.reload();
    };

    const onMarkAsReadClick = (id) => {
        dispatch(markAsReadNotification(id));
        window.location.reload();
    }

    return (
        <Container style={{ height: '700px', marginTop: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3>Notification list</h3>
                {currentNotifications.map((n, index) => (
                    <NotificationCardList key={index} notification={n} onDeleteItemClick={() => onDeleteItemClick(n.id)}
                                        onMarkAsReadClick={() => onMarkAsReadClick(n.id)}  />

                ))}
                <DeleteNotificationModal show={showDeleteModal} onClose={onCloseDeleteModal} onDeleteClick={onDeleteClick}/>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination className="react-bootstrap-table-pagination .page-item.active .page-link">
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        </Container>
    );
}

export default NotificationList;