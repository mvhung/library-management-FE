import axios from 'axios';
import authHeader from './auth.header.js';

const API_URL = 'http://localhost:8080/api/v1/users/';

const getUser = async () => {
    try {
        const response = await axios.get(API_URL + 'user-info', {
            headers: authHeader(),
        });
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};

const getUserById = async (id) => {
    try {
        const response = await axios.get(API_URL + id, {
            headers: authHeader(),
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};
const updateUser = async (id, user) => {
    try {
        const response = await axios.put(API_URL + id, user, {
            headers: authHeader(),
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};
const updateUserAvatar = async (id, avatar) => {
    let bodyFormData = new FormData();
    bodyFormData.append('avatarFile', avatar);
    try {
        axios({
            method: 'post',
            url: API_URL + 'update-avatar/' + id,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data', ...authHeader() },
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};
const UserService = {
    getUser,
    updateUser,
    getUserById,
    updateUserAvatar,
};

export default UserService;
