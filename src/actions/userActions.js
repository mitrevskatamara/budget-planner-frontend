import axios from "../apis/axios";
import {CHANGE_USER_ROLE, DELETE_USER, FETCH_USERS} from "./types";

export const fetchUsers = () => async dispatch => {
    await axios.get('/users')
        .then((response) => {
            dispatch({
                type: FETCH_USERS,
                payload: response.data
            })
        });
};

export const changeProfileStatus = (id) => async dispatch => {
    await axios.post('/users/status/' + id)
        .then((response) => {
            dispatch({
                type: DELETE_USER,
                payload: response.data
            })
        });
};

export const changeUserRole = (userId, roleName) => async dispatch => {
    await axios.post('/users/role', {
        userId: userId,
        roleName: roleName
    }).then((response) => {
            dispatch({
                type: CHANGE_USER_ROLE,
                payload: response.data
            })
        })
};