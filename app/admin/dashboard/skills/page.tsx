'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaPlus, FaEdit, FaTrash, FaCog, FaTimes } from 'react-icons/fa';

interface Skill {
  category: string;
  items: string[];
  proficiency: number;
}

export default function SkillsManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  const emptySkill: Skill = {
    category: '',
    items: [''],
    proficiency: 80
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
        setSkills(portfolioData.skills || []);
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
        skills: skills
      };
      
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      
      if (response.ok) {
        setSuccessMessage('Skills updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setShowForm(false);
        setEditingSkill(null);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    setEditingSkill({ ...emptySkill });
    setEditIndex(-1);
    setShowForm(true);
  };

  const handleEdit = (skill: Skill, index: number) => {
    setEditingSkill({ ...skill });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this skill category?')) {
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    if (editingSkill && editingSkill.category && editingSkill.items.length > 0) {
      if (editIndex >= 0) {
        const updated = [...skills];
        updated[editIndex] = editingSkill;
        setSkills(updated);
      } else {
        setSkills([...skills, editingSkill]);
      }
      handleSave();
    }
  };

  const addSkillItem = () => {
    if (editingSkill) {
      setEditingSkill({
        ...editingSkill,
        items: [...editingSkill.items, '']
      });
    }
  };

  const updateSkillItem = (index: number, value: string) => {
    if (editingSkill) {
      const newItems = [...editingSkill.items];
      newItems[index] = value;
      setEditingSkill({ ...editingSkill, items: newItems });
    }
  };

  const removeSkillItem = (index: number) => {
    if (editingSkill) {
      setEditingSkill({
        ...editingSkill,
        items: editingSkill.items.filter((_, i) => i !== index)
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
              <h1 className="text-4xl font-bold gradient-text mb-2">Technical Skills</h1>
              <p className="text-gray-400">Manage your skill categories and proficiency levels</p>
            </div>
            <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
              <FaPlus /> Add Skill Category
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeInUp">
            {successMessage}
          </div>
        )}

        {/* Skill Form */}
        {showForm && editingSkill && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20 rounded-2xl p-8 w-full max-w-2xl my-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FaCog className="text-yellow-500" />
                  {editIndex >= 0 ? 'Edit Skill Category' : 'Add Skill Category'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingSkill(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Category Name *</label>
                  <input
                    type="text"
                    value={editingSkill.category}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                    className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                    placeholder="e.g., Frontend Development, Backend Development"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Proficiency Level: {editingSkill.proficiency}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingSkill.proficiency}
                    onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Skills / Technologies *</label>
                  {editingSkill.items.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateSkillItem(index, e.target.value)}
                        className="flex-1 px-4 py-3 glass-effect rounded-lg text-white"
                        placeholder="e.g., React, TypeScript, Node.js"
                      />
                      {editingSkill.items.length > 1 && (
                        <button
                          onClick={() => removeSkillItem(index)}
                          className="btn-secondary px-4"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addSkillItem}
                    className="btn-secondary text-sm mt-2"
                  >
                    <FaPlus /> Add Skill
                  </button>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingSkill(null);
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={saving || !editingSkill.category || editingSkill.items.filter(i => i.trim()).length === 0}
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
                        Save Skill Category
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Skills List */}
        <div className="grid md:grid-cols-2 gap-6">
          {skills.length === 0 ? (
            <div className="col-span-2 glass-effect card-gradient rounded-xl p-12 text-center">
              <FaCog className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No skills added yet</p>
              <button onClick={handleAdd} className="btn-primary mt-4 inline-flex items-center gap-2">
                <FaPlus /> Add Your First Skill
              </button>
            </div>
          ) : (
            skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect card-gradient rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{skill.category}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <span className="text-yellow-500 font-medium text-sm">{skill.proficiency}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(skill, index)}
                      className="btn-secondary px-3 py-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-500 px-3 py-2 rounded-lg transition-all"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-white rounded-lg text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

