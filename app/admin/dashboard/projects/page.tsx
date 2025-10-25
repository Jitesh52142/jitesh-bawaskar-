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
  const [successMessage, setSuccessMessage] = useState('');

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
        setSuccessMessage(isCreating ? 'Project created successfully!' : 'Project updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
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
        setSuccessMessage('Project deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
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

    // Validate file size before uploading
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadError('File too large. Maximum size is 5MB.');
      return;
    }

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

      if (response.ok && data.success) {
        handleInputChange('image', data.imageUrl);
        setUploadError('');
        setSuccessMessage('Image uploaded successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setUploadError(data.error || 'Upload failed');
      }
    } catch (error) {
      setUploadError('Failed to upload image. Please try again.');
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
        {/* Success Toast Notification */}
        {successMessage && (
          <div className="fixed top-4 right-4 z-50 animate-fadeInUp">
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">{successMessage}</span>
            </div>
          </div>
        )}

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
                
                {/* Upload Messages */}
                {uploadError && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-sm text-red-400">{uploadError}</p>
                  </div>
                )}
                {successMessage && !uploadError && (
                  <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-green-400">Ready to save</p>
                  </div>
                )}
                
                {/* Image Preview */}
                {formData.image && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Preview:</p>
                    {formData.image.length < 10 && !formData.image.startsWith('http') && !formData.image.startsWith('data:') ? (
                      <div className="text-6xl p-4 bg-black/20 rounded-lg inline-block">{formData.image}</div>
                    ) : (
                      <div className="relative">
                        <Image 
                          src={formData.image} 
                          alt="Preview" 
                          width={200}
                          height={200}
                          className="w-48 h-48 object-cover rounded-lg border-2 border-warm-white-700/30"
                          unoptimized={formData.image.startsWith('data:')}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const errorDiv = target.nextElementSibling as HTMLElement;
                            if (errorDiv) errorDiv.style.display = 'block';
                          }}
                        />
                        <div className="hidden mt-2 p-2 bg-red-500/10 rounded text-sm text-red-400">
                          Failed to load image preview
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-3">
                  📤 <strong>Upload an image</strong> (JPG, PNG, GIF, WebP - max 5MB) - Saved to MongoDB Atlas<br />
                  🔗 <strong>Or paste an image URL</strong><br />
                  😊 <strong>Or use an emoji</strong> (e.g., 🚀, 💻, 🤖)
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

