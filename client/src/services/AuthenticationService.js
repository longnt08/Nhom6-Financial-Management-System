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

    console.log(decodedToken.sub, decodedToken.role, decodedToken.id)
    const user = {
      token,
      username: decodedToken.sub,
      role: decodedToken.role,
      id: decodedToken.jit,
    }
    
    localStorage.setItem('financialUser', JSON.stringify(user))
    // Store the user ID separately for easier access
    localStorage.setItem('id', decodedToken.jit)

    return user
  } catch (error) {
    console.log(error)
    throw error
  }
}

const logout = () => {
  localStorage.removeItem('financialUser')
  localStorage.removeItem('id')
}

const getCurrentUser = () => {
  const user = localStorage.getItem('financialUser')
  if (!user) return null;
  
  // Return the user even if token might be expired
  // This allows showing user info in the UI until logout is clicked
  return JSON.parse(user)
}

// Set up axios interceptor to handle requests even when token is expired
axios.interceptors.request.use(
  config => {
    const user = getCurrentUser();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Don't automatically redirect on 401/403 errors
axios.interceptors.response.use(
  response => response,
  error => {
    // Let the component handle the error without auto-logout
    return Promise.reject(error);
  }
);

export default {
  register,
  login,
  logout,
  getCurrentUser
}
