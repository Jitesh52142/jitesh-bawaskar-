'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function BioManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bio, setBio] = useState({
    name: '',
    title: '',
    bio: '',
    tagline: '',
    email: '',
    phone: '',
    location: '',
    resume: '',
    social: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      leetcode: '',
      hackerrank: '',
      unstop: '',
      bento: ''
    },
    stats: {
      projectsCompleted: 0,
      hackathonsParticipated: 0,
      yearsExperience: 0,
      technologiesMastered: 0
    }
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        
        if (!data.authenticated) {
          router.push('/admin');
          return;
        }
        
        // Fetch portfolio data
        const portfolioResponse = await fetch('/api/portfolio');
        const portfolioData = await portfolioResponse.json();
        setBio(portfolioData.bio || {});
        setLoading(false);
      } catch (error) {
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setErrorMessage('');
    
    try {
      // Fetch current data
      const currentResponse = await fetch('/api/portfolio');
      const currentData = await currentResponse.json();
      
      // Update only bio section
      const updatedData = {
        ...currentData,
        bio: bio
      };
      
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (response.ok) {
        setSuccessMessage('Bio & Contact information updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('Failed to update bio information');
      }
    } catch (error) {
      setErrorMessage('Error updating bio information');
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="btn-secondary mb-6 flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold gradient-text mb-2">Bio & Contact Information</h1>
          <p className="text-gray-400">Edit your personal information and contact details</p>
        </div>

        {/* Success Message Toast */}
        {successMessage && (
          <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeInUp">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <div className="glass-effect card-gradient rounded-xl p-8 space-y-8">
          {/* Personal Information */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FaUser className="text-yellow-500" />
              Personal Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
                <input
                  type="text"
                  value={bio.name || ''}
                  onChange={(e) => setBio({ ...bio, name: e.target.value })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Professional Title *</label>
                <input
                  type="text"
                  value={bio.title || ''}
                  onChange={(e) => setBio({ ...bio, title: e.target.value })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="Full Stack Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Tagline</label>
                <input
                  type="text"
                  value={bio.tagline || ''}
                  onChange={(e) => setBio({ ...bio, tagline: e.target.value })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="Building amazing web experiences"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Bio / About Me *</label>
                <textarea
                  rows={6}
                  value={bio.bio || ''}
                  onChange={(e) => setBio({ ...bio, bio: e.target.value })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="Tell your story..."
                  required
                />
                <p className="text-sm text-gray-400 mt-1">Write a compelling bio that highlights your skills and experience</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FaEnvelope className="text-yellow-500" />
              Contact Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-gray-400" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={bio.email || ''}
                  onChange={(e) => setBio({ ...bio, email: e.target.value })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <FaPhone className="text-gray-400" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={bio.phone || ''}
                  onChange={(e) => setBio({ ...bio, phone: e.target.value })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  Location
                </label>
                <input
                  type="text"
                  value={bio.location || ''}
                  onChange={(e) => setBio({ ...bio, location: e.target.value })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Social Media Links</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <FaGithub className="text-gray-400" />
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={bio.social?.github || ''}
                  onChange={(e) => setBio({ ...bio, social: { ...bio.social, github: e.target.value } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="https://github.com/yourusername"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <FaLinkedin className="text-gray-400" />
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={bio.social?.linkedin || ''}
                  onChange={(e) => setBio({ ...bio, social: { ...bio.social, linkedin: e.target.value } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <FaTwitter className="text-gray-400" />
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={bio.social?.twitter || ''}
                  onChange={(e) => setBio({ ...bio, social: { ...bio.social, twitter: e.target.value } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="https://twitter.com/yourusername"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={bio.social?.instagram || ''}
                  onChange={(e) => setBio({ ...bio, social: { ...bio.social, instagram: e.target.value } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="https://instagram.com/yourusername"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">LeetCode URL</label>
                <input
                  type="url"
                  value={bio.social?.leetcode || ''}
                  onChange={(e) => setBio({ ...bio, social: { ...bio.social, leetcode: e.target.value } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="https://leetcode.com/yourusername"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">HackerRank URL</label>
                <input
                  type="url"
                  value={bio.social?.hackerrank || ''}
                  onChange={(e) => setBio({ ...bio, social: { ...bio.social, hackerrank: e.target.value } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="https://hackerrank.com/yourusername"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Unstop URL</label>
                <input
                  type="url"
                  value={bio.social?.unstop || ''}
                  onChange={(e) => setBio({ ...bio, social: { ...bio.social, unstop: e.target.value } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="https://unstop.com/u/yourusername"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Bento URL</label>
                <input
                  type="url"
                  value={bio.social?.bento || ''}
                  onChange={(e) => setBio({ ...bio, social: { ...bio.social, bento: e.target.value } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="https://bento.me/yourusername"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-white mb-2">Resume URL</label>
              <input
                type="url"
                value={bio.resume || ''}
                onChange={(e) => setBio({ ...bio, resume: e.target.value })}
                className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="https://example.com/your-resume.pdf"
              />
              <p className="text-sm text-gray-400 mt-1">Link to your downloadable resume PDF</p>
            </div>
          </div>

          {/* Statistics */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Portfolio Statistics</h2>
            <p className="text-gray-400 text-sm mb-4">These stats appear on your homepage hero section</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Projects Completed</label>
                <input
                  type="number"
                  value={bio.stats?.projectsCompleted || 0}
                  onChange={(e) => setBio({ ...bio, stats: { ...bio.stats, projectsCompleted: Number(e.target.value) } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Hackathons Participated</label>
                <input
                  type="number"
                  value={bio.stats?.hackathonsParticipated || 0}
                  onChange={(e) => setBio({ ...bio, stats: { ...bio.stats, hackathonsParticipated: Number(e.target.value) } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Years of Experience</label>
                <input
                  type="number"
                  value={bio.stats?.yearsExperience || 0}
                  onChange={(e) => setBio({ ...bio, stats: { ...bio.stats, yearsExperience: Number(e.target.value) } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Technologies Mastered</label>
                <input
                  type="number"
                  value={bio.stats?.technologiesMastered || 0}
                  onChange={(e) => setBio({ ...bio, stats: { ...bio.stats, technologiesMastered: Number(e.target.value) } })}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="20"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-white/10">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

