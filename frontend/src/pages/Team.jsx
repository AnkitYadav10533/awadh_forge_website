import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const getTeamMemberPhoto = (name) => {
  const photos = {
    'Abhay Shanker Tiwari': '/images/abhay.jpg',
    'Tanu Mishra': '/images/tanu.jpg',
    'Vanshika Saxena': '/images/vanshika.jpg',
    'Sumaiya Khan': '/images/sumaiya.jpg',
    'Abhishek Soni': '/images/abhishek.jpg',
    'Aditya Shukla': 'https://api.dicebear.com/7.x/avataaars/svg?seed=aditya303',
    'Ankit Yadav': '/images/ankit.jpg',
    'Harsh Chandra Mishra': 'https://api.dicebear.com/7.x/avataaars/svg?seed=harsh707',
    'Swarnim Tiwari': 'https://api.dicebear.com/7.x/avataaars/svg?seed=swarnim808',
    'Samriddhi Tripathi': '/images/samriddhi.jpg',
    'Aamina Hasan': '/images/aamina.jpg',
    'Anjali Yadav': '/images/anjali.jpg'
  }

  return photos[name] || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
}

export default function Team() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      setLoading(true)
      const response = await api.get('/team')
      setMembers(response.data.data || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching team:', err)
      setError('Failed to load team members')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-left mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">PEOPLE</p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-gray-900 mb-4">
          Our Team
        </h1>
        <p className="text-gray-500 font-light text-lg max-w-xl">
          Meet the student developers, designers, and engineers behind ALCHEMII.
        </p>
      </div>

      {loading && (
        <p className="text-center text-gray-500 py-12">
          Loading team members...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 py-12 font-medium">
          {error}
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white/80 backdrop-blur-xl border border-gray-200/90 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="pt-4 px-4 flex items-center justify-center">
              <img
                src={getTeamMemberPhoto(member.name)}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover shadow-sm border border-gray-200"
              />
            </div>

            {/* Content */}
            <div className="p-4 text-center">
              <h3 className="text-sm font-semibold text-gray-900 mb-0.5 truncate">
                {member.name}
              </h3>

              <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-2">
                {member.role}
              </p>

              <p className="text-[11px] text-gray-500 font-light mb-3 line-clamp-2">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="flex gap-1 flex-wrap justify-center mb-3">
                {member.skills &&
                  member.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-medium"
                    >
                      {skill}
                    </span>
                  ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 justify-center text-gray-600">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    <FiGithub size={14} />
                  </a>
                )}

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    <FiLinkedin size={14} />
                  </a>
                )}

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-black transition-colors"
                  >
                    <FiMail size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && !loading && (
        <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-gray-200">
          <p className="text-gray-500 font-light text-base">
            No team members found.
          </p>
        </div>
      )}
    </div>
  )
}