/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, MapPin, Phone, ShieldCheck, Award, Smile } from 'lucide-react';
import { CLINIC_INFO } from '../data';
import heroImage from '../assets/images/dental_clinic_hero_1782496746296.jpg';

export default function Hero() {
  return (
    <section id="home" className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/60 to-white">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-100/30 blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-sky-100/40 blur-2xl -z-10 -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-7 flex flex-col gap-6" id="hero-content">
            {/* Tagline Badge */}
            <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100/60 border border-teal-200/80 text-teal-800 text-xs font-bold tracking-wide uppercase shadow-sm">
              <Smile className="w-4 h-4 text-teal-600 animate-bounce" />
              <span>{CLINIC_INFO.tagline}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 leading-tight">
              Quality Dental Care <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                You Can Always Trust
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Welcome to <span className="font-semibold text-slate-800">{CLINIC_INFO.name}</span> in Attock. 
              Led by <span className="font-semibold text-slate-800">{CLINIC_INFO.dentistName}</span>, a qualified dental surgeon offering 
              premium, pain-free dental care. We strictly follow hygiene, sterilization, and modern safety protocols 
              to ensure your family&apos;s health.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Sterilization</h4>
                  <p className="text-xs text-slate-500">100% Autoclaved tools</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Dental Surgeon</h4>
                  <p className="text-xs text-slate-500">Qualified specialist</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Smile Care</h4>
                  <p className="text-xs text-slate-500">Painless treatment</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#appointment"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-teal-100 hover:shadow-xl transition-all hover:-translate-y-0.5 text-center text-sm"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </a>
              <a
                href="#location-hours"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-teal-600 font-extrabold px-8 py-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow transition-all hover:-translate-y-0.5 text-center text-sm"
              >
                <MapPin className="w-5 h-5 text-teal-500" />
                Find Clinic Location
              </a>
              <a
                href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                className="inline-flex sm:hidden items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold px-8 py-4 rounded-2xl border border-teal-100 text-center text-sm"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>

          {/* Right Side: Responsive Image Grid */}
          <div className="lg:col-span-5 relative" id="hero-media">
            <div className="relative mx-auto max-w-[450px] lg:max-w-none">
              {/* Background solid design badge */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-500/10 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-500/10 rounded-2xl -z-10" />
              
              {/* Styled Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border-[6px] border-white shadow-2xl shadow-slate-200 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] bg-slate-100">
                <img
                  src={heroImage}
                  alt="Dr. Javeria Dental Clinic Interior and Reception"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image Overlay Label */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-md border border-white/50 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Al Rasheed Memorial Hospital</p>
                    <p className="text-[10px] text-slate-500">Attock, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Patient Trust Tag */}
              <div className="absolute -top-6 -right-4 bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3">
                <div className="bg-teal-500/20 text-teal-400 p-2 rounded-xl">
                  <Smile className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-amber-400 text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-xs font-semibold">100% Happy Patients</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
