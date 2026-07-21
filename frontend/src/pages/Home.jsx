import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Users, Sparkles, Layers, Award } from 'lucide-react'

export default function Home() {
  const customEase = [0.16, 1, 0.3, 1]

  const dynamicWords = ['Design.', 'Innovation.', 'Future.', 'Technology.']
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { value: '8+', label: 'ACTIVE PROJECTS' },
    { value: '11+', label: 'TEAM MEMBERS' },
    { value: '100%', label: 'DEDICATED INNOVATION' }
  ]

  const features = [
    {
      icon: Layers,
      title: 'Real-World Projects',
      description: 'Building production-grade web applications, platforms, and intelligent solutions.'
    },
    {
      icon: Sparkles,
      title: 'Student Driven',
      description: 'Empowering ambitious student engineers, designers, and innovators to build the future.'
    },
    {
      icon: Award,
      title: 'Excellence & Growth',
      description: 'Fostering hands-on technical experience, leadership, and impactful collaboration.'
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between px-8 md:px-16 pt-36 md:pt-44 pb-12 max-w-7xl mx-auto">
        <div className="max-w-3xl text-left">
          {/* Overline */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: customEase, delay: 0.1 }}
            className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-gray-900 inline-block animate-pulse"></span>
            STUDENT INNOVATION LAB
          </motion.p>

          {/* Kinetic Animated Hero Title */}
          <div className="mb-8">
            {/* Line 1: Where Vision */}
            <div className="overflow-hidden py-1">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, ease: customEase, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] text-gray-900 flex gap-4"
              >
                <span className="inline-block hover:scale-105 hover:-rotate-1 transition-transform duration-300">
                  Where
                </span>
                <span className="inline-block hover:scale-105 hover:rotate-1 transition-transform duration-300">
                  Vision
                </span>
              </motion.div>
            </div>

            {/* Line 2: Meets [Design. / Innovation. / Future.] */}
            <div className="overflow-hidden py-1">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, ease: customEase, delay: 0.35 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] text-gray-900 flex items-center gap-3 flex-wrap"
              >
                <span>Meets</span>
                
                {/* Dynamic Rotating Kinetic Word */}
                <div className="relative inline-block overflow-hidden h-[1.15em] min-w-[240px] sm:min-w-[320px] md:min-w-[420px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={dynamicWords[wordIndex]}
                      initial={{ y: '100%', opacity: 0, rotateX: -45 }}
                      animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                      exit={{ y: '-100%', opacity: 0, rotateX: 45 }}
                      transition={{ duration: 0.7, ease: customEase }}
                      className="absolute left-0 top-0 text-black font-semibold tracking-tight inline-flex items-center"
                    >
                      {dynamicWords[wordIndex]}
                      <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-900 inline-block ml-2 animate-ping" />
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: customEase, delay: 0.4 }}
            className="text-lg md:text-xl font-light leading-relaxed text-gray-500 mb-10 max-w-lg"
          >
            ALCHEMII is a student-driven technology platform building real projects, digital experiences, and innovations that inspire and elevate.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: customEase, delay: 0.5 }}
            className="flex items-center gap-6 flex-wrap"
          >
            {/* Primary Dark Pill Button */}
            <Link
              to="/projects"
              className="bg-[#0a0a0a] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:bg-gray-800 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              EXPLORE OUR PROJECTS
              <ArrowUpRight size={16} />
            </Link>

            {/* Secondary Floating Circle Play / Team Button */}
            <Link
              to="/team"
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-black transition-colors"
            >
              <div className="w-14 h-14 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center justify-center text-gray-900 group-hover:scale-105 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
                <Users size={18} className="fill-black text-black" />
              </div>
              MEET THE TEAM
            </Link>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: customEase, delay: 0.6 }}
          className="pt-16 md:pt-24 border-t border-gray-200/80 mt-16"
        >
          <div className="flex items-center gap-8 md:gap-12 flex-wrap">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-8 md:gap-12">
                <div>
                  <h3 className="text-3xl md:text-4xl font-medium text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
                    {stat.label}
                  </p>
                </div>
                {idx < stats.length - 1 && (
                  <div className="w-px h-8 bg-gray-200/90 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Feature Highlights Section */}
      <section className="relative z-10 py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="text-left mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">CORE PHILOSOPHY</p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-gray-900">
            Forging ideas into reality.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: customEase }}
              className="bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center mb-6">
                <feature.icon size={22} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}