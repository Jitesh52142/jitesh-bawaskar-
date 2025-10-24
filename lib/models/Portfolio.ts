import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  liveUrl: String,
  githubUrl: String,
  image: String,
  featured: { type: Boolean, default: false },
  category: String,
  stats: {
    impact: String,
    users: String,
    performance: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const ExperienceSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  duration: String,
  startDate: Date,
  endDate: Date,
  description: [String],
  technologies: [String],
  impact: String,
  current: { type: Boolean, default: false },
});

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [String],
  proficiency: Number,
});

const AchievementSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  organization: String,
  rank: String,
  participants: String,
  date: Date,
  description: String,
  type: String,
  icon: String,
});

const CertificationSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  issuer: String,
  date: Date,
  url: String,
});

const BioSchema = new mongoose.Schema({
  name: String,
  title: String,
  tagline: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  resume: String,
  social: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    leetcode: String,
    hackerrank: String,
    unstop: String,
    bento: String,
  },
  stats: {
    projectsCompleted: Number,
    hackathonsParticipated: Number,
    yearsExperience: Number,
    technologiesMastered: Number,
  },
});

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const PortfolioSchema = new mongoose.Schema({
  bio: BioSchema,
  projects: [ProjectSchema],
  experiences: [ExperienceSchema],
  skills: [SkillSchema],
  achievements: [AchievementSchema],
  certifications: [CertificationSchema],
  updatedAt: { type: Date, default: Date.now },
});

export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

