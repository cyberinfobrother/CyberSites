import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenQuoteModal?: () => void;
  onGoHome?: (targetSectionId?: string) => void;
  isServicePageActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal, onGoHome, isServicePageActive = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeScrolled = scrolled || isServicePageActive;

  const menuItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'SOLUTIONS', href: '#solutions' },
    { label: 'INDUSTRIES', href: '#industries' },
    { label: 'CONTACT', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isServicePageActive) {
      if (onGoHome) {
        onGoHome(href);
      }
    } else {
      const cleanId = href.replace('#', '');
      const element = document.getElementById(cleanId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        activeScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-sm py-3.5' 
          : 'bg-transparent py-5'
      }`}>
        <div 
          className="max-w-7xl mx-auto px-6 flex justify-between items-center transition-colors duration-300"
          style={{ color: activeScrolled ? undefined : '#f5f0f0' }}
        >
          {/* InfoPro Logo */}
          <a href="#home" className="group flex items-center focus:outline-none" onClick={(e) => handleNavClick(e, '#home')}>
            <Logo variant={activeScrolled ? 'light' : 'dark'} size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-display text-xs font-semibold tracking-wider transition-colors duration-300 relative group py-2 ${
                  activeScrolled 
                    ? 'text-gray-600 hover:text-blue-600' 
                    : 'text-slate-200 hover:text-blue-400'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-5">
            <a 
              href="tel:+18005550199" 
              className={`font-sans text-xs font-semibold flex items-center gap-1.5 transition-colors duration-300 ${
                activeScrolled 
                  ? 'text-gray-600 hover:text-blue-600' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              +1 (800) 555-0199
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 hover:shadow-lg cursor-pointer"
            >
              Get a Quote <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Burger button - Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden transition-colors duration-300 p-1 rounded-lg ${
              activeScrolled 
                ? 'text-gray-700 hover:text-blue-600' 
                : 'text-white hover:text-blue-400'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[70px] z-40 bg-white border-t border-border-subtle p-6 flex flex-col justify-between md:hidden shadow-xl"
          >
            <nav className="flex flex-col gap-4 py-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-display text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="space-y-4 border-t border-border-subtle pt-6">
              <a 
                href="tel:+18005550199" 
                className="flex items-center gap-2 font-sans text-sm text-gray-600 font-medium py-2"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                Call Desk: +1 (800) 555-0199
              </a>
              <a 
                href="mailto:contact@infoprocyber.com" 
                className="flex items-center gap-2 font-sans text-sm text-gray-600 font-medium py-2"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                contact@infoprocyber.com
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuoteModal) onOpenQuoteModal();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-display text-sm font-bold uppercase tracking-wider py-4 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Get a Quote <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
