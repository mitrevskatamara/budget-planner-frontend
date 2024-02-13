import axios from "../apis/axios";
import {GET_STATISTICS_BY_CATEGORY, GET_STATISTICS_BY_YEAR, GET_STATISTICS_FOR_INCOMES_BY_CATEGORY} from "./types";

export const getStatisticsByYear = (year) => async dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    const filterDto = {
        year : year,
        username: user.username
    }
    await axios.post('/statistics/byYear', filterDto)
        .then((response) => {
            dispatch({
                type: GET_STATISTICS_BY_YEAR,
                payload: response.data
            })
        });
};

export const getStatisticsByCategory = (statisticsDto) => async dispatch => {
    await axios.post('/statistics/byCategory', statisticsDto)
        .then((response) => {
            dispatch({
                type: GET_STATISTICS_BY_CATEGORY,
                payload: response.data
            })
        });
};

export const getStatisticsForIncomesByCategory = (statisticsDto) => async dispatch => {
    await axios.post('/statistics/incomesByCategory', statisticsDto)
        .then((response) => {
            dispatch({
                type: GET_STATISTICS_FOR_INCOMES_BY_CATEGORY,
                payload: response.data
            })
        });
};