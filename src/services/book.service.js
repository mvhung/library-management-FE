import axios from 'axios';
import authHeader from './auth.header.js';

const API_URL = 'http://localhost:8080/api/v1/';

const getCategories = async () => {
    try {
        const response = await axios.get(API_URL + 'categories?size=5');
        return response.data.content;
    } catch (error) {
        console.log('Error fetching categories', error);
    }
};

const getBooksByCategoryId = async (categoryId) => {
    try {
        const response = await axios.get(API_URL + 'categories/books/' + categoryId);
        return response.data.content;
    } catch (error) {
        console.log('Error fecthing books', error);
    }
};

const getBookById = async (bookId) => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await axios.get(API_URL + 'books/' + bookId);
            return response.data;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    } else {
        return null;
    }
};

const updateBook = (bookId) => {
    return axios.get(API_URL + 'books/' + bookId);
};

const createBook = (book) => {
    return axios.post(API_URL + 'books/', book, { headers: authHeader() });
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

const BookService = {
    getCategories,
    getBooksByCategoryId,
    getBookById,
    updateBook,
    createBook,
};

export default BookService;
