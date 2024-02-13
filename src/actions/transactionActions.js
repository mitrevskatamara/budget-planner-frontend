import axios from '../apis/axios';
import {
    CREATE_TRANSACTION,
    DELETE_TRANSACTION,
    FETCH_TRANSACTION,
    FETCH_TRANSACTIONS,
    FILTER_TRANSACTION,
    UPDATE_TRANSACTION
} from './types';

export const fetchTransactionsByUser = (filterDto) => async dispatch => {
    const response = await axios.post('/transactions/filterByUser', filterDto);
    dispatch({
        type: FETCH_TRANSACTIONS,
        payload: response.data
    });
};

export const fetchTransactions = () => async dispatch => {
    const response = await axios.get('/transactions');

    dispatch({
        type: FETCH_TRANSACTIONS,
        payload: response.data
    });
};

export const fetchTransaction = id => async dispatch => {
    const response = await axios.get(`/transactions/${id}`);

    dispatch({
        type: FETCH_TRANSACTION,
        payload: response.data
    })
};

export const createTransaction = (formValues) => (dispatch) => {
    axios.post('/transactions/add', formValues)
        .then((response) => {
            dispatch({
                type: CREATE_TRANSACTION,
                payload: response.data
            })
        });
};

export const updateTransaction = (id, formValues) => dispatch => {
    axios.post('/transactions/update/' + id, formValues)
        .then((response) => {
            dispatch({
                type: UPDATE_TRANSACTION,
                payload: response.data
            })
        });
};

export const deleteTransaction = (id) => dispatch => {
    axios.delete('/transactions/delete/' + id)
        .then((response) => {
        dispatch({
            type: DELETE_TRANSACTION,
            payload: response.data
        })
    })
};

export const filterByYearAndMonth = (filterDto) => async dispatch => {
    await axios.post('/transactions/filter', filterDto)
        .then((response) => {
        dispatch({
            type: FILTER_TRANSACTION,
            payload: response.data
        })
    });
}

export const filterByDate = (username, date) => async dispatch => {
    await axios.post('/transactions/filterByDate', {
        username: username,
        date: date
    })
        .then((response) => {
            dispatch({
                type: FILTER_TRANSACTION,
                payload: response.data
            })
        })
};