import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks'

export default function AdminLayout() {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-dark-text">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-dark-secondary">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-dark-bg text-dark-text">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}