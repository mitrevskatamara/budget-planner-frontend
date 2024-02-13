import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SEND_EMAIL, SEND_EMAIL_FAIL, SET_MESSAGE, TOKEN_FALSE,
    VALIDATE_TOKEN
} from "../actions/types";

const initialState = {
    isSignedIn: false,
    user: '',
    roles: '',
    validMessage: false,
    validToken: false
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isSignedIn: true,
                user: payload.user,
                message: ''
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isSignedIn: false,
                user: '',
                validMessage: false,
                message: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                validMessage: true,
                message: payload,
                isLoggedIn: false
            };
        case REGISTER_FAIL:
            return {
                ...state,
                validMessage: false,
                message: payload,
                isLoggedIn: false,
            };
        case LOGOUT:
            return {
                ...state,
                isSignedIn: false,
                user: '',
                userId: null
            }
        case SEND_EMAIL:
            return {
                ...state,
                validMessage: true,
                message: payload
            }
        case SEND_EMAIL_FAIL:
            return {
                ...state,
                validMessage: false,
                message: payload
            }
        case VALIDATE_TOKEN :
            return {
                ...state,
                validToken: payload
            }
        case TOKEN_FALSE:
            return {
                ...state,
                validToken: false
            }
        case SET_MESSAGE :
            return {
                ...state,
                validMessage: false,
                message: ''
            }
        default:
            return state;
    }
};

export default authReducer;