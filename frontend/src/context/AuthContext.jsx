import { createContext, useState, useEffect } from 'react'
import { api } from '../services/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('auth_token') || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)
  const [authLoading, setAuthLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
      setUser(JSON.parse(localStorage.getItem('user_data') || '{}'))
    }
    setAuthLoading(false)
  }, [token])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      console.log('Attempting login with:', email)
      
      const response = await api.post('/auth/login', {
        email,
        password
      })

      console.log('Login response:', response.data)

      if (response.data.success) {
        const { token: newToken, user: userData } = response.data

        // Save to localStorage
        localStorage.setItem('auth_token', newToken)
        localStorage.setItem('user_data', JSON.stringify(userData))

        // Update state
        setToken(newToken)
        setUser(userData)
        setIsAuthenticated(true)

        // Set default header
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

        return true
      } else {
        setError(response.data.error || 'Login failed')
        return false
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.response?.data?.error || 'Failed to login. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated,
      loading,
      error,
      authLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}