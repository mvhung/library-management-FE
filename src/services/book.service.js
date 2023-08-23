import axios from 'axios';
import authHeader from './auth.header.js';

const API_URL = 'http://localhost:8080/api/v1/';

const getBooks = async () => {
    const res = await axios.get(API_URL + 'books');
    return res.data;
};

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
    {
        try {
            const response = await axios.get(API_URL + 'books/' + bookId);
            return response.data;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }
};

const searchBook = (key) => {
    return axios.get(API_URL + 'books/search', {
        params: {
            keyword: String(key),
        },
    });
};

const updateBook = (bookId, book) => {
    return axios.put(API_URL + 'books/' + bookId, book, { headers: authHeader() });
};

const createBook = (book) => {
    return axios.post(API_URL + 'books', book, { headers: authHeader() });
};

const deleteBook = (id) => {
    return axios.delete(API_URL + 'books/' + id, { headers: authHeader() });
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
    getBooks,
    getCategories,
    getBooksByCategoryId,
    getBookById,
    updateBook,
    createBook,
    searchBook,
    deleteBook,
};

export default BookService;
