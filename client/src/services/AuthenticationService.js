import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const baseUrl = '/api/user'

const register = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, userData)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

const login = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, credentials)
    const { token } = response.data

    const decodedToken = jwtDecode(token)  // Use the named import

    const user = {
      token,
      username: decodedToken.sub,
      role: decodedToken.role
    }
    localStorage.setItem('financialUser', JSON.stringify(user))

    return user
  } catch (error) {
    console.log(error)
  }
}

const logout = () => {
  localStorage.removeItem('financialUser')
}

const getCurrentUser = () => {
  const user = localStorage.getItem('financialUser')
  return user ? JSON.parse(user) : null
}

export default {
  register,
  login,
  logout,
  getCurrentUser
}