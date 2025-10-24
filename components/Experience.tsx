'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

interface ExperienceProps {
  experiences: any[];
}

const Experience = ({ experiences }: ExperienceProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="section-padding bg-gradient-to-b from-transparent to-dark-100/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
            <span className="inline-block hover:animate-pulse-slow">Work Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-dark-400 mx-auto mb-12"></div>

          <div className="max-w-4xl mx-auto">
            {experiences?.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline Line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-transparent hidden md:block"></div>
                )}

                <div className="glass-effect card-gradient rounded-xl p-6 md:p-8 card-hover">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-dark-400 rounded-full flex items-center justify-center text-2xl">
                        <FaBriefcase />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {exp.role}
                          </h3>
                          <div className="text-primary-400 font-semibold mb-2">
                            {exp.company}
                          </div>
                        </div>
                        {exp.current && (
                          <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold w-fit">
                            Current
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-primary-400" />
                          {exp.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-primary-400" />
                          {exp.duration}
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-2 mb-4">
                        {exp.description?.map((item: string, i: number) => (
                          <li key={i} className="text-gray-300 flex items-start gap-2">
                            <span className="text-primary-400 mt-1">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Impact */}
                      {exp.impact && (
                        <div className="glass-effect rounded-lg p-4 mb-4">
                          <div className="text-sm text-gray-500 mb-1">Impact</div>
                          <div className="text-primary-400 font-semibold">{exp.impact}</div>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies?.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs bg-primary-500/20 text-primary-300 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
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

export default Experience;

