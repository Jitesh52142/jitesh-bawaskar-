/**
 * Script to create an admin user
 * Run: node scripts/create-admin.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Jitesh001:Jitesh001@twicky.fxotzly.mongodb.net/portfolio?retryWrites=true&w=majority';

// Admin Schema
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Admin credentials (CHANGE THESE!)
    const adminData = {
      email: 'admin@jitesh.com',  // Change this
      password: 'Admin@123',       // Change this
      name: 'Jitesh Bawaskar'
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('⚠️  Admin already exists with email:', adminData.email);
      console.log('Delete the existing admin from MongoDB Atlas first, or use a different email.');
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    console.log('🔐 Password hashed');

    // Create admin
    const admin = new Admin({
      email: adminData.email,
      password: hashedPassword,
      name: adminData.name,
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('\n📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('\n🌐 Login at: https://jitesh-bawaskar-portfolioo.vercel.app/admin');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

createAdmin();

