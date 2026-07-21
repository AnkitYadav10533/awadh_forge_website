import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ==================== USER SCHEMA ====================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Member', 'Guest'], default: 'Guest' },
  photo: { type: String, default: null },
  bio: { type: String, default: '' },
  github: { type: String, default: null },
  linkedin: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ==================== TEAM SCHEMA ====================
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  photo: { type: String, default: null },
  bio: { type: String, default: '' },
  skills: [String],
  year: { type: Number, default: 1 },
  github: { type: String, default: null },
  linkedin: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ==================== PROJECT SCHEMA ====================
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  longDescription: { type: String, default: '' },
  category: {
    type: String,
    enum: ['AI', 'Web', 'Finance', 'Health', 'Education', 'Security'],
    required: true
  },
  image: { type: String, default: null },
  github: { type: String, default: null },
  liveLink: { type: String, default: null },
  techStack: [String],
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  featured: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'Paused'],
    default: 'In Progress'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ==================== EVENT SCHEMA ====================
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventType: {
    type: String,
    enum: ['Workshop', 'Meetup', 'Hackathon', 'Webinar', 'Other'],
    default: 'Meetup'
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, default: 'Online' },
  image: { type: String, default: null },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ==================== MESSAGE SCHEMA ====================
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  replyMessage: { type: String, default: null },
  replyDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

// ==================== NEWSLETTER SCHEMA ====================
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  unsubscribed: { type: Boolean, default: false },
  subscribedAt: { type: Date, default: Date.now },
  unsubscribedAt: { type: Date, default: null }
});

// ==================== GALLERY SCHEMA ====================
const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  category: {
    type: String,
    enum: ['Event', 'Project', 'Team', 'Other'],
    default: 'Other'
  },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },
  createdAt: { type: Date, default: Date.now }
});

// Create models
export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Project = mongoose.model('Project', projectSchema);
export const Event = mongoose.model('Event', eventSchema);
export const Message = mongoose.model('Message', messageSchema);
export const Newsletter = mongoose.model('Newsletter', newsletterSchema);
export const Gallery = mongoose.model('Gallery', gallerySchema);