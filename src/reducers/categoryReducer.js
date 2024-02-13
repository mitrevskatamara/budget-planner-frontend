import {CREATE_CATEGORY, DELETE_CATEGORY, FETCH_CATEGORIES, UPDATE_CATEGORY} from "../actions/types";

const initialState = {
    categories: []
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case CREATE_CATEGORY: {
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        }
        case UPDATE_CATEGORY: {
            return {
                ...state
            };
        }
        case DELETE_CATEGORY: {
            return {
                ...state,
                categories: state.categories.filter(c => c.id !== action.payload)
            }
        }
        default: return state;
    };
};

export default categoryReducer;