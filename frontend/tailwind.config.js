export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f0b08',
        'dark-card': '#1c1510',
        'dark-hover': '#2a201a',
        'dark-border': '#3d2f24',
        'dark-text': '#f8fafc',
        'dark-secondary': '#d1d5db',
        'dark-muted': '#94a3b8',
        'primary': {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        'display': ['"Plus Jakarta Sans"', 'Space Grotesk', 'sans-serif'],
        'body': ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        slideUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    }
  },
  plugins: []
}