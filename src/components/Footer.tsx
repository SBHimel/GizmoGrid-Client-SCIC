'use client';

import Link from 'next/link';
// সোশ্যাল মিডিয়ার জন্য react-icons থেকে Font Awesome আইকন ইম্পোর্ট
import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa6';
// বাকি কন্টাক্ট আইকনগুলো lucide-react থেকে (এগুলো সব ভার্সনেই ফিক্সড থাকে)
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">
            GizmoGrid
          </Link>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Your ultimate destination for next-generation tech gadgets and smart gizmos. Explore, track, and manage cutting-edge technology today.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-4 tracking-wide text-sm uppercase">Quick Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Home Dashboard</Link>
            </li>
            <li>
              <Link href="/explore" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Explore Gizmos</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-cyan-400 transition-colors">Tech Blogs</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-cyan-400 transition-colors">About Our Vision</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal & Support */}
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-4 tracking-wide text-sm uppercase">Support & Legal</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/help" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Help Center</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="space-y-3 text-sm">
          <h4 className="text-slate-900 dark:text-white font-bold mb-4 tracking-wide text-sm uppercase">Contact Us</h4>
          <div className="flex items-center gap-2.5">
            <Mail size={16} className="text-cyan-500 dark:text-cyan-400 shrink-0" />
            <a href="mailto:s.b.himel21@gmail.com" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors break-all">
              s.b.himel21@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone size={16} className="text-cyan-500 dark:text-cyan-400 shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">+880 1700-000000</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin size={16} className="text-cyan-500 dark:text-cyan-400 shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">Dhaka, Bangladesh</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
        <p className="text-slate-500 dark:text-slate-500">&copy; {currentYear} GizmoGrid. All rights reserved.</p>
        
        {/* Social Links Using React Icons */}
        <div className="flex items-center gap-4">
          {/* GitHub */}
          <a href="https://github.com/SBHimel" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:scale-110 active:scale-95 transition-all" title="GitHub">
            <FaGithub size={18} />
          </a>
          
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/sbhimel/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:scale-110 active:scale-95 transition-all" title="LinkedIn">
            <FaLinkedinIn size={18} />
          </a>
          
          {/* Facebook */}
          <a href="https://www.facebook.com/s.b.himel.669113" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:scale-110 active:scale-95 transition-all" title="Facebook">
            <FaFacebookF size={18} />
          </a>
          
          {/* Instagram */}
          <a href="https://www.instagram.com/s.b.himel3/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:scale-110 active:scale-95 transition-all" title="Instagram">
            <FaInstagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}