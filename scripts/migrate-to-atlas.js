const mongoose = require('mongoose');
const { initialPortfolioData } = require('../lib/data/initialData.ts');

// MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://Jitesh001:Jitesh001@twicky.fxotzly.mongodb.net/portfolio';

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  bio: {
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
  },
  projects: [{
    id: Number,
    title: String,
    description: String,
    technologies: [String],
    liveUrl: String,
    githubUrl: String,
    image: String,
    featured: Boolean,
    category: String,
    stats: {
      impact: String,
      users: String,
      performance: String,
    },
  }],
  experiences: [{
    id: Number,
    role: String,
    company: String,
    location: String,
    duration: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    description: [String],
    technologies: [String],
    impact: String,
  }],
  skills: [{
    category: String,
    items: [String],
    proficiency: Number,
  }],
  achievements: [{
    id: Number,
    title: String,
    organization: String,
    rank: String,
    participants: String,
    date: Date,
    description: String,
    type: String,
    icon: String,
  }],
  certifications: [{
    id: Number,
    title: String,
    issuer: String,
    date: Date,
    url: String,
  }],
  updatedAt: Date,
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

async function migrateToAtlas() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas successfully!');

    console.log('🔄 Migrating portfolio data...');
    
    // Clear existing data
    await Portfolio.deleteMany({});
    console.log('🗑️ Cleared existing portfolio data');

    // Insert new data
    const portfolio = new Portfolio(initialPortfolioData);
    await portfolio.save();
    console.log('✅ Portfolio data migrated successfully!');

    // Verify the data
    const count = await Portfolio.countDocuments();
    console.log(`📊 Total documents in database: ${count}`);

    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas');
  }
}

// Run migration
migrateToAtlas();
