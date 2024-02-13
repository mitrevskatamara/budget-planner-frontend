import axios from "../apis/axios";

export const getCurrency = (rate) => async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        await axios.post("http://localhost:8081/api/rabbitMq/getRate", null, {
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