"use client";

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + Copyright */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/EventFlowLogo.png"      // <-- must be inside public/logo.png
              alt="EventFlow Logo"
              width={45}
              height={45}
              className="object-contain"
            />
            <span className="text-xl font-bold text-white">EventFlow</span>
          </div>

          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EventFlow. All rights reserved.
          </p>
        </div>

        {/* Useful Links */}
        <div className="grid grid-cols-1 md:grid-cols-2  text-center md:text-left gap-2">
          

<div>
            <a href="#" className="hover:text-white transition">About Us</a>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms & Conditions</a>
</div>
         <div>
           <a href="#" className="hover:text-white transition">FAQ</a>
          <a href="#" className="hover:text-white transition">Support</a>
          <a href="#" className="hover:text-white transition">Careers</a>
          <a href="#" className="hover:text-white transition">Blog</a>
         </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>

          <div className="flex gap-4 text-lg">
            <a href="https://www.facebook.com/mdabed.azim" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/mohammad-abed-azim/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
