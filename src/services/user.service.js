import axios from 'axios';
import authHeader from './auth.header.js';

const API_URL = 'http://localhost:8080/api/v1/users/user-info';

const getUser = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: authHeader(),
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};

const UserService = {
    getUser,
};

export default UserService;
