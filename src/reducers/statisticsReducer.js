import {
    GET_STATISTICS_BY_CATEGORY,
    GET_STATISTICS_BY_YEAR, GET_STATISTICS_FOR_INCOMES_BY_CATEGORY
} from "../actions/types";

const initialState = {
    statisticsByYear: '',
    statisticsByCategory: '',
    statisticsForIncomesByCategory: ''
};

const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATISTICS_BY_YEAR:
            return {
                ...state,
                statisticsByYear: action.payload
            }
        case GET_STATISTICS_BY_CATEGORY:
            return {
                ...state,
                statisticsByCategory: action.payload
            };
        case GET_STATISTICS_FOR_INCOMES_BY_CATEGORY:
            return {
                ...state,
                statisticsForIncomesByCategory: action.payload
            }

        default: return state;
    }
};

export default statisticsReducer;