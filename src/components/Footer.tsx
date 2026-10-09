import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Globe, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface FooterProps {
  onSelectFooterPage?: (page: 'privacy' | 'terms' | 'locations' | 'sitemap') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectFooterPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0B1120] text-white pt-20 pb-8 text-left border-t border-slate-800 relative overflow-hidden">
      {/* Structural design meshes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16 border-b border-white/10">
        {/* InfoPro Branding */}
        <div className="md:col-span-4 space-y-5">
          <a href="#home" onClick={handleScrollToTop} className="group inline-block focus:outline-none">
            <Logo variant="dark" size="md" />
          </a>
          <p className="text-gray-400 font-sans text-xs leading-relaxed max-w-sm">
            High-performance technology solutions for enterprise organizations worldwide. Professional, Trusted, Sophisticated. We modernize your core architecture safely.
          </p>

          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-400 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-400 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-400 transition-all">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-display font-bold uppercase tracking-wider text-blue-200">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs text-gray-400 font-sans">
            <li>
              <button 
                onClick={(e) => { e.preventDefault(); onSelectFooterPage?.('privacy'); }}
                className="hover:text-blue-400 transition-colors cursor-pointer text-left focus:outline-none"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button 
                onClick={(e) => { e.preventDefault(); onSelectFooterPage?.('terms'); }}
                className="hover:text-blue-400 transition-colors cursor-pointer text-left focus:outline-none"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button 
                onClick={(e) => { e.preventDefault(); onSelectFooterPage?.('locations'); }}
                className="hover:text-blue-400 transition-colors cursor-pointer text-left focus:outline-none"
              >
                Global Locations
              </button>
            </li>
            <li>
              <button 
                onClick={(e) => { e.preventDefault(); onSelectFooterPage?.('sitemap'); }}
                className="hover:text-blue-400 transition-colors cursor-pointer text-left focus:outline-none"
              >
                Sitemap
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-display font-bold uppercase tracking-wider text-blue-200">
            Contact Us
          </h4>
          <ul className="space-y-3.5 text-xs text-gray-400 font-sans">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>Headquarters:<br />123 Enterprise Plaza<br />Silicon Valley, CA 94000</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <a href="mailto:contact@infoprocyber.com" className="hover:text-blue-400 transition-colors">contact@infoprocyber.com</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <a href="tel:+18005550199" className="hover:text-blue-400 transition-colors">+1 (800) 555-0199</a>
            </li>
          </ul>
        </div>

        {/* Newsletter form */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-display font-bold uppercase tracking-wider text-blue-200">
            Newsletter
          </h4>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Stay updated on enterprise tech trends.
          </p>

          <AnimatePresence mode="wait">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-display text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  SUBSCRIBE <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs flex items-center gap-2"
              >
                <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>Subscription registered! Welcome to InfoPro Cyber Briefing.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Subfooter */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-[10px] font-sans gap-4">
        <div>
          © 2026 InfoPro Cybersecurity, Inc. All rights reserved.
        </div>
        <div className="flex gap-4 items-center">
          <a href="#" className="hover:text-blue-400">GDPR Compliant</a>
          <span>•</span>
          <a href="#" className="hover:text-blue-400">SOC 2 Verified</a>
          <span>•</span>
          <span className="flex items-center gap-1 text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> ISO/IEC 27001
          </span>
        </div>
      </div>
    </footer>
  );
};
