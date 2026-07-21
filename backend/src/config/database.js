import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGO_URL || process.env.DATABASE_URL;

  if (!mongoURI) {
    console.warn('========================================================================');
    console.warn('⚠️  MONGODB OPTIONAL WARNING:');
    console.warn('Running without MongoDB connection. Database features will be unavailable.');
    console.warn('========================================================================');
    return null;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn('========================================================================');
    console.warn(`⚠️  MongoDB Connection Error: ${error.message}`);
    console.warn('Continuing execution without database features.');
    console.warn('========================================================================');
    return null;
  }
};