/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Globe, Share2, Code, Copy, Check, Info } from 'lucide-react';
import { CLINIC_INFO } from '../data';

export default function SeoDashboard() {
  const [copiedSchema, setCopiedSchema] = useState(false);

  // SEO Microdata (Schema.org LocalBusiness JSON-LD)
  const schemaJsonLD = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": CLINIC_INFO.name,
    "image": "https://picsum.photos/seed/dental/800/600", // Fallback representative image
    "@id": window.location.href,
    "url": window.location.href,
    "telephone": CLINIC_INFO.formattedPhone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Rasheed memorial hospital, opposite excise and taxation office",
      "addressLocality": "Attock",
      "postalCode": "43600",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.7686", // Approximate Attock coordinates
      "longitude": "72.3609"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "16:00",
        "closes": "20:30"
      }
    ]
  };

  const copySchemaMarkup = () => {
    navigator.clipboard.writeText(JSON.stringify(schemaJsonLD, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 3000);
  };

  return (
    <section id="seo-dashboard" className="py-20 bg-slate-50 border-t border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4 mb-12">
          <span className="text-teal-600 text-xs font-extrabold tracking-widest uppercase bg-teal-50 px-3 py-1 rounded-full self-center border border-teal-100">
            SEO Optimization
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
            SEO-Friendly Preview Dashboard
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            This website is fully optimized for Google Search and social sharing. Interactive previews showcase the metadata and Schema.org local business integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Google Search Snippet Preview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md flex flex-col gap-6" id="google-seo-card">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Search className="w-4.5 h-4.5 text-slate-400" />
              Google Search Result Snippet Preview
            </h3>
            
            <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm flex flex-col gap-1">
              {/* URL */}
              <div className="flex items-center gap-1.5 text-slate-500 text-xs truncate">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>https://dr-javeria-dental.com</span>
                <span className="text-slate-300">›</span>
                <span>attock-dentist</span>
              </div>
              
              {/* SEO Title */}
              <h4 className="text-lg sm:text-xl font-medium text-indigo-800 hover:underline cursor-pointer tracking-tight leading-tight mt-1">
                {CLINIC_INFO.name} - Best Dentist in Attock | Dental Surgeon
              </h4>
              
              {/* Meta Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                {CLINIC_INFO.bio} Keep smiling with your healthy teeth 😬. Located at Al Rasheed Memorial Hospital, opposite Excise and Taxation office, Attock. Book a consultation today!
              </p>

              {/* Snippet Extra Metrics */}
              <div className="flex flex-wrap items-center gap-3 text-slate-400 text-[11px] font-medium border-t border-slate-50 pt-3 mt-3">
                <span className="text-amber-500 font-bold flex items-center">★★★★★ 4.9 Rating</span>
                <span>•</span>
                <span>Accepting Patients</span>
                <span>•</span>
                <span>Attock, Pakistan</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-500 flex gap-2.5">
              <Info className="w-5 h-5 text-teal-600 shrink-0" />
              <p>
                <strong>Why this is crucial:</strong> Having high-contrast SEO titles and meta tags directly improves clinic rankings in search queries like &ldquo;Dentist in Attock&rdquo; or &ldquo;Best Dental Surgeon Attock&rdquo;, driving organic appointments.
              </p>
            </div>
          </div>

          {/* Structured Schema.org LD-JSON Microdata Code */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md flex flex-col justify-between gap-6" id="schema-seo-card">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Code className="w-4.5 h-4.5 text-slate-400" />
                  JSON-LD Structured Schema.org Local Business Data
                </h3>
                <button
                  onClick={copySchemaMarkup}
                  className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  {copiedSchema ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Schema
                    </>
                  )}
                </button>
              </div>

              {/* Code block */}
              <div className="bg-slate-900 rounded-2xl p-4 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-[220px] shadow-inner select-all border border-slate-800">
                <pre>{JSON.stringify(schemaJsonLD, null, 2)}</pre>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              💡 <strong>Developer Tip:</strong> Injecting this schema code block directly into the HTML index file enables search crawlers to map the physical address, phone, social links, and exact clinic hours as structured rich results.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
