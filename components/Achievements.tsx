'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTrophy, FaAward, FaCode, FaStar, FaMedal, FaLightbulb } from 'react-icons/fa';

interface AchievementsProps {
  achievements: any[];
}

const Achievements = ({ achievements }: AchievementsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'trophy': return FaTrophy;
      case 'award': return FaAward;
      case 'code': return FaCode;
      case 'star': return FaStar;
      case 'medal': return FaMedal;
      case 'lightbulb': return FaLightbulb;
      default: return FaTrophy;
    }
  };

  return (
    <section id="achievements" className="section-padding bg-gradient-to-b from-transparent to-dark-100/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
            Achievements & Recognition
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-dark-400 mx-auto mb-8"></div>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Recognition and awards from national competitions and hackathons
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements?.map((achievement, index) => {
              const Icon = getIcon(achievement.icon);
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass-effect card-gradient rounded-xl p-6 card-hover relative overflow-hidden group"
                >
                  {/* Background Icon */}
                  <div className="absolute -right-6 -top-6 text-8xl opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon />
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-dark-400 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    <Icon />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {achievement.title}
                  </h3>
                  
                  <div className="text-primary-400 font-semibold mb-3">
                    {achievement.organization}
                  </div>

                  <p className="text-gray-400 text-sm mb-4">
                    {achievement.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {achievement.rank && (
                      <div className="px-3 py-1 glass-effect rounded-lg text-xs">
                        <span className="text-gray-500">Rank: </span>
                        <span className="text-primary-400 font-semibold">{achievement.rank}</span>
                      </div>
                    )}
                    {achievement.participants && (
                      <div className="px-3 py-1 glass-effect rounded-lg text-xs">
                        <span className="text-gray-500">Among: </span>
                        <span className="text-primary-400 font-semibold">{achievement.participants}</span>
                      </div>
                    )}
                  </div>

                  {/* Type Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs font-semibold">
                      {achievement.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(achievement.date).getFullYear()}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold text-center mb-8 gradient-text">
              Certifications
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'AWS Academy Cloud Foundations', issuer: 'AWS Academy' },
                { title: 'Introduction to SQL', issuer: 'Skill Up' },
                { title: 'Python for Data Science', issuer: 'Infosys' },
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-dark-400 rounded-full flex items-center justify-center text-xl mx-auto mb-4">
                    <FaAward />
                  </div>
                  <h4 className="font-bold text-white mb-2">{cert.title}</h4>
                  <p className="text-sm text-gray-400">{cert.issuer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;

