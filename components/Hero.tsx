'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDownload, FaArrowDown } from 'react-icons/fa';
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
    <section id="home" className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* Badge */}
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/70 font-medium mb-4 text-lg"
            >
              👋 Hi, I&apos;m
            </motion.div>

            {/* Name with Special Styling */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text block">{bio?.name?.split(' ')[0] || 'Jitesh'}</span>
              <span className="text-white block mt-2">{bio?.name?.split(' ').slice(1).join(' ') || 'Bawaskar'}</span>
            </motion.h1>

            {/* Title with Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="inline-block px-6 py-3 bg-white/5 border-l-4 border-yellow-500 rounded-r-lg">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                  {bio?.title || 'AI & Automation Engineer'}
                </h2>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 leading-relaxed max-w-2xl"
            >
              {bio?.tagline || 'Building Intelligent Systems that Blend Automation, Data, and Design'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a 
                href="#projects" 
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <FaArrowDown className="group-hover:animate-bounce" />
                </span>
              </a>
              <a 
                href={bio?.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 flex items-center gap-2"
              >
                <FaDownload className="group-hover:animate-bounce" />
                Download Resume
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <span className="text-gray-400 text-sm">Connect:</span>
              <div className="flex gap-3">
                {socialIcons.map((social, index) => (
                  social.url && (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300"
                      title={social.label}
                    >
                      <social.icon className="text-lg" />
                    </motion.a>
                  )
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Professional Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { 
                  label: 'Projects', 
                  value: bio?.stats?.projectsCompleted || 11, 
                  suffix: '+',
                  color: 'from-blue-500 to-cyan-500'
                },
                { 
                  label: 'Hackathons', 
                  value: bio?.stats?.hackathonsParticipated || 12, 
                  suffix: '+',
                  color: 'from-purple-500 to-pink-500'
                },
                { 
                  label: 'Experience', 
                  value: bio?.stats?.yearsExperience || 1, 
                  suffix: '+ Years',
                  color: 'from-green-500 to-emerald-500'
                },
                { 
                  label: 'Technologies', 
                  value: bio?.stats?.technologiesMastered || 25, 
                  suffix: '+',
                  color: 'from-orange-500 to-red-500'
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-default overflow-hidden"
                >
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2"
                    >
                      {stat.value}{stat.suffix}
                    </motion.div>
                    <div className="text-gray-400 text-xs sm:text-sm font-medium">{stat.label}</div>
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full"></div>
                </motion.div>
              ))}
            </div>

            {/* Decorative Element */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
            ></motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <FaArrowDown className="text-xl" />
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"
      />
    </section>
  );
};

export default Hero;

