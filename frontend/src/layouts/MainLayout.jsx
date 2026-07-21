import { Outlet } from 'react-router-dom'
import { ReactLenis } from '@studio-freight/react-lenis'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ThreeCanvas from '../components/ThreeCanvas'

export default function MainLayout() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="relative min-h-screen w-full bg-white text-gray-900 overflow-hidden font-sans">
        {/* Fixed 3D Canvas Background */}
        <ThreeCanvas />

        {/* Floating Liquid Glass Navbar */}
        <Navbar />

        {/* Scrollable Main Content */}
        <main className="relative z-10 flex flex-col min-h-screen">
          <Outlet />
          <Footer />
        </main>
      </div>
    </ReactLenis>
  )
}