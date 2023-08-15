import axios from 'axios';
// import authHeader from './auth.header.js';

const API_URL = 'http://localhost:8080/api/v1/users/user-info';

const getUser = () => {
    return axios
        .get('http://localhost:8080/api/v1/users/user-info', {
            headers: {
                // Accept: 'application/json,plain/text,*/*',
                'Access-Control-Allow-Origin': '*',
                // 'Content-type': 'Application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error fetching current user:', error);
            return null;
        });
};

const UserService = {
    getUser,
};

export default UserService;
