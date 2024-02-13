import axios from "axios";
import authHeader from "../services/authHeader";

export default axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        "Access-Control-Allow-Origin": "*",
        // "Authorization" : authHeader()
    }
});