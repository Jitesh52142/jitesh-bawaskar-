'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaPlus, FaEdit, FaTrash, FaBriefcase, FaTimes } from 'react-icons/fa';

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  description: string[];
  technologies: string[];
  impact?: string;
  current: boolean;
}

export default function ExperienceManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyExperience: Experience = {
    id: Date.now(),
    role: '',
    company: '',
    location: '',
    duration: '',
    description: [''],
    technologies: [],
    impact: '',
    current: false
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
        setExperiences(portfolioData.experiences || []);
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
        experiences: experiences
      };
      
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      
      if (response.ok) {
        setSuccessMessage('Experiences updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setShowForm(false);
        setEditingExp(null);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    setEditingExp({ ...emptyExperience, id: Date.now() });
    setShowForm(true);
  };

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingExp) {
      const existingIndex = experiences.findIndex(exp => exp.id === editingExp.id);
      if (existingIndex >= 0) {
        const updated = [...experiences];
        updated[existingIndex] = editingExp;
        setExperiences(updated);
      } else {
        setExperiences([...experiences, editingExp]);
      }
      handleSave();
    }
  };

  const addDescriptionPoint = () => {
    if (editingExp) {
      setEditingExp({
        ...editingExp,
        description: [...editingExp.description, '']
      });
    }
  };

  const updateDescriptionPoint = (index: number, value: string) => {
    if (editingExp) {
      const newDesc = [...editingExp.description];
      newDesc[index] = value;
      setEditingExp({ ...editingExp, description: newDesc });
    }
  };

  const removeDescriptionPoint = (index: number) => {
    if (editingExp) {
      setEditingExp({
        ...editingExp,
        description: editingExp.description.filter((_, i) => i !== index)
      });
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
              <h1 className="text-4xl font-bold gradient-text mb-2">Work Experience</h1>
              <p className="text-gray-400">Manage your professional experience</p>
            </div>
            <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
              <FaPlus /> Add Experience
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeInUp">
            {successMessage}
          </div>
        )}

        {/* Experience Form */}
        {showForm && editingExp && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20 rounded-2xl p-8 w-full max-w-3xl my-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FaBriefcase className="text-yellow-500" />
                  {experiences.find(exp => exp.id === editingExp.id) ? 'Edit Experience' : 'Add Experience'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingExp(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Role / Position *</label>
                    <input
                      type="text"
                      value={editingExp.role}
                      onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                      placeholder="Senior Developer"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Company *</label>
                    <input
                      type="text"
                      value={editingExp.company}
                      onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                      placeholder="Company Name"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Location</label>
                    <input
                      type="text"
                      value={editingExp.location}
                      onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Duration</label>
                    <input
                      type="text"
                      value={editingExp.duration}
                      onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="current"
                    checked={editingExp.current}
                    onChange={(e) => setEditingExp({ ...editingExp, current: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                  <label htmlFor="current" className="text-white">Currently working here</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Key Responsibilities</label>
                  {editingExp.description.map((desc, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) => updateDescriptionPoint(index, e.target.value)}
                        className="flex-1 px-4 py-3 glass-effect rounded-lg text-white"
                        placeholder="Describe your responsibility..."
                      />
                      <button
                        onClick={() => removeDescriptionPoint(index)}
                        className="btn-secondary px-4"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addDescriptionPoint}
                    className="btn-secondary text-sm mt-2"
                  >
                    <FaPlus /> Add Point
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={editingExp.technologies.join(', ')}
                    onChange={(e) => setEditingExp({ 
                      ...editingExp, 
                      technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                    })}
                    className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Impact / Achievement</label>
                  <textarea
                    rows={3}
                    value={editingExp.impact}
                    onChange={(e) => setEditingExp({ ...editingExp, impact: e.target.value })}
                    className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                    placeholder="Key achievements or impact made..."
                  />
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingExp(null);
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={saving || !editingExp.role || !editingExp.company}
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
                        Save Experience
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Experience List */}
        <div className="space-y-6">
          {experiences.length === 0 ? (
            <div className="glass-effect card-gradient rounded-xl p-12 text-center">
              <FaBriefcase className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No experiences added yet</p>
              <button onClick={handleAdd} className="btn-primary mt-4 inline-flex items-center gap-2">
                <FaPlus /> Add Your First Experience
              </button>
            </div>
          ) : (
            experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect card-gradient rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-yellow-500 text-lg">{exp.company}</p>
                    {exp.location && <p className="text-gray-400 text-sm">{exp.location}</p>}
                    <p className="text-gray-400 text-sm mt-1">{exp.duration}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="btn-secondary px-4 py-2 flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-500 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
                
                {exp.description.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}

                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {exp.impact && (
                  <p className="text-gray-400 italic">Impact: {exp.impact}</p>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

