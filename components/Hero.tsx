'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDownload } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';

interface HeroProps {
  bio: any;
}

const Hero = ({ bio }: HeroProps) => {
  const socialIcons = [
    { icon: FaGithub, url: bio?.social?.github, label: 'GitHub' },
    { icon: FaLinkedin, url: bio?.social?.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, url: bio?.social?.twitter, label: 'Twitter' },
    { icon: FaInstagram, url: bio?.social?.instagram, label: 'Instagram' },
    { icon: SiLeetcode, url: bio?.social?.leetcode, label: 'LeetCode' },
    { icon: SiHackerrank, url: bio?.social?.hackerrank, label: 'HackerRank' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center section-padding pt-32">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="text-warm-white-500 font-semibold mb-4 text-lg"
            >
              <span className="inline-block animate-bounce-gentle">👋</span> Hi, I&apos;m
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
              className="text-5xl md:text-7xl font-bold mb-4 gradient-text"
            >
              <span className="inline-block hover:animate-pulse-slow">{bio?.name || 'Jitesh Bawaskar'}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 60 }}
              className="text-2xl md:text-3xl text-gray-300 mb-6"
            >
              <span className="inline-block hover:animate-bounce-gentle">{bio?.title || 'AI & Automation Engineer'}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 40 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed"
            >
              <span className="inline-block hover:animate-pulse-slow">{bio?.tagline || 'Building Intelligent Systems that Blend Automation, Data, and Design'}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a href="#projects" className="btn-primary">
                View My Work
              </a>
              <a 
                href={bio?.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <FaDownload /> Download Resume
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4"
            >
              {socialIcons.map((social, index) => (
                social.url && (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, rotate: 10, y: -5 }}
                    whileTap={{ scale: 0.8 }}
                    className="text-2xl text-gray-400 hover:text-warm-white-500 transition-all duration-300 hover:drop-shadow-lg"
                    title={social.label}
                  >
                    <social.icon />
                  </motion.a>
                )
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: 'Projects Completed', value: bio?.stats?.projectsCompleted || 11, suffix: '+' },
              { label: '12+ Hackathons Participated', value: bio?.stats?.hackathonsParticipated || 12, suffix: '+' },
              { label: 'Years Experience', value: bio?.stats?.yearsExperience || 1, suffix: '+' },
              { label: 'Technologies', value: bio?.stats?.technologiesMastered || 25, suffix: '+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.08, y: -5 }}
                className="glass-effect card-gradient rounded-xl p-6 text-center card-hover"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-4xl font-bold gradient-text mb-2"
                >
                  {stat.value}{stat.suffix}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-20 h-20 bg-warm-white-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-32 h-32 bg-warm-white-500/10 rounded-full blur-xl"
        />
      </div>
    </section>
  );
};

export default Hero;

