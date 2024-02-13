import {DELETE_NOTIFICATION, FETCH_NOTIFICATIONS, MARK_AS_READ} from "../actions/types";

const initialState = {
    notifications: []
};
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        case MARK_AS_READ:
            return {
                ...state,
                notifications: state.notifications.filter(n => n.id !== action.payload)
            }
        case DELETE_NOTIFICATION:
            return {
                ...state
            }
        default: return state;
    }

};

export default notificationReducer;