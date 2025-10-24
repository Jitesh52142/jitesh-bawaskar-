'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

interface SkillsProps {
  skills: any[];
}

const Skills = ({ skills }: SkillsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
            <span className="inline-block hover:animate-pulse-slow">Technical Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-dark-400 mx-auto mb-8"></div>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            <span className="inline-block hover:animate-bounce-gentle">Technologies and tools I use to bring ideas to life</span>
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {skills?.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="glass-effect card-gradient rounded-xl p-6 card-hover"
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    <span className="inline-block hover:animate-bounce-gentle">{skillGroup.category}</span>
                  </h3>
                  <div className="text-primary-400 font-semibold">
                    <span className="inline-block hover:animate-pulse-slow">{skillGroup.proficiency}%</span>
                  </div>
                </div>

                {/* Proficiency Bar */}
                <div className="w-full h-2 bg-gray-700/50 rounded-full mb-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skillGroup.proficiency}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className={`h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300 ${
                      hoveredSkill === index ? 'animate-pulse-slow shadow-lg' : ''
                    }`}
                  />
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items?.map((skill: string, i: number) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 glass-effect rounded-lg text-sm text-gray-300 hover:bg-primary-500/20 hover:text-primary-300 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-12 glass-effect card-gradient rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold gradient-text mb-6">
              Core Competencies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { 
                  label: 'AI & Automation', 
                  icon: (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl transform rotate-3"></div>
                      <div className="absolute inset-1 bg-gradient-to-br from-blue-500 to-purple-700 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-gradient-to-br from-blue-600 to-purple-800 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2 md:h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                },
                { 
                  label: 'Full Stack Dev', 
                  icon: (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg transform -rotate-2"></div>
                      <div className="absolute inset-1 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-5 sm:w-9 sm:h-5 md:w-10 md:h-6 bg-gradient-to-b from-blue-500 to-blue-700 rounded-sm flex items-center justify-center">
                          <div className="w-6 h-3 sm:w-7 sm:h-3.5 md:w-8 md:h-4 bg-gradient-to-b from-blue-300 to-blue-500 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  )
                },
                { 
                  label: 'Cloud Deployment', 
                  icon: (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 to-blue-500 rounded-full transform rotate-6"></div>
                      <div className="absolute inset-1 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white rounded-full opacity-80"></div>
                      </div>
                      <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-white rounded-full opacity-60"></div>
                      <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-white rounded-full opacity-40"></div>
                    </div>
                  )
                },
                { 
                  label: 'Data Science', 
                  icon: (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg transform -rotate-1"></div>
                      <div className="absolute inset-1 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-6 sm:w-9 sm:h-7 md:w-10 md:h-8 flex items-end justify-between">
                          <div className="w-1.5 h-3 sm:w-1.5 sm:h-3.5 md:w-2 md:h-4 bg-white rounded-t-sm"></div>
                          <div className="w-1.5 h-4 sm:w-1.5 sm:h-5 md:w-2 md:h-6 bg-white rounded-t-sm"></div>
                          <div className="w-1.5 h-2 sm:w-1.5 sm:h-2.5 md:w-2 md:h-3 bg-white rounded-t-sm"></div>
                          <div className="w-1.5 h-3.5 sm:w-1.5 sm:h-4 md:w-2 md:h-5 bg-white rounded-t-sm"></div>
                        </div>
                      </div>
                    </div>
                  )
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-3 sm:p-4 glass-effect rounded-lg cursor-default"
                >
                  {item.icon}
                  <div className="text-xs sm:text-sm font-semibold text-gray-300 text-center leading-tight">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

