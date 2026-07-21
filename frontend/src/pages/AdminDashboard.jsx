import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { useAuth } from '../hooks'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats')
      setStats(response.data.data.stats)
    } catch (err) {
      console.error('Error fetching stats:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-dark-secondary">Welcome, {user?.name}!</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        {loading ? (
          <p className="text-center text-dark-secondary">Loading...</p>
        ) : stats ? (
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <p className="text-dark-secondary mb-2">Users</p>
              <h3 className="text-3xl font-bold text-primary-400">{stats.users || 0}</h3>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <p className="text-dark-secondary mb-2">Projects</p>
              <h3 className="text-3xl font-bold text-primary-400">{stats.projects || 0}</h3>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <p className="text-dark-secondary mb-2">Team Members</p>
              <h3 className="text-3xl font-bold text-primary-400">{stats.teamMembers || 0}</h3>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <p className="text-dark-secondary mb-2">Messages</p>
              <h3 className="text-3xl font-bold text-primary-400">{stats.messages || 0}</h3>
            </div>
          </div>
        ) : null}

        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to Admin Panel</h2>
          <p className="text-dark-secondary">
            You have access to all admin features. Manage projects, team members, and view analytics from here.
          </p>
        </div>
      </div>
    </div>
  )
}