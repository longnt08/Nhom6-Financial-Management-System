import axios from 'axios'

const baseUrl = '/api/accounting'


const getAllRecord = async () => {
  const response = await axios.get(`${baseUrl}/record`)
  return response.data
}

const getRecord = async (id) => {
  const response = await axios.get(`${baseUrl}/record/${id}`)
  return response.data
}

const createRecord = async newObject => {
  const response = await axios.post(`${baseUrl}/record`, newObject)
  return response.data
}

const updateRecord = async object => {
  try {
    const response = await axios.put(`${baseUrl}/record/${object.id}`, object)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

const removeRecord = async (id) => {
  const response = await axios.delete(`${baseUrl}/record/${id}`)
  return response
}

const getAllReport = async () => {
  const response = await axios.get(`${baseUrl}/report`)
  return response.data
}

const getReport = async (id) => {
  const response = await axios.get(`${baseUrl}/report/${id}`)
  return response.data
}

const createReport = async newObject => {
  const response = await axios.post(`${baseUrl}/report`, newObject)
  return response.data
}

const updateReport = async object => {
  try {
    const response = await axios.put(`${baseUrl}/report/${object.id}`, object)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

const removeReport = async (id) => {
  const response = await axios.delete(`${baseUrl}/report/${id}`)
  return response
}

export default {
  getAllRecord,
  getRecord,
  createRecord,
  updateRecord,
  removeRecord,
  getAllReport,
  getReport,
  createReport,
  updateReport,
  removeReport
}
