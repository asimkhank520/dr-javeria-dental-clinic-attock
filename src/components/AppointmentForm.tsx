/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Phone, MessageSquare, Clock, CheckCircle, HelpCircle, History, Trash2, ArrowUpRight } from 'lucide-react';
import { CLINIC_INFO, SERVICES } from '../data';
import { AppointmentRequest } from '../types';

interface AppointmentFormProps {
  selectedService: string;
  setSelectedService: (serviceTitle: string) => void;
}

interface LocalSavedBooking extends AppointmentRequest {
  id: string;
  timestamp: string;
  status: 'Pending Confirmation' | 'Confirmed' | 'Completed';
}

export default function AppointmentForm({ selectedService, setSelectedService }: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentRequest>({
    name: '',
    phone: '',
    service: selectedService || '',
    date: '',
    timeSlot: '',
    message: '',
  });

  const [savedBookings, setSavedBookings] = useState<LocalSavedBooking[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  // Sync selectedService prop to form state
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem('dr_javeria_bookings');
    if (data) {
      try {
        setSavedBookings(JSON.parse(data));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your booking history?")) {
      localStorage.removeItem('dr_javeria_bookings');
      setSavedBookings([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a unique booking ID
    const newId = 'BK-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: LocalSavedBooking = {
      ...formData,
      id: newId,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Pending Confirmation',
    };

    // Save to local storage
    const updated = [newBooking, ...savedBookings];
    localStorage.setItem('dr_javeria_bookings', JSON.stringify(updated));
    setSavedBookings(updated);

    // Format WhatsApp Message
    const textMessage = `*Dr. Javeria Dental Clinic Appointment Request* 😬%0A%0A` +
      `*Booking Reference:* ${newId}%0A` +
      `*Patient Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Contact Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Dental Treatment:* ${encodeURIComponent(formData.service || "General Consultation")}%0A` +
      `*Preferred Date:* ${encodeURIComponent(formData.date)}%0A` +
      `*Preferred Time Slot:* ${encodeURIComponent(formData.timeSlot)}%0A` +
      `*Message / Complaint:* ${encodeURIComponent(formData.message || "None")}%0A%0A` +
      `Please confirm slot availability. Thank you!`;

    const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsAppPhone}?text=${textMessage}`;
    
    setSubmittedId(newId);
    setSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      service: '',
      date: '',
      timeSlot: '',
      message: '',
    });
    setSelectedService('');

    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Helper to determine if date is a Saturday
  const isSaturdaySelected = () => {
    if (!formData.date) return false;
    const day = new Date(formData.date).getDay();
    return day === 5; // 5 corresponds to Saturday in getDay() since Saturday is indexed based on local/GMT (wait, 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat! Wait, let's look up getDay: 0 is Sunday, 1 is Monday, ..., 6 is Saturday. So getDay() === 6 is Saturday!)
  };

  const isSat = formData.date ? new Date(formData.date).getDay() === 6 : false;

  return (
    <section id="appointment" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="appointment-info">
            <span className="text-teal-600 text-xs font-extrabold tracking-widest uppercase bg-teal-50 px-3 py-1 rounded-full self-start border border-teal-100">
              Online Booking Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
              Schedule Your Dental Session
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dr. Javeria Dental Clinic offers convenient scheduling. Please fill out the appointment form on the right. 
              Upon submission:
            </p>

            {/* List steps */}
            <div className="flex flex-col gap-5 py-2">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-teal-100">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Provide Basic Info</h3>
                  <p className="text-xs text-slate-500 mt-1">Enter your contact info, select your preferred dental service, and choice date.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-teal-100">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Verify with WhatsApp</h3>
                  <p className="text-xs text-slate-500 mt-1">Click submission to send a pre-formatted message directly to Dr. Javeria on WhatsApp.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-teal-100">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Get Official Confirmation</h3>
                  <p className="text-xs text-slate-500 mt-1">Our clinic desk will review your slot request and reply instantly with a confirmation message.</p>
                </div>
              </div>
            </div>

            {/* Support section */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100/80 mt-2 flex flex-col gap-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Desk Helpline</h4>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">Call For Questions</p>
                    <p className="text-sm font-bold font-mono text-slate-800">{CLINIC_INFO.phone}</p>
                  </div>
                </div>
                <a
                  href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                  className="bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all text-center"
                >
                  Dial Now
                </a>
              </div>
            </div>

            {/* Dynamic Clock Indicator */}
            <div className="border border-emerald-100 bg-emerald-50/40 p-4 rounded-2xl text-xs text-slate-600 flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
              <p>
                <strong>Saturday slots open at 9:00 AM.</strong> Select any upcoming Saturday for priority treatment!
              </p>
            </div>
          </div>

          {/* Right: Form Container */}
          <div className="lg:col-span-7" id="appointment-form-panel">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100/80 shadow-lg shadow-slate-100/50">
              
              {submitted ? (
                <div className="text-center py-12 px-4 flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-800">Request Sent Successfully!</h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">Booking Ref: {submittedId}</p>
                    <p className="text-sm text-slate-600 mt-3 max-w-sm mx-auto leading-relaxed">
                      We have redirected you to WhatsApp to send your booking inquiry to Dr. Javeria. 
                      If the chat didn&apos;t open, tap the button below.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-white hover:bg-slate-100 text-slate-700 font-bold px-6 py-3 rounded-xl border border-slate-200 transition-colors cursor-pointer text-sm"
                    >
                      Book Another Session
                    </button>
                    <a
                      href={`https://wa.me/${CLINIC_INFO.whatsAppPhone}?text=Hello%20Dr.%20Javeria%20Dental%20Clinic%2C%20I%20sent%20a%20booking%20request%20via%20your%20website%20(Ref%3A%20${submittedId}).`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 text-sm"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      Re-open WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200/50 pb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    Appointment Details
                  </h3>

                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="patient-name-input" className="text-xs font-bold text-slate-600">
                      Patient Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="patient-name-input"
                      name="name"
                      required
                      placeholder="e.g. Muhammad Ali"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100/50 rounded-xl px-4 py-3 text-slate-800 text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Contact Number & Treatment Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="patient-phone-input" className="text-xs font-bold text-slate-600">
                        Mobile Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="patient-phone-input"
                        name="phone"
                        required
                        placeholder="e.g. 0332 5618581"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100/50 rounded-xl px-4 py-3 text-slate-800 text-sm outline-none transition-all font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="dental-service-select" className="text-xs font-bold text-slate-600">
                        Select Dental Treatment <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="dental-service-select"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleInputChange}
                        className="bg-white border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100/50 rounded-xl px-4 py-3 text-slate-800 text-sm outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">-- Choose Treatment --</option>
                        {SERVICES.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            {srv.title} ({srv.costRange})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date & Time Slot Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="booking-date-input" className="text-xs font-bold text-slate-600">
                        Preferred Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="booking-date-input"
                        name="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleInputChange}
                        className="bg-white border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100/50 rounded-xl px-4 py-3 text-slate-800 text-sm outline-none transition-all cursor-pointer font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="time-slot-select" className="text-xs font-bold text-slate-600 flex items-center justify-between">
                        <span>Preferred Time Slot</span>
                        {formData.date && (
                          <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                            {isSat ? 'Saturday Hours' : 'Weekday Hours'}
                          </span>
                        )}
                      </label>
                      <select
                        id="time-slot-select"
                        name="timeSlot"
                        required
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                        className="bg-white border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100/50 rounded-xl px-4 py-3 text-slate-800 text-sm outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">-- Select Time Slot --</option>
                        {isSat ? (
                          <>
                            <option value="Morning: 9:00 AM - 12:00 PM">Morning: 9:00 AM - 12:00 PM</option>
                            <option value="Midday: 12:00 PM - 3:00 PM">Midday: 12:00 PM - 3:00 PM</option>
                            <option value="Afternoon: 3:00 PM - 6:00 PM">Afternoon: 3:00 PM - 6:00 PM</option>
                          </>
                        ) : (
                          <>
                            <option value="Late Afternoon: 4:00 PM - 6:00 PM">Late Afternoon: 4:00 PM - 6:00 PM</option>
                            <option value="Evening: 6:00 PM - 8:30 PM">Evening: 6:00 PM - 8:30 PM</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Notes / Chief Complaint */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="complaint-textarea" className="text-xs font-bold text-slate-600">
                      Chief Complaint / Additional Notes (Optional)
                    </label>
                    <textarea
                      id="complaint-textarea"
                      name="message"
                      rows={3}
                      placeholder="Describe your dental concern here (e.g. wisdom tooth ache, bleeding gums, scaling request...)"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100/50 rounded-xl px-4 py-3 text-slate-800 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submission buttons */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-4 px-6 rounded-2xl shadow-md shadow-emerald-100 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 text-sm mt-2"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" />
                    Request Appointment via WhatsApp
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    🔒 Rest assured, your personal info is shared directly with the clinic surgeon only.
                  </p>
                </form>
              )}

            </div>
          </div>
        </div>

        {/* Local Booking History Panel */}
        {savedBookings.length > 0 && (
          <div id="booking-history-panel" className="mt-16 border-t border-slate-100 pt-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5">
                <History className="w-5 h-5 text-slate-500" />
                <h3 className="text-lg font-bold text-slate-800">Your Booking Requests (Local Browser History)</h3>
              </div>
              <button
                onClick={handleClearHistory}
                className="text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear History
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedBookings.map((bk) => (
                <div key={bk.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-300/40">
                        {bk.id}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                        Pending Desk Action
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-800 mt-3">{bk.service || "General Consultation"}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Submitted: {bk.timestamp}</p>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Patient:</span>
                        <span className="font-semibold">{bk.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Date:</span>
                        <span className="font-mono">{bk.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Slot:</span>
                        <span className="font-medium">{bk.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsAppPhone}?text=Hello%20Dr.%20Javeria%20Dental%20Clinic%2C%20I%20am%20following%20up%20on%20my%20booking%20request%20with%20reference%20${bk.id}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-white hover:bg-slate-100 text-slate-700 font-bold py-2 px-3 rounded-xl border border-slate-200 text-xs text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    Follow up on WhatsApp
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
