import axios from "../apis/axios";
import {
    CREATE_BUDGET,
    DELETE_BUDGET,
    FETCH_BUDGET,
    FETCH_BUDGETS,
    FETCH_BUDGETS_FAIL,
    FILTER_BUDGET,
    UPDATE_BUDGET
} from "./types";

export const createBudget = (formValues) => dispatch => {
    axios.post('/budget/create', formValues)
        .then(response => {
            dispatch({
                type: CREATE_BUDGET,
                payload: response.data
            })
        });
};

export const fetchBudgets = () => async dispatch => {
    const response = await axios.get('/budget');
    dispatch({
        type: FETCH_BUDGETS,
        payload: response.data
    });
};

export const fetchBudgetsByUser = (filter) => async dispatch => {
    try {
        const response = await axios.post('/budget/filterByUser', filter);
        dispatch({
            type: FETCH_BUDGETS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_BUDGETS_FAIL
        })
    }
};

export const fetchBudget = (id) => async dispatch => {
    await axios.get('/budget/' + id)
        .then(response => dispatch({
                type: FETCH_BUDGET,
                payload: response.data
            })
        );
}

export const updateBudget = (id, formValues) => async dispatch => {
    await axios.post('/budget/update/' + id, formValues)
        .then((response) => {
            dispatch({
                type: UPDATE_BUDGET,
                payload: response.data
            })
        })
};

export const deleteBudget = (id) => async dispatch => {
    await axios.delete('/budget/delete/' + id)
        .then((response) => {
            dispatch({
                type: DELETE_BUDGET,
                payload: response.data
            })
        });
};

export const filterByMonthAndYear = (filterDto) => async dispatch => {
    await axios.post('/budget/filter', filterDto)
        .then((response) => {
        dispatch({
            type: FILTER_BUDGET,
            payload: response.data
        })
    })
};