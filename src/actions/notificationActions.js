import axiosNotificationService from "../apis/axiosNotificationService";
import {DELETE_NOTIFICATION, FETCH_NOTIFICATIONS, MARK_AS_READ} from "./types";

export const getPaginatedNotifications = (page, pageSize) => async dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axiosNotificationService.get('/notifications/getPaginatedNotifications', {
        params: {
            page: page,
            pageSize: pageSize,
            userId: user.id
        }
    })

    dispatch({
        type: FETCH_NOTIFICATIONS,
        payload: response.data
    })
};

export const getAllNotifications = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axiosNotificationService.get('/notifications/getAllNotifications', {
        params: {
            userId: user.id
        }
    });

    dispatch({
        type: FETCH_NOTIFICATIONS,
        payload: response.data
    })
}

export const markAsReadNotification = (id)  => (dispatch) => {
    axiosNotificationService.post('/notifications/markAsRead', null, {
        params: {
            id: id
        }
    }).then(() => {
        dispatch({
            type: MARK_AS_READ
        })
    })
}

export const deleteNotification = (id) => dispatch => {
    axiosNotificationService.delete('/notifications/delete', {
        params: {
            id: id
        }
    }).then((response) => {
        dispatch({
            type: DELETE_NOTIFICATION,
            payload: response.data
        })
    })
}