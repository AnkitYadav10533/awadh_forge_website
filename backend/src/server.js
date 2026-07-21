import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import { connectDB } from './config/database.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173'
];
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(...process.env.CORS_ORIGIN.split(',').map(o => o.trim()));
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow if no origin (e.g. mobile apps, curl) or if it's explicitly allowed
    const isAllowed = !origin || 
                      allowedOrigins.includes(origin) || 
                      allowedOrigins.includes('*') || 
                      origin.endsWith('.onrender.com');

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, false); // Reject cleanly without throwing a 500 server error
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Database Connection
connectDB()

// Routes
app.use('/api', routes)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error'
  })
})

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`)
  console.log(`📚 API Documentation at http://localhost:${PORT}/api/health`)
  const hasDB = !!(process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGO_URL || process.env.DATABASE_URL);
  console.log(`🗄️  Database: ${hasDB ? 'Configured' : 'Not Configured (Optional)'}`)
})