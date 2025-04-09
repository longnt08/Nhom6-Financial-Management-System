import { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationService from './services/AuthenticationService.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = AuthenticationService.getCurrentUser()
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const userData = await AuthenticationService.login({ username, password })
      setUser(userData)
      navigate('/')
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      await AuthenticationService.register(userData)
      navigate('/login')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    AuthenticationService.logout()
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)