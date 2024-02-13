import { CLEAR_MESSAGE } from "../actions/types";

const initialState = {};

const messageReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case CLEAR_MESSAGE:
            return {
                message: ''
            };

        default:
            return state;
    }
}

export default messageReducer;