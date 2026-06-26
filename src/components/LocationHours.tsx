/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, Clock, Compass, ExternalLink, Calendar, Heart } from 'lucide-react';
import { CLINIC_INFO, OPERATING_HOURS } from '../data';

interface LocationHoursProps {
  currentDay: string;
  currentTimeString: string;
  isClinicOpen: boolean;
  nextOpeningText: string;
}

export default function LocationHours({ currentDay, currentTimeString, isClinicOpen, nextOpeningText }: LocationHoursProps) {
  return (
    <section id="location-hours" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4 mb-12">
          <span className="text-teal-600 text-xs font-extrabold tracking-widest uppercase bg-teal-50 px-3 py-1 rounded-full self-center border border-teal-100">
            Find Our Practice
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
            Clinic Location &amp; Timings
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Conveniently located at Al Rasheed Memorial Hospital in Attock. Refer to our comprehensive weekly schedule below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Contact Cards & Timings */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="practice-details">
            
            {/* Address & Direction Quick Link */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100/80 shadow-md flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clinic Address</h3>
                  <p className="text-sm font-semibold text-slate-800 mt-1.5 leading-relaxed">
                    {CLINIC_INFO.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    📍 Located directly opposite the Excise and Taxation Office.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={CLINIC_INFO.locationDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-100 transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  Get Directions Map
                </a>
                <a
                  href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                  className="bg-white hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-200 shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  Call: {CLINIC_INFO.phone}
                </a>
              </div>
            </div>

            {/* Dynamic Status Dashboard */}
            <div className={`p-6 rounded-3xl border transition-all duration-300 shadow-md ${
              isClinicOpen 
                ? 'bg-emerald-50/50 border-emerald-100' 
                : 'bg-rose-50/50 border-rose-100'
            }`}>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/40">
                <div className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 ${isClinicOpen ? 'text-emerald-600' : 'text-rose-600'}`} />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dynamic Clinic Status</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-bold">Local Clock: {currentTimeString}</span>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className={`w-3.5 h-3.5 rounded-full ${isClinicOpen ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`} />
                <div>
                  <h4 className="text-base font-bold text-slate-800">
                    Currently {isClinicOpen ? 'Open for Consultations' : 'Closed'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isClinicOpen 
                      ? 'Walk-ins and appointments are welcome. Stop by or call Dr. Javeria!' 
                      : `Next available session: ${nextOpeningText}`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Service Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-xl flex flex-col gap-3">
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-teal-400 fill-teal-400 animate-pulse" />
                Emergency Dental Care
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you are suffering from excruciating toothaches, bleeding, or dental trauma outside of our standard operating hours, please call us immediately.
              </p>
              <a
                href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3.5 rounded-xl text-xs text-center transition-all mt-1 shadow-md shadow-teal-500/10"
              >
                Emergency hotline: {CLINIC_INFO.phone}
              </a>
            </div>

          </div>

          {/* Right Panel: Map & Operational Timings Table */}
          <div className="lg:col-span-7 flex flex-col gap-6" id="schedule-map">
            
            {/* Timings Schedule Table */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100/80 shadow-md">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <Calendar className="w-4.5 h-4.5 text-teal-600" />
                Weekly Clinical Schedule
              </h3>
              <div className="divide-y divide-slate-200/50">
                {OPERATING_HOURS.map((oh) => {
                  const isToday = oh.day === currentDay;
                  return (
                    <div 
                      key={oh.day} 
                      className={`py-3.5 flex justify-between items-center text-xs sm:text-sm ${
                        isToday ? 'bg-teal-50/40 -mx-3 px-3 rounded-xl border-l-4 border-teal-500 font-bold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-800 font-semibold">{oh.day}</span>
                        {isToday && (
                          <span className="text-[9px] uppercase font-bold tracking-widest text-teal-700 bg-teal-100/60 px-1.5 py-0.5 rounded">
                            Today
                          </span>
                        )}
                        {oh.isSaturday && (
                          <span className="text-[9px] uppercase font-bold tracking-widest text-amber-700 bg-amber-100/60 px-1.5 py-0.5 rounded">
                            Morning Slots
                          </span>
                        )}
                      </div>
                      <span className={`font-mono font-medium ${oh.isOpen ? 'text-slate-700' : 'text-rose-500 font-bold'}`}>
                        {oh.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Google Map Embed Container */}
            <div className="flex-1 rounded-3xl overflow-hidden border border-slate-100/80 shadow-lg aspect-[16/9] min-h-[250px] relative bg-slate-100">
              <iframe
                title="Dr. Javeria Dental Clinic Location Map"
                src="https://maps.google.com/maps?q=Al%20Rasheed%20memorial%20hospital%20opposite%20excise%20and%20taxation%20office%20Attock&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
