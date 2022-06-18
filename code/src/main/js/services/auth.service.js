import axios from "axios";

const API_URL = "./api/auth/";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, deliveryAddress, phoneNumber) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password,
            deliveryAddress,
            phoneNumber
        });
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            const decodedJwt = parseJwt(userObj.accessToken);

            if (decodedJwt.exp * 1000 < Date.now()) {
                this.logout();
                return null;
            } else {
                return userObj;
            }
        } else
            return null;
    }
}

export default new AuthService();
