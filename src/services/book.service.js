import axios from 'axios';
import authHeader from './auth.header.js';

const API_URL = 'http://localhost:8080/api/v1/book/';

const getBook = (bookId) => {
    return axios.get(API_URL + bookId, { headers: authHeader() });
};

const updateBook = (bookId) => {
    return axios.get(API_URL + bookId);
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
};

export default BookService;
