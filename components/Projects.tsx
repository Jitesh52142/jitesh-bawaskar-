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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
            <span className="inline-block hover:animate-pulse-slow">Featured Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-dark-400 mx-auto mb-8"></div>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            <span className="inline-block hover:animate-bounce-gentle">Explore my portfolio of AI-powered applications, automation tools, and full-stack solutions</span>
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  filter === category
                    ? 'bg-warm-white-500 text-black shadow-lg border-2 border-warm-white-600'
                    : 'glass-effect text-gray-400 hover:bg-warm-white-500/10 border border-warm-white-500/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="glass-effect card-gradient rounded-xl overflow-hidden card-hover group"
              >
                {/* Project Header */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-dark-400/20 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    // If image is an emoji (single character or very short)
                    project.image.length <= 4 && !project.image.startsWith('http') && !project.image.startsWith('/') ? (
                      <div className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                        {project.image}
                      </div>
                    ) : (
                      // If image is a URL or uploaded file path
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

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
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-primary text-center flex items-center justify-center gap-2 text-sm py-2"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-secondary text-center flex items-center justify-center gap-2 text-sm py-2"
                      >
                        <FaGithub /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

