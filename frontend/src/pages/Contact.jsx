import { useState } from 'react'
import { api } from '../services/api'
import { Mail, MessageSquare, User } from 'lucide-react'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await api.post('/messages', formData)
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">GET IN TOUCH</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-3">Contact Us</h1>
          <p className="text-gray-500 font-light text-base">Have a question or collaboration proposal? We'd love to hear from you.</p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/90 rounded-3xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
          {success && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-sm font-medium">
              Message sent successfully! Thank you for reaching out to ALCHEMII.
            </div>
          )}

          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Your Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Subject</label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Message subject"
                  className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="5"
                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0a0a0a] hover:bg-gray-800 disabled:bg-gray-400 text-white text-xs font-bold uppercase tracking-widest py-4 rounded-full transition-all duration-300 shadow-md active:scale-95"
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}