import axios from 'axios';

const BASE_URL = '/api/budget';

const getAllBudgets = async () => {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
};

const getBudget = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

const createBudget = async (newObject) => {
    const response = await axios.post(`${BASE_URL}/add`, newObject);
    return response.data;
};

const updateBudget = async (object) => {
    try {
        const response = await axios.put(`${BASE_URL}/${object.id}`, object);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

const removeBudget = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response;
};

export default {
    getAllBudgets,
    getBudget,
    createBudget,
    updateBudget,
    removeBudget
};