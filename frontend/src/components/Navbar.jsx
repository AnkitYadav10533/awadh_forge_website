import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../hooks'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Team', path: '/team' },
    { label: 'Contact', path: '/contact' }
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between ${
          scrolled
            ? 'mt-4 w-[95%] md:w-[80%] max-w-5xl rounded-full bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-3 px-6 md:px-8'
            : 'w-full max-w-7xl pt-8 pb-4 px-8 md:px-12 bg-transparent'
        }`}
      >
        {/* Left Brand Logo */}
        <Link
          to="/"
          className="text-sm md:text-base font-bold tracking-[0.2em] text-gray-900 uppercase hover:opacity-80 transition-opacity"
        >
          ALCHEMII
        </Link>

        {/* Center Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive ? 'text-black font-bold' : 'text-gray-700 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          {isAuthenticated && user?.role === 'Admin' && (
            <Link
              to="/admin"
              className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                location.pathname.startsWith('/admin') ? 'text-black font-bold' : 'text-gray-700 hover:text-black'
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right Desktop Auth / Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-[#0a0a0a] text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all active:scale-95"
            >
              <LogOut size={14} /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-xs font-bold uppercase tracking-widest bg-[#0a0a0a] text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
            >
              Login
            </Link>
          )}
        </div>

        {/* Right Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden w-11 h-11 bg-white/90 backdrop-blur-md rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/60 flex items-center justify-center text-gray-900 hover:scale-105 transition-transform"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute top-20 left-4 right-4 md:hidden bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 shadow-[0_16px_40px_rgba(0,0,0,0.12)] flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-gray-800 hover:text-black py-2 px-3 rounded-xl hover:bg-gray-100/60 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && user?.role === 'Admin' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-gray-800 hover:text-black py-2 px-3 rounded-xl hover:bg-gray-100/60 transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>

            <div className="pt-2 border-t border-gray-200/60">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest bg-[#0a0a0a] text-white py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <LogOut size={14} /> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center text-xs font-bold uppercase tracking-widest bg-[#0a0a0a] text-white py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}