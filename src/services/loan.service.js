import axios from 'axios';
import authHeader from './auth.header.js';
import { BE_SERVER } from 'CONSTANST.js';

const API_URL = BE_SERVER + 'api/v1/loans';

const addLoan = async (loan) => {
    try {
        const response = await axios.post(API_URL + '/new', loan, {
            headers: authHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};
const getLoans = async () => {
    try {
        const response = await axios.get(API_URL + '/listAllLoan', {
            headers: authHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};
const getMyLoans = async (id) => {
    try {
        const response = await axios.get(API_URL + '/info/' + id, {
            headers: authHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};
const deleteLoan = async () => {
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
const LoanService = {
    addLoan,
    getMyLoans,
    getLoans,
    deleteLoan,
};

export default LoanService;
