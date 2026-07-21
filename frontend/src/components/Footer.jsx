import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'Team', href: '/team' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'GitHub', href: 'https://github.com' },
        { name: 'Documentation', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Support', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Disclaimer', href: '#' }
      ]
    }
  ]

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:contact@alchemii.com', label: 'Email' }
  ]

  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/80 mt-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="text-base font-bold tracking-[0.2em] text-gray-900 uppercase mb-4 inline-block">
              ALCHEMII
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs font-light">
              A student-driven technology platform building real projects and innovations.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-200 transition-colors"
                  title={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-900 mb-4">{section.title}</h3>

              <ul className="space-y-2.5">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-black transition-colors text-sm font-light"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-500 hover:text-black transition-colors text-sm font-light"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-gray-200/80 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider text-gray-500 uppercase font-medium">
          <p>&copy; {currentYear} ALCHEMII. All rights reserved.</p>
          <p>Built with precision by students, for students.</p>
        </div>
      </div>
    </footer>
  )
}