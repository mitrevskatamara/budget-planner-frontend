import { CLEAR_MESSAGE } from "./types";


export const clearMessage = () => async dispatch => (
    dispatch({
        type: CLEAR_MESSAGE,
    })
);