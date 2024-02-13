import axios from "../apis/axios";

export const getCurrency = (rate) => async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        await axios.post("https://budget-planner-backend-55c68a159767.herokuapp.com/api/rabbitMq/getRate", null, {
            params: {
                rate: rate,
                userId: user.id
            }
        })
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(new Error(error.response.data.message));
    }
}