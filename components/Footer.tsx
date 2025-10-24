'use client';

import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-effect py-8 mt-20">
      <div className="container-custom">
        <div className="flex justify-center items-center">
          <div className="text-gray-400 text-sm">
            {/* Footer content removed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

