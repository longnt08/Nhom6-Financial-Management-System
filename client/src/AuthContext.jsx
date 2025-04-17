import { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationService from './services/AuthenticationService.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = AuthenticationService.getCurrentUser()
    if (storedUser) {
      // Always set the user from localStorage, regardless of token expiration
      // This ensures the user stays logged in across page reloads
      setUser(storedUser);

      // We'll handle token expiration in the axios interceptors instead
    }
    setLoading(false)
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
    // Stay on the current page instead of redirecting to login
    // (removed: navigate('/login'))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
