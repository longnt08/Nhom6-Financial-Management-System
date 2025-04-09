import axios from 'axios';

const BASE_URL = '/investment';

const getAllInvestments = async () => {
    const response = await axios.get(`${BASE_URL}/record`);
    return response.data;
};

const getInvestment = async (id) => {
    const response = await axios.get(`${BASE_URL}/record/${id}`);
    return response.data;
};

const createInvestment = async (newObject) => {
    const response = await axios.post(`${BASE_URL}/record`, newObject);
    return response.data;
};

const updateInvestment = async (object) => {
    try {
        const response = await axios.put(`${BASE_URL}/record/${object.id}`, object);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

const removeInvestment = async (id) => {
    const response = await axios.delete(`${BASE_URL}/record/${id}`);
    return response;
};

export default {
    getAllInvestments,
    getInvestment,
    createInvestment,
    updateInvestment,
    removeInvestment,
};