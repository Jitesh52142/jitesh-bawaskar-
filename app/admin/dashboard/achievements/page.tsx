'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaPlus, FaEdit, FaTrash, FaAward, FaTimes, FaTrophy, FaMedal, FaCertificate, FaStar } from 'react-icons/fa';

interface Achievement {
  id: number;
  title: string;
  organization: string;
  rank?: string;
  participants?: string;
  date?: string;
  description: string;
  type: string;
  icon: string;
}

const achievementIcons = [
  { value: 'trophy', label: 'Trophy', icon: FaTrophy },
  { value: 'medal', label: 'Medal', icon: FaMedal },
  { value: 'certificate', label: 'Certificate', icon: FaCertificate },
  { value: 'star', label: 'Star', icon: FaStar },
  { value: 'award', label: 'Award', icon: FaAward },
];

const achievementTypes = [
  'Hackathon',
  'Competition',
  'Certification',
  'Award',
  'Recognition',
  'Publication',
  'Project',
  'Other'
];

export default function AchievementsManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyAchievement: Achievement = {
    id: Date.now(),
    title: '',
    organization: '',
    rank: '',
    participants: '',
    date: '',
    description: '',
    type: 'Hackathon',
    icon: 'trophy'
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        
        if (!data.authenticated) {
          router.push('/admin');
          return;
        }
        
        const portfolioResponse = await fetch('/api/portfolio');
        const portfolioData = await portfolioResponse.json();
        setAchievements(portfolioData.achievements || []);
        setLoading(false);
      } catch (error) {
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const currentResponse = await fetch('/api/portfolio');
      const currentData = await currentResponse.json();
      
      const updatedData = {
        ...currentData,
        achievements: achievements
      };
      
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      
      if (response.ok) {
        setSuccessMessage('Achievements updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setShowForm(false);
        setEditingAchievement(null);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    setEditingAchievement({ ...emptyAchievement, id: Date.now() });
    setShowForm(true);
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      setAchievements(achievements.filter(ach => ach.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingAchievement && editingAchievement.title && editingAchievement.organization) {
      const existingIndex = achievements.findIndex(ach => ach.id === editingAchievement.id);
      if (existingIndex >= 0) {
        const updated = [...achievements];
        updated[existingIndex] = editingAchievement;
        setAchievements(updated);
      } else {
        setAchievements([...achievements, editingAchievement]);
      }
      handleSave();
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconObj = achievementIcons.find(i => i.value === iconName);
    return iconObj ? iconObj.icon : FaTrophy;
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
      <div className="container-custom max-w-6xl">
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="btn-secondary mb-6 flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Achievements & Awards</h1>
              <p className="text-gray-400">Manage your accomplishments and recognitions</p>
            </div>
            <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
              <FaPlus /> Add Achievement
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeInUp">
            {successMessage}
          </div>
        )}

        {/* Achievement Form */}
        {showForm && editingAchievement && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20 rounded-2xl p-8 w-full max-w-3xl my-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FaAward className="text-yellow-500" />
                  {achievements.find(ach => ach.id === editingAchievement.id) ? 'Edit Achievement' : 'Add Achievement'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingAchievement(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Achievement Title *</label>
                  <input
                    type="text"
                    value={editingAchievement.title}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, title: e.target.value })}
                    className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                    placeholder="Winner - Best Innovation Award"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Organization / Event *</label>
                    <input
                      type="text"
                      value={editingAchievement.organization}
                      onChange={(e) => setEditingAchievement({ ...editingAchievement, organization: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                      placeholder="Tech Hackathon 2024"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Type</label>
                    <select
                      value={editingAchievement.type}
                      onChange={(e) => setEditingAchievement({ ...editingAchievement, type: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                    >
                      {achievementTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Rank / Position</label>
                    <input
                      type="text"
                      value={editingAchievement.rank || ''}
                      onChange={(e) => setEditingAchievement({ ...editingAchievement, rank: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                      placeholder="1st Place"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Participants</label>
                    <input
                      type="text"
                      value={editingAchievement.participants || ''}
                      onChange={(e) => setEditingAchievement({ ...editingAchievement, participants: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                      placeholder="500+"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Date</label>
                    <input
                      type="text"
                      value={editingAchievement.date || ''}
                      onChange={(e) => setEditingAchievement({ ...editingAchievement, date: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Icon</label>
                  <div className="grid grid-cols-5 gap-4">
                    {achievementIcons.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setEditingAchievement({ ...editingAchievement, icon: value })}
                        className={`p-4 glass-effect rounded-lg flex flex-col items-center gap-2 transition-all ${
                          editingAchievement.icon === value 
                            ? 'ring-2 ring-yellow-500 bg-yellow-500/10' 
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <Icon className="text-2xl" />
                        <span className="text-xs">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={editingAchievement.description}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, description: e.target.value })}
                    className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                    placeholder="Describe your achievement..."
                  />
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingAchievement(null);
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={saving || !editingAchievement.title || !editingAchievement.organization}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save Achievement
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Achievements List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.length === 0 ? (
            <div className="col-span-full glass-effect card-gradient rounded-xl p-12 text-center">
              <FaAward className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No achievements added yet</p>
              <button onClick={handleAdd} className="btn-primary mt-4 inline-flex items-center gap-2">
                <FaPlus /> Add Your First Achievement
              </button>
            </div>
          ) : (
            achievements.map((achievement, index) => {
              const IconComponent = getIconComponent(achievement.icon);
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect card-gradient rounded-xl p-6 relative group"
                >
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(achievement)}
                      className="btn-secondary px-3 py-2 text-sm"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(achievement.id)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-500 px-3 py-2 rounded-lg transition-all text-sm"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-3xl mb-4">
                    <IconComponent />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 pr-16">{achievement.title}</h3>
                  <p className="text-yellow-500 font-medium mb-1">{achievement.organization}</p>
                  
                  {achievement.rank && (
                    <p className="text-sm text-gray-300 mb-1">🏆 {achievement.rank}</p>
                  )}
                  
                  {achievement.participants && (
                    <p className="text-sm text-gray-400 mb-1">👥 {achievement.participants} participants</p>
                  )}
                  
                  {achievement.date && (
                    <p className="text-sm text-gray-400 mb-3">📅 {achievement.date}</p>
                  )}
                  
                  {achievement.description && (
                    <p className="text-sm text-gray-300 mt-3 line-clamp-3">{achievement.description}</p>
                  )}
                  
                  <span className="inline-block mt-3 px-3 py-1 bg-white/5 border border-white/10 text-white text-xs rounded-full">
                    {achievement.type}
                  </span>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

