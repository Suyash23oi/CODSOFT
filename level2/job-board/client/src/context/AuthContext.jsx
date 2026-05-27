import { createContext, useState, useEffect } from 'react'
import API from '../services/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      // Set Axios auth header globally
      API.defaults.headers.common['Authorization'] = token
      // Load current user profile from localStorage or check if token is valid
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          localStorage.removeItem('user')
        }
      }
    } else {
      delete API.defaults.headers.common['Authorization']
      setUser(null)
    }
    setLoading(false)
  }, [token])

  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password })
      const { token: receivedToken, user: receivedUser } = response.data
      
      localStorage.setItem('token', receivedToken)
      localStorage.setItem('user', JSON.stringify(receivedUser))
      
      setToken(receivedToken)
      setUser(receivedUser)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.'
      }
    }
  }

  const register = async (name, email, password, role) => {
    try {
      await API.post('/auth/register', { name, email, password, role })
      // Automatically login after successful registration
      return await login(email, password)
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken('')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
