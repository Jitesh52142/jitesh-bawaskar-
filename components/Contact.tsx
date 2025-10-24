'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaTrophy } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';

interface ContactProps {
  bio: any;
}

const Contact = ({ bio }: ContactProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: bio?.email, href: `mailto:${bio?.email}` },
    { icon: FaPhone, label: 'Phone', value: bio?.phone, href: `tel:${bio?.phone}` },
    { icon: FaMapMarkerAlt, label: 'Location', value: bio?.location, href: null },
  ];

  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', url: bio?.social?.github, color: 'hover:text-gray-400' },
    { icon: FaLinkedin, label: 'LinkedIn', url: bio?.social?.linkedin, color: 'hover:text-blue-400' },
    { icon: FaTwitter, label: 'Twitter', url: bio?.social?.twitter, color: 'hover:text-blue-400' },
    { icon: FaInstagram, label: 'Instagram', url: bio?.social?.instagram, color: 'hover:text-pink-400' },
    { icon: SiLeetcode, label: 'LeetCode', url: bio?.social?.leetcode, color: 'hover:text-yellow-400' },
    { icon: SiHackerrank, label: 'HackerRank', url: bio?.social?.hackerrank, color: 'hover:text-green-400' },
    { icon: FaTrophy, label: 'Unstop', url: bio?.social?.unstop, color: 'hover:text-purple-400' },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-dark-400 mx-auto mb-8"></div>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="glass-effect card-gradient rounded-xl p-4 flex items-center gap-4 hover:scale-105 transition-transform"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-dark-400 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                      <item.icon />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white hover:text-primary-400 transition-colors break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white">{item.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  className="glass-effect card-gradient rounded-xl p-6"
                >
                  <h4 className="text-xl font-bold mb-4 text-white">Connect With Me</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {socialLinks.map((social, index) => (
                      social.url && (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className={`text-3xl text-gray-400 ${social.color} transition-colors flex items-center justify-center`}
                          title={social.label}
                        >
                          <social.icon />
                        </motion.a>
                      )
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="glass-effect card-gradient rounded-xl p-8 flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Let&apos;s Work Together</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  I&apos;m currently available for freelance projects and full-time opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>
                
                <div className="space-y-4">
                  <a
                    href={`mailto:${bio?.email}`}
                    className="block w-full btn-primary text-center"
                  >
                    Send Me an Email
                  </a>
                  <a
                    href={bio?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full btn-secondary text-center"
                  >
                    Download Resume
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="glass-effect rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">24h</div>
                    <div className="text-xs text-gray-500">Response Time</div>
                  </div>
                  <div className="glass-effect rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">100%</div>
                    <div className="text-xs text-gray-500">Client Satisfaction</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

