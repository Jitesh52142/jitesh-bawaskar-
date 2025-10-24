'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaImage } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
  category: string;
  stats?: {
    impact?: string;
    users?: string;
    performance?: string;
  };
}

export default function ProjectsManagement() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [techInput, setTechInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    const initializeData = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        if (!data.authenticated) {
          router.push('/admin');
        }
      } catch (error) {
        router.push('/admin');
      }
      fetchProjects();
    };
    
    initializeData();
  }, [router]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      const data = await response.json();
      if (!data.authenticated) {
        router.push('/admin');
      }
    } catch (error) {
      router.push('/admin');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setProjects(data.projects || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setTechInput(project.technologies?.join(', ') || '');
    setIsCreating(false);
  };

  const handleCreate = () => {
    const newId = Math.max(...projects.map(p => p.id), 0) + 1;
    setFormData({
      id: newId,
      title: '',
      description: '',
      technologies: [],
      category: 'Full Stack',
      featured: false,
      liveUrl: '',
      githubUrl: '',
      image: '',
    });
    setTechInput('');
    setIsCreating(true);
    setEditingProject(null);
  };

  const handleSave = async () => {
    try {
      const technologies = techInput.split(',').map(t => t.trim()).filter(t => t);
      const projectData = { ...formData, technologies };

      let updatedProjects;
      if (isCreating) {
        updatedProjects = [...projects, projectData as Project];
      } else {
        updatedProjects = projects.map(p => 
          p.id === projectData.id ? projectData as Project : p
        );
      }

      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'projects', data: updatedProjects }),
      });

      if (response.ok) {
        await fetchProjects();
        handleCancel();
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const updatedProjects = projects.filter(p => p.id !== id);
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'projects', data: updatedProjects }),
      });

      if (response.ok) {
        await fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsCreating(false);
    setFormData({});
    setTechInput('');
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        handleInputChange('image', data.imageUrl);
        alert('Image uploaded successfully!');
      } else {
        setUploadError(data.error || 'Upload failed');
      }
    } catch (error) {
      setUploadError('Failed to upload image');
    } finally {
      setUploading(false);
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
      <div className="container-custom">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Manage Projects</h1>
            <p className="text-gray-400">Add, edit, or delete your projects</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => router.push('/admin/dashboard')}
              className="btn-secondary"
            >
              Back to Dashboard
            </button>
            <button onClick={handleCreate} className="btn-primary flex items-center gap-2">
              <FaPlus /> Add New Project
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingProject) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect card-gradient rounded-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">
              {isCreating ? 'Create New Project' : 'Edit Project'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                  placeholder="Project Title"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                >
                  <option value="Full Stack">Full Stack</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="AI Chatbot">AI Chatbot</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Marketing Automation">Marketing Automation</option>
                  <option value="Healthcare AI">Healthcare AI</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Research Tools">Research Tools</option>
                  <option value="Business Tools">Business Tools</option>
                </select>
              </div>

              {/* Live URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
                <input
                  type="url"
                  value={formData.liveUrl || ''}
                  onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                  placeholder="https://example.com"
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl || ''}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                  placeholder="https://github.com/..."
                />
              </div>

              {/* Image Upload & URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaImage className="inline mr-2" />
                  Project Image
                </label>
                
                {/* Upload Button */}
                <div className="flex gap-4 mb-3">
                  <label className="btn-primary cursor-pointer flex items-center gap-2">
                    <FaImage />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  <span className="text-gray-500 flex items-center">or paste URL below</span>
                </div>

                {/* Image URL Input */}
                <input
                  type="text"
                  value={formData.image || ''}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                  placeholder="https://example.com/image.jpg or emoji 🚀"
                />
                
                {/* Upload Error */}
                {uploadError && (
                  <p className="text-xs text-red-400 mt-1">{uploadError}</p>
                )}
                
                {/* Image Preview */}
                {formData.image && !formData.image.startsWith('http') && formData.image.length < 10 ? (
                  <div className="mt-3 text-4xl">{formData.image}</div>
                ) : formData.image && (
                  <div className="mt-3">
                    <Image 
                      src={formData.image} 
                      alt="Preview" 
                      width={128}
                      height={128}
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-2">
                  • Upload an image (JPG, PNG, GIF, WebP - max 5MB)<br />
                  • Or paste an image URL<br />
                  • Or use an emoji (e.g., 🚀, 💻, 🤖)
                </p>
              </div>

              {/* Technologies */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  rows={6}
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                  placeholder="Project description..."
                />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="w-5 h-5"
                />
                <label className="text-sm font-medium text-gray-300">Featured Project</label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <FaSave /> Save Project
              </button>
              <button onClick={handleCancel} className="btn-secondary flex items-center gap-2">
                <FaTimes /> Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Projects List */}
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect card-gradient rounded-xl p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies?.slice(0, 5).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 text-sm">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
                         className="text-primary-400 hover:text-primary-300">
                        Live Demo →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
                         className="text-primary-400 hover:text-primary-300">
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="p-2 glass-effect rounded-lg text-primary-400 hover:bg-primary-500/20 transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-2 glass-effect rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 glass-effect rounded-xl">
            <p className="text-gray-400">No projects yet. Click &quot;Add New Project&quot; to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
}

