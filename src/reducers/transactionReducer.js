import {
    FETCH_TRANSACTIONS,
    FETCH_TRANSACTION,
    CREATE_TRANSACTION,
    DELETE_TRANSACTION,
    FILTER_TRANSACTION,
    UPDATE_TRANSACTION
} from "../actions/types";

const initialState = {
    transactions: []
};

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            };
        case FETCH_TRANSACTION:
            return {
                ...state,
                transaction: action.payload
            };
        case CREATE_TRANSACTION:
            return {
               ...state,
                transactions: [...state.transactions, action.payload]
            }
        case DELETE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(t => t.id !== action.payload)
            }
        case FILTER_TRANSACTION:
            return {
            ...state,
            transactions: action.payload
        }
        case UPDATE_TRANSACTION:
            return {
                ...state
            };
        default: return state;
    };
};

export default transactionReducer;