import axios from "../apis/axios";
import {FETCH_ROLES} from "./types";

export const getAllRoles = () => async dispatch => {
    await axios.get('/roles')
        .then((response) => {
            dispatch({
                type: FETCH_ROLES,
                payload: response.data
            })
        })
}