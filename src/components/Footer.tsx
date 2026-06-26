/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Smile, Phone, MapPin, ArrowUp, MessageSquare, ChevronRight, Star } from 'lucide-react';
import { CLINIC_INFO } from '../data';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide the WhatsApp bubble after 10 seconds automatically to avoid clutter
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-root" className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800 relative z-30">
      
      {/* Scroll to Top Trigger */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 bg-teal-600 hover:bg-teal-500 text-white p-3.5 rounded-full shadow-lg hover:-translate-y-1 transition-all cursor-pointer border border-teal-500/30"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Glowing WhatsApp Button with Speech Bubble */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {showBubble && (
          <div className="bg-white text-slate-800 text-[11px] font-bold px-3 py-2 rounded-xl shadow-2xl border border-slate-100 flex items-center gap-2 max-w-xs animate-pulse-subtle">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Chat with Dr. Javeria 😬</span>
            <button 
              onClick={() => setShowBubble(false)} 
              className="text-slate-400 hover:text-slate-600 font-extrabold pl-1"
            >
              ×
            </button>
          </div>
        )}
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsAppPhone}?text=Hello%20Dr.%20Javeria%20Dental%20Clinic%2C%20I%20would%20like%20to%20ask%20a%20question%20about%20your%20clinical%20dental%20services.`}
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center animate-bounce-subtle border border-emerald-400/40 relative group"
          aria-label="Contact on WhatsApp"
        >
          <MessageSquare className="w-6.5 h-6.5 fill-current" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-emerald-500" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white">
                <Smile className="w-5.5 h-5.5" />
              </div>
              <span className="font-display font-extrabold text-lg text-white tracking-tight">
                {CLINIC_INFO.name}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mt-1">
              {CLINIC_INFO.bio} Keep smiling with your healthy teeth! We follow stringent medical protocols for full dental healthcare in Attock.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest">Clinic Menu</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-teal-400 transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5" /> Home page
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5" /> Dental Services
                </a>
              </li>
              <li>
                <a href="#appointment" className="hover:text-teal-400 transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5" /> Book Appointment
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-teal-400 transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5" /> Patient Reviews
                </a>
              </li>
              <li>
                <a href="#location-hours" className="hover:text-teal-400 transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5" /> Clinic Map &amp; Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest">Office Contacts</h4>
            
            <div className="flex flex-col gap-3.5 mt-1 text-xs sm:text-sm">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-teal-400 transition-colors font-mono">
                  {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Star className="w-5 h-5 text-amber-400 fill-current shrink-0" />
                <span className="font-semibold text-white">Rated 4.9/5 by Attock Community</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} Dr. Javeria Dental Clinic Attock. All rights reserved.
          </p>
          <div className="flex gap-6 text-slate-500">
            <span>Sterilization Protocol Certified</span>
            <span>•</span>
            <span>SEO Friendly Meta</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
