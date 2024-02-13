import {
    CREATE_BUDGET,
    DELETE_BUDGET, ERROR_SET_FALSE,
    FETCH_BUDGET,
    FETCH_BUDGETS, FETCH_BUDGETS_FAIL,
    FILTER_BUDGET,
    UPDATE_BUDGET
} from "../actions/types";

const initialState = {
    budgets: [],
    budget: null,
    error: false
};

const budgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BUDGET:
            return {
                ...state,
                budgets: [...state.budgets, action.payload]
            };
        case FETCH_BUDGETS:
            return {
                ...state,
                budgets: action.payload
            };
        case FETCH_BUDGET: {
            return {
                ...state,
                budget: action.payload
            }
        }
        case UPDATE_BUDGET:
            return {
                ...state
            };
        case FILTER_BUDGET:
            return {
                ...state,
                budgets: action.payload
            }
        case DELETE_BUDGET:
            return {
                ...state,
                budgets: state.budgets.filter(b => b.id !== action.payload)
            }
        case FETCH_BUDGETS_FAIL:
            return {
                ...state,
                error: true
            }
        case ERROR_SET_FALSE:
            return {
                ...state,
                error: false
            }
        default: return state;
    }
};

export default budgetReducer;