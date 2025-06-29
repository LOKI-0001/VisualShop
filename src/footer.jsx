import React from "react";
import { FiMail, FiGithub, FiTwitter } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => (
  <footer className="bg-gray-900 text-white px-4 sm:px-8 py-8 w-full relative bottom-0 left-0 z-50 border-t-4 border-gradient-to-r from-yellow-300 via-pink-300 to-indigo-400">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      {/* Brand & Contact */}
      <div className="flex flex-col items-start">
        <div className="mb-1 font-extrabold text-2xl text-yellow-300 tracking-wide flex items-center gap-2">
          <img
            src="https://img.icons8.com/color/48/000000/shopping-cart--v2.png"
            alt="logo"
            className="w-7 h-7"
          />
          VisualShop
        </div>
        <div className="mb-1 text-left text-sm flex items-center gap-2">
          <FiMail className="inline-block text-yellow-200" />
          <a
            href="mailto:vkjha00001@gmail.com"
            className="text-yellow-200 hover:underline break-all"
          >
            vkjha00001@gmail.com
          </a>
        </div>
        <div className="mb-1 text-left text-sm flex items-center gap-2">
  {/* Example: Phone */}
  <span className="inline-block text-yellow-200">📞</span>
  <a
    href="tel:+1234567890"
    className="text-yellow-200 hover:underline break-all"
  >
    +1 234 567 890
  </a>
</div>
<div className="mb-1 text-left text-sm flex items-center gap-2">
  {/* Example: LinkedIn */}
<FaLinkedin className="inline-block text-yellow-200" />
  <a
    href="https://linkedin.com/in/yourprofile"
    target="_blank"
    rel="noopener noreferrer"
    className="text-yellow-200 hover:underline break-all"
  >
    linkedin.com/in/yourprofile
  </a>
</div>
        <div className="flex gap-4 mt-2">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            <FiGithub size={20} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            <FiTwitter size={20} />
          </a>
        </div>
      </div>
      {/* Copyright */}
      <div className="w-full sm:w-auto text-center mt-4 sm:mt-0 text-sm text-gray-300">
        &copy; {new Date().getFullYear()} VisualShop. All rights reserved.
      </div>
      <div className="w-full sm:w-auto text-center text-lg text-gray-400 mt-2">
  Design and developed by V
</div>
    </div>
  </footer>
);

export default Footer;