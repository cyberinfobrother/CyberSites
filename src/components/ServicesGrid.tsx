import React, { useState } from 'react';
import { ArrowRight, Check, X, Shield, Clock, HardDrive, Cpu, ExternalLink, Mail, Phone } from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import { IconResolver } from './IconResolver';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesGridProps {
  onSelectService?: (id: string, origin?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestEmail, setRequestEmail] = useState('');

  const handleOpenModal = (service: ServiceItem) => {
    setActiveService(service);
    setRequestSubmitted(false);
    setRequestEmail('');
  };

  const handleCloseModal = () => {
    setActiveService(null);
  };

  const handleRequestService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestEmail) return;
    setRequestSubmitted(true);
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-12 h-1.5 bg-blue-600 mx-auto mb-4 rounded-full" />
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-gray-900 tracking-tight mb-4">
            Tailored IT Services
          </h2>
          <p className="text-gray-600 font-sans text-base max-w-2xl mx-auto">
            Providing high-availability technical management and bespoke architectural alignments to drive modern enterprise scalability.
          </p>
        </div>

        {/* Grid of 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-white p-8 rounded-xl border border-border-subtle shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <IconResolver name={service.iconName} className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 font-sans text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <button
                onClick={() => onSelectService ? onSelectService(service.id, 'services') : handleOpenModal(service)}
                className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors text-left cursor-pointer"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal Drawer */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-xl shadow-2xl border border-border-subtle max-w-2xl w-full relative z-10 overflow-hidden flex flex-col text-left"
            >
              {/* Decorative top blue bar */}
              <div className="h-2 bg-gradient-to-r from-blue-700 to-blue-500" />

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <IconResolver name={activeService.iconName} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-gray-900">{activeService.title}</h3>
                    <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Enterprise Technical Pillar</p>
                  </div>
                </div>

                <p className="text-gray-600 font-sans text-sm leading-relaxed mb-6">
                  {activeService.description}
                </p>

                <div className="space-y-6">
                  {/* Scope of Work */}
                  <div>
                    <h4 className="text-xs font-display font-bold uppercase tracking-widest text-gray-400 mb-3">Service Scope Included:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeService.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                          <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Architecture & SLA parameters */}
                  <div className="bg-surface-alt p-5 rounded-lg border border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-[11px] font-display font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" /> Service Level Agreement (SLA)
                      </h5>
                      <p className="text-xs text-gray-800 font-medium leading-relaxed">{activeService.sla}</p>
                    </div>
                    <div>
                      <h5 className="text-[11px] font-display font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <Cpu className="w-3.5 h-3.5 text-blue-600" /> Core Architecture
                      </h5>
                      <p className="text-xs text-gray-600 leading-relaxed">{activeService.architecture}</p>
                    </div>
                  </div>
                </div>

                {/* Simulated Inquiry Callback */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <AnimatePresence mode="wait">
                    {!requestSubmitted ? (
                      <form onSubmit={handleRequestService} className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                          <input
                            type="email"
                            value={requestEmail}
                            onChange={(e) => setRequestEmail(e.target.value)}
                            required
                            placeholder="Enter work email for SLA guidelines..."
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                        >
                          Request Consultation <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-lg text-xs flex items-center gap-2.5"
                      >
                        <Shield className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Consultation registered for {requestEmail}!</p>
                          <p className="text-gray-600 mt-0.5">We will send standard pricing templates and schedule a systems architect meeting shortly.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
