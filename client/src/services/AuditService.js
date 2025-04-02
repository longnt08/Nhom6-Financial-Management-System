import axios from 'axios'

const baseUrl = '/api/audit'

const getAllAudit = async () => {
  const response = await axios.get(`${baseUrl}`)
  return response.data
}

const getAudit = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createAudit = async newObject => {
  const response = await axios.post(`${baseUrl}`, newObject)
  return response.data
}

const updateAudit = async object => {
  try {
    const response = await axios.put(`${baseUrl}/${object.id}`, object)
    return response.data
  }
  catch(error) {
    console.log(error.message)
  }
}

const removeAudit = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default {
  getAllAudit,
  getAudit,
  createAudit,
  updateAudit,
  removeAudit
}
