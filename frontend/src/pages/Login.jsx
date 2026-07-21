import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields')
      return
    }

    const success = await login(formData.email, formData.password)
    
    if (success) {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-20 relative z-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-2xl border border-gray-200/90 rounded-3xl p-8 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">ALCHEMII</p>
            <h1 className="text-3xl font-medium tracking-tight text-gray-900 mb-1">Welcome Back</h1>
            <p className="text-gray-500 font-light text-sm">Sign in to access admin workspace</p>
          </div>

          {/* Demo Credentials Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6 text-left">
            <p className="text-gray-900 text-xs font-bold uppercase tracking-wider mb-2">Demo Credentials:</p>
            <p className="text-gray-600 text-xs font-mono mb-1">Email: admin@alchemii.com</p>
            <p className="text-gray-600 text-xs font-mono">Password: Admin@123</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-6 text-left">
              <p className="text-rose-700 text-xs font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@alchemii.com"
                  className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-10 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0a0a0a] hover:bg-gray-800 disabled:bg-gray-400 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-full transition-all duration-300 shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-400 text-xs mt-6 font-light">
            ALCHEMII &copy; Admin Authentication Portal
          </p>
        </div>
      </div>
    </div>
  )
}