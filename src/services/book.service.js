import axios from 'axios';
import authHeader from './auth.header.js';

const API_URL = 'http://localhost:8080/api/v1/book/';

const getBook = (bookId) => {
    return axios.get(API_URL + bookId, { headers: authHeader() });
};

const updateBook = (bookId) => {
    return axios.get(API_URL + bookId);
};
const createBook = (book) => {
    return axios.post(API_URL, book, { headers: authHeader() });
};
const updateBookImg = (img) => {
    let bodyFormData = new FormData();
    bodyFormData.append('bookImgLink', img);
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
// const getPublicContent = () => {
//     return axios.get(API_URL + 'all');
// };

// const getUserBoard = () => {
//     return axios.get(API_URL + 'user', { headers: authHeader() });
// };

// const getModeratorBoard = () => {
//     return axios.get(API_URL + 'mod', { headers: authHeader() });
// };

// const getAdminBoard = () => {
//     return axios.get(API_URL + 'admin', { headers: authHeader() });
// };

const BookService = {
    getBook,
    updateBook,
    createBook,
};

export default BookService;
