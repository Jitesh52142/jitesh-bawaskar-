'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AboutProps {
  bio: any;
}

const About = ({ bio }: AboutProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-transparent to-dark-100/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-dark-400 mx-auto mb-12"></div>

          <div className="glass-effect card-gradient rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Bio Text */}
              <div className="md:col-span-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                  className="space-y-4 text-gray-300 text-lg leading-relaxed"
                >
                  {bio?.bio?.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <a href="#contact" className="btn-primary">
                    Get In Touch
                  </a>
                  <a href="#projects" className="btn-secondary">
                    View Projects
                  </a>
                </motion.div>
              </div>

              {/* Contact Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="glass-effect rounded-xl p-6 h-fit"
              >
                <h3 className="text-xl font-bold mb-6 gradient-text">Contact Info</h3>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <a 
                      href={`mailto:${bio?.email}`}
                      className="hover:text-primary-400 transition-colors break-all"
                    >
                      {bio?.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone</div>
                    <a 
                      href={`tel:${bio?.phone}`}
                      className="hover:text-primary-400 transition-colors"
                    >
                      {bio?.phone}
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Location</div>
                    <p>{bio?.location}</p>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Resume</div>
                    <a 
                      href={bio?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      Download PDF
                    </a>
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

export default About;

