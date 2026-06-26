/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Smile, Phone, MessageSquare, Menu, X, Clock } from 'lucide-react';
import { CLINIC_INFO, OPERATING_HOURS } from '../data';

interface HeaderProps {
  currentDay: string;
  isClinicOpen: boolean;
  nextOpeningText: string;
}

export default function Header({ currentDay, isClinicOpen, nextOpeningText }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Appointment', href: '#appointment' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location & Hours', href: '#location-hours' }
  ];

  return (
    <header id="header-root" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Banner Alert */}
      <div id="top-announcement-bar" className="bg-teal-700 text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center transition-colors">
        <div className="flex items-center gap-2 mx-auto sm:mx-0 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Professional Dental Surgeon in Attock — Accepting Appointments</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <a href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`} className="hover:underline flex items-center gap-1 font-mono">
            <Phone className="w-3.5 h-3.5" /> {CLINIC_INFO.phone}
          </a>
          <span className="text-teal-300">|</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Opens 9 AM Saturdays</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav id="main-navigation" className={`px-4 lg:px-8 py-4 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3' : 'bg-white/80 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <a id="nav-brand" href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-100 group-hover:scale-105 transition-transform">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg tracking-tight text-slate-800 block leading-tight">
                Dr. Javeria
              </span>
              <span className="text-xs text-teal-600 font-medium tracking-widest uppercase block -mt-0.5">
                Dental Clinic
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div id="desktop-menu" className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Dynamic Status Badges */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              {isClinicOpen ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-subtle" />
                  Open Now
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Closed ({nextOpeningText})
                </span>
              )}

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsAppPhone}?text=Hello%20Dr.%20Javeria%20Dental%20Clinic%2C%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment.`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-teal-600 hover:bg-teal-50/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed inset-0 top-[88px] z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-t border-slate-100 lg:hidden flex flex-col justify-between p-6 ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Navigation</span>
            {isClinicOpen ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                Open Now
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-100">
                <span className="w-1 h-1 rounded-full bg-rose-500" />
                Closed ({nextOpeningText})
              </span>
            )}
          </div>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-bold text-slate-800 hover:text-teal-600 transition-colors py-2 block"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
          <a
            href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
            className="w-full bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all border border-teal-100"
          >
            <Phone className="w-5 h-5" />
            Call: {CLINIC_INFO.phone}
          </a>
          <a
            href={`https://wa.me/${CLINIC_INFO.whatsAppPhone}?text=Hello%20Dr.%20Javeria%20Dental%20Clinic%2C%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment.`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-100"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            WhatsApp Booking
          </a>
        </div>
      </div>
    </header>
  );
}
