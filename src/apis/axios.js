import axios from "axios";
import authHeader from "../services/authHeader";

export default axios.create({
    baseURL: 'https://budget-planner-backend-55c68a159767.herokuapp.com/api',
    headers: {
        "Access-Control-Allow-Origin": "*",
        // "Authorization" : authHeader()
    }
});