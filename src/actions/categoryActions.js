import {CREATE_CATEGORY, DELETE_CATEGORY, FETCH_CATEGORIES, UPDATE_CATEGORY} from "./types";
import axios from "../apis/axios";

export const fetchCategories = () => async dispatch => {
    const response = await axios.get('/categories');
    dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data
    });
};

export const createCategory = (categoryDto) => async dispatch => {
    await axios.post('/categories/create', categoryDto)
        .then((response) => {
            dispatch({
                type: CREATE_CATEGORY,
                payload: response.data
            })
        });
};

export const updateCategory = (id, categoryDto) => async dispatch => {
    await axios.post('/categories/update/' + id, categoryDto)
        .then((response) => {
            dispatch({
                type: UPDATE_CATEGORY,
                payload: response.data
            })
        })
};

export const deleteCategory = (id) => async dispatch => {
    await axios.delete('/categories/delete/' + id)
        .then((response) => {
            dispatch({
                type: DELETE_CATEGORY,
                payload: response.data
            })
        })
};