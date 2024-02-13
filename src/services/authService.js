import axios from "axios";

const AUTH_URL = "https://budget-planner-backend-55c68a159767.herokuapp.com/api/auth/";
const KEYCLOAK_URL = "https://budget-planner-backend-55c68a159767.herokuapp.com/api/keycloak/";

class AuthService {
    login(username, password) {
        return axios
            .post(AUTH_URL + "login", { username, password })
            .then((response) => {
                if (response.data.accessTokenResponse.access_token) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    localStorage.setItem("token", JSON.stringify(response.data.accessTokenResponse.access_token));
                }

                return response.data;
            });
    }

    logout() {
        return axios.post(AUTH_URL + "logout").then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        });

    }

    register(formValues) {
        return axios.post(AUTH_URL + "register", formValues);
    }

    sendEmail(email) {
        return axios.post(KEYCLOAK_URL + "sendEmail", null, {
            params: {
                email: email
            }
        });
    }
}

export default new AuthService();