import axios from "../apis/axios";
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SEND_EMAIL, SEND_EMAIL_FAIL, VALIDATE_TOKEN
} from "./types";
import AuthService from "../services/authService";

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(

        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data.user },
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response.status === 400) {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: 'Bad credentials'
                });
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: error.response.data.message
                });
            }
            return Promise.reject();
        }
    );
};

export const register = (formValues) => (dispatch) => {
    return AuthService.register(formValues).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data.message
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.message
            });

            return Promise.reject();
        }
    );
};

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });

    return AuthService.logout();
};

export const sendEmail = (email) => async dispatch => {
    try {
        const response = await AuthService.sendEmail(email);

        dispatch({
            type: SEND_EMAIL,
            payload: response.data.message,
        });

        return Promise.resolve();
    } catch (error) {
        dispatch({
            type: SEND_EMAIL_FAIL,
            payload: error.response.data.message
        });

        return Promise.reject(new Error(error.response.data.message));
    }
}

export const changePassword = (token, password) => async dispatch => {
    await axios.post('/keycloak/updatePassword', null, {
        params: {
            token: token,
            username: password
        }
    });
    dispatch({
        type: SEND_EMAIL,
        payload: 'Your password is changed successfully!',
    });
    return Promise.resolve();
}

export const checkToken = (token) => async dispatch => {
    return axios.post('/keycloak/validateToken', null, {
        params: {
            token: token
        }
    }).then((response) => {
        dispatch({
            type: VALIDATE_TOKEN,
            payload: response.data
        })

    });
}

export const setEmailVerified = (token) => async dispatch => {
    return axios.post('/keycloak/setEmailVerified', null, {
        params: {
            token: token
        }
    }).then((response) => {
        dispatch({
            type: SEND_EMAIL,
            payload: 'Your email is verified successfully!',
        })
    })
}

export const sendVerifyEmail = (email) => async dispatch => {
    return axios.post('/keycloak/sendVerifyEmail', null, {
        params: {
            email: email
        }
    }).then((response) => {
        dispatch({
            type: SEND_EMAIL,
            payload: 'Your email is verified successfully!',
        })
    })
}

export const sendVerifyEmailAgain = (token) => async dispatch => {
    return axios.post('/keycloak/sendVerifyEmailAgain', null, {
        params: {
            token: token
        }
    })
}