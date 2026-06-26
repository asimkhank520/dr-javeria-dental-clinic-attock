/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Star, UserPlus, Share2, Check } from 'lucide-react';
import { CLINIC_INFO } from '../data';

export default function QuickActions() {
  const [copied, setCopied] = useState(false);

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Javed;Javeria;Dr.;;
FN:Dr. Javeria Dental Clinic
ORG:Al Rasheed Memorial Hospital Attock
TITLE:Qualified Dental Surgeon
TEL;TYPE=CELL,VOICE:+923325618581
ADR;TYPE=WORK,POSTAL,PARCEL:;;Al Rasheed memorial hospital, opposite excise and taxation office;Attock;Punjab;43600;Pakistan
URL;TYPE=WORK:${window.location.href}
NOTE:Keep smiling with your healthy teeth 😬
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Dr_Javeria_Dental_Clinic.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: CLINIC_INFO.name,
          text: `${CLINIC_INFO.name} - Best Dentist in Attock. Keep smiling with your healthy teeth! 😬`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  const actions = [
    {
      id: 'qa-call',
      title: 'Call Clinic',
      subtitle: CLINIC_INFO.phone,
      icon: <Phone className="w-5 h-5 text-teal-600" />,
      href: `tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`,
      bgColor: 'bg-teal-50 hover:bg-teal-100',
      textColor: 'text-teal-700',
      borderColor: 'border-teal-100',
    },
    {
      id: 'qa-whatsapp',
      title: 'WhatsApp',
      subtitle: 'Instant Booking',
      icon: <MessageSquare className="w-5 h-5 text-emerald-600 fill-current" />,
      href: `https://wa.me/${CLINIC_INFO.whatsAppPhone}?text=Hello%20Dr.%20Javeria%20Dental%20Clinic%2C%20I%20would%20like%20to%20book%20a%20dental%20appointment.`,
      isExternal: true,
      bgColor: 'bg-emerald-50 hover:bg-emerald-100',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-100',
    },
    {
      id: 'qa-directions',
      title: 'Directions',
      subtitle: 'Get Location Map',
      icon: <MapPin className="w-5 h-5 text-indigo-600" />,
      href: CLINIC_INFO.locationDirectionsUrl,
      isExternal: true,
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-100',
    },
    {
      id: 'qa-reviews',
      title: 'Reviews',
      subtitle: 'See Patient Feedback',
      icon: <Star className="w-5 h-5 text-amber-500 fill-current" />,
      href: '#reviews',
      bgColor: 'bg-amber-50/50 hover:bg-amber-100/50',
      textColor: 'text-amber-800',
      borderColor: 'border-amber-100/80',
    },
    {
      id: 'qa-save',
      title: 'Save Contact',
      subtitle: 'Add to Phone Book',
      icon: <UserPlus className="w-5 h-5 text-sky-600" />,
      onClick: downloadVCard,
      bgColor: 'bg-sky-50 hover:bg-sky-100',
      textColor: 'text-sky-700',
      borderColor: 'border-sky-100',
    },
    {
      id: 'qa-share',
      title: copied ? 'Link Copied!' : 'Share Clinic',
      subtitle: copied ? 'Ready to send' : 'Send to Family',
      icon: copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5 text-pink-600" />,
      onClick: handleShare,
      bgColor: copied ? 'bg-emerald-50 border-emerald-200' : 'bg-pink-50 hover:bg-pink-100',
      textColor: copied ? 'text-emerald-700 font-bold' : 'text-pink-700',
      borderColor: 'border-pink-100',
    }
  ];

  return (
    <section id="quick-actions" className="py-4 relative z-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-100/80 border border-slate-100 -mt-12 lg:-mt-20">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-wider uppercase">
                Quick Clinic Actions
              </h3>
              <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                Tap to interact
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {actions.map((act) => {
                const cardContent = (
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100/80">
                      {act.icon}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold tracking-tight ${act.textColor}`}>{act.title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">{act.subtitle}</p>
                    </div>
                  </div>
                );

                const baseStyles = `flex flex-col p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer select-none ${act.bgColor} ${act.borderColor}`;

                if (act.onClick) {
                  return (
                    <button
                      key={act.id}
                      id={act.id}
                      onClick={act.onClick}
                      className={baseStyles}
                    >
                      {cardContent}
                    </button>
                  );
                }

                return (
                  <a
                    key={act.id}
                    id={act.id}
                    href={act.href}
                    target={act.isExternal ? "_blank" : undefined}
                    rel={act.isExternal ? "noreferrer" : undefined}
                    className={baseStyles}
                  >
                    {cardContent}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
