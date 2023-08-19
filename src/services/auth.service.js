import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'register', {
        username: username,
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
            if (response.data.token) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
            }

            return response.data.token;
        });
};

const logout = () => {
    return axios.post(API_URL + 'logout').then((response) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return response.data;
    });
};

// const getCurrentUser = () => {
//     return JSON.parse(localStorage.getItem('token'));
// };

const AuthService = {
    register,
    login,
    logout,
    // getCurrentUser,
};

export default AuthService;
