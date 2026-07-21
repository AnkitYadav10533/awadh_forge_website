import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [
    'All',
    'AI',
    'Web',
    'Finance',
    'Health',
    'Education',
    'Security'
  ]

  useEffect(() => {
    fetchProjects()
  }, [selectedCategory])

  const fetchProjects = async () => {
    try {
      setLoading(true)

      const params =
        selectedCategory !== 'All'
          ? { category: selectedCategory }
          : {}

      const response = await api.get('/projects', { params })

      setProjects(response.data.data || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-left mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">PORTFOLIO</p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-gray-900 mb-4">
          Our Projects
        </h1>
        <p className="text-gray-500 font-light text-lg max-w-xl">
          Innovative solutions and real-world technology built by ALCHEMII teams.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 justify-start flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-[#0a0a0a] text-white shadow-md'
                : 'bg-white/80 border border-gray-200 text-gray-700 hover:border-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 py-12">
          Loading projects...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 py-12 font-medium">
          {error}
        </p>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white/80 backdrop-blur-xl border border-gray-200/90 rounded-3xl overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="p-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-block bg-gray-100 text-gray-900 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-gray-200">
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl font-medium text-gray-900 mb-3">
                {project.title}
              </h3>

              <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex gap-2 flex-wrap mb-6">
                {project.techStack &&
                  project.techStack
                    .slice(0, 4)
                    .map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
              </div>
            </div>

            {/* Links */}
            <div className="px-8 pb-8 flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <FiGithub size={15} />
                  Code
                </a>
              )}

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#0a0a0a] hover:bg-gray-800 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <FiExternalLink size={15} />
                  Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !loading && (
        <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-gray-200">
          <p className="text-gray-500 font-light text-base">
            No projects found in this category.
          </p>
        </div>
      )}
    </div>
  )
}