/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { SERVICES } from '../data';
import { DentalService } from '../types';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
  selectedService: string;
}

// Helper to resolve icon name to Lucide components dynamically
const ServiceIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

export default function Services({ onSelectService, selectedService }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'preventive' | 'restorative' | 'cosmetic' | 'surgical'>('all');

  const filteredServices = SERVICES.filter(
    (service) => activeTab === 'all' || service.category === activeTab
  );

  const tabs = [
    { id: 'all', label: 'All Treatments' },
    { id: 'preventive', label: 'Preventive' },
    { id: 'restorative', label: 'Restorative' },
    { id: 'cosmetic', label: 'Cosmetic / Smile' },
    { id: 'surgical', label: 'Surgical' },
  ] as const;

  return (
    <section id="services" className="py-20 bg-slate-50 relative">
      {/* Background patterns */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-emerald-50/40 blur-3xl -z-10 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4 mb-12">
          <span className="text-teal-600 text-xs font-extrabold tracking-widest uppercase bg-teal-50 px-3 py-1 rounded-full self-center border border-teal-100">
            Professional Procedures
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
            Comprehensive Dental Services
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Discover customized dental care designed to restore, protect, and brighten your smile. 
            Select any treatment to initiate a direct booking request.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-200/60 pb-4 max-w-3xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-100'
                  : 'text-slate-500 hover:text-teal-600 hover:bg-white border border-transparent hover:border-slate-200/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const isSelected = selectedService === service.title;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-teal-500 ring-2 ring-teal-500/10 shadow-xl shadow-teal-50/50'
                    : 'border-slate-100 hover:border-teal-100 shadow-lg hover:shadow-xl shadow-slate-100/50 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Icon & Category */}
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white'
                    }`}>
                      <ServiceIcon name={service.icon} className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  {/* Highlights/Benefits */}
                  <ul className="mt-4 space-y-2 border-t border-slate-50 pt-4">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Icons.CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer details & Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                    <span>Duration:</span>
                    <span className="text-slate-800 font-mono">{service.duration}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                    <span>Est. Cost:</span>
                    <span className="text-teal-600 font-bold font-mono">{service.costRange}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      onSelectService(service.title);
                      // Scroll smoothly to appointment section
                      const target = document.getElementById('appointment');
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-teal-100 text-teal-800 font-extrabold border border-teal-200'
                        : 'bg-slate-50 text-slate-700 hover:bg-teal-600 hover:text-white border border-slate-100 hover:border-teal-600'
                    }`}
                  >
                    {isSelected ? '✓ Selected for Booking' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing notice */}
        <div className="mt-12 bg-slate-100/50 p-4 rounded-2xl border border-slate-200/50 text-center max-w-xl mx-auto flex items-center gap-3">
          <Icons.Info className="w-5 h-5 text-teal-600 shrink-0" />
          <p className="text-[11px] text-slate-500 text-left">
            <strong>Note on Pricing:</strong> The estimates displayed above are based on standard dental protocols. 
            Exact treatment charges depend on individual diagnosis during your clinical checkup at Al Rasheed Memorial Hospital.
          </p>
        </div>

      </div>
    </section>
  );
}
