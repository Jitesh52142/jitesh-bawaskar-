'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { FaExternalLinkAlt, FaGithub, FaStar } from 'react-icons/fa';

interface ProjectsProps {
  projects: any[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState('All');
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const categories = ['All', ...Array.from(new Set(projects?.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects?.filter(p => p.category === filter);

  const toggleProjectExpansion = (projectId: number) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
            >
              <span className="text-sm text-white/80 font-medium">💼 Portfolio</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explore my portfolio of AI-powered applications, automation tools, and full-stack solutions
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-2xl shadow-yellow-500/50 scale-110 ring-4 ring-yellow-500/50 border-2 border-yellow-500'
                    : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-2 border-white/10 hover:border-white/20 hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Project Header */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-dark-400/20 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    // If image is an emoji (single character or very short)
                    project.image.length <= 4 && !project.image.startsWith('http') && !project.image.startsWith('/') && !project.image.startsWith('data:') ? (
                      <div className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                        {project.image}
                      </div>
                    ) : (
                      // If image is a URL, Base64, or uploaded file path
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        unoptimized={project.image.startsWith('data:')}
                        onError={(e) => {
                          // Fallback to category emoji if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    )
                  ) : (
                    // Default category emoji
                    <div className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                      {project.category === 'AI Automation' && '🤖'}
                      {project.category === 'Machine Learning' && '📊'}
                      {project.category === 'Full Stack' && '💻'}
                      {project.category === 'AI Chatbot' && '💬'}
                      {project.category === 'Data Analytics' && '📈'}
                      {project.category === 'Marketing Automation' && '📱'}
                      {project.category === 'Healthcare AI' && '🏥'}
                      {project.category === 'Social Media' && '🌐'}
                      {project.category === 'Research Tools' && '🔬'}
                      {project.category === 'Business Tools' && '💼'}
                      {!['AI Automation', 'Machine Learning', 'Full Stack', 'AI Chatbot', 'Data Analytics', 'Marketing Automation', 'Healthcare AI', 'Social Media', 'Research Tools', 'Business Tools'].includes(project.category) && '📁'}
                    </div>
                  )}
                  {/* Fallback emoji (hidden by default, shown if image fails) */}
                  <div className="hidden text-6xl opacity-50">
                    {project.category === 'AI Automation' && '🤖'}
                    {project.category === 'Machine Learning' && '📊'}
                    {project.category === 'Full Stack' && '💻'}
                    {project.category === 'AI Chatbot' && '💬'}
                    {project.category === 'Data Analytics' && '📈'}
                    {project.category === 'Marketing Automation' && '📱'}
                    {project.category === 'Healthcare AI' && '🏥'}
                    {project.category === 'Social Media' && '🌐'}
                    {project.category === 'Research Tools' && '🔬'}
                    {project.category === 'Business Tools' && '💼'}
                    {!['AI Automation', 'Machine Learning', 'Full Stack', 'AI Chatbot', 'Data Analytics', 'Marketing Automation', 'Healthcare AI', 'Social Media', 'Research Tools', 'Business Tools'].includes(project.category) && '📁'}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-gray-300">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-yellow-500 transition-all duration-300 mb-3">
                    {project.title}
                  </h3>

                  <div className="mb-4">
                    <p className={`text-gray-400 text-sm ${!expandedProjects.has(project.id) ? 'line-clamp-3' : ''}`}>
                      {project.description}
                    </p>
                    {project.description && project.description.length > 150 && (
                      <button
                        onClick={() => toggleProjectExpansion(project.id)}
                        className="text-primary-400 hover:text-primary-300 text-sm font-medium mt-2 transition-colors duration-200"
                      >
                        {expandedProjects.has(project.id) ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-primary-500/20 text-primary-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="px-3 py-1 text-xs bg-gray-700/50 text-gray-400 rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  {project.stats && (
                    <div className="grid grid-cols-3 gap-2 mb-4 p-3 glass-effect rounded-lg">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                          <div className="text-sm text-primary-400 font-semibold">{value as string}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 mt-6">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold text-sm rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <FaGithub /> Code
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

