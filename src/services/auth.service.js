import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth/authenticate/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'register', {
        name: username,
        email: email,
        password: password,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + 'authenticate', {
            email,
            password,
        })
        .then((response) => {
            if (response.data.email) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
    return axios.post(API_URL + 'signout').then((response) => {
        return response.data;
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
