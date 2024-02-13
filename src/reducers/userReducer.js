import {CHANGE_USER_ROLE, DELETE_USER, FETCH_USERS} from "../actions/types";

const initialState = {
    users: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
               ...state,
                users: action.payload
            }
        case DELETE_USER: {
            const index = state.users.findIndex(u => u.id === action.payload.id);
            const arrayWithUsers = [...state.users];
            arrayWithUsers[index] = action.payload;
            return {
                ...state,
                users: arrayWithUsers
            }
        }
        case CHANGE_USER_ROLE: {
            const index = state.users.findIndex(u => u.id === action.payload.id);
            const arrayWithUsers = [...state.users];
            arrayWithUsers[index] = action.payload;
            return {
                ...state,
                users: arrayWithUsers
            }
        }
        default:
            return state;
    }
};

export default userReducer;