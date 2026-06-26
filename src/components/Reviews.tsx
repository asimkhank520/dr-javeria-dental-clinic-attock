/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, CheckCircle, ShieldCheck, User, Sparkles, Send, PenTool } from 'lucide-react';
import { DEFAULT_REVIEWS, CLINIC_INFO } from '../data';
import { PatientReview } from '../types';

export default function Reviews() {
  const [reviews, setReviews] = useState<PatientReview[]>([]);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Load reviews from localStorage + defaults
  useEffect(() => {
    const local = localStorage.getItem('dr_javeria_reviews');
    if (local) {
      try {
        setReviews(JSON.parse(local));
      } catch (e) {
        setReviews(DEFAULT_REVIEWS);
      }
    } else {
      setReviews(DEFAULT_REVIEWS);
      localStorage.setItem('dr_javeria_reviews', JSON.stringify(DEFAULT_REVIEWS));
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    const newId = 'rev-' + Date.now();
    const newReview: PatientReview = {
      id: newId,
      author,
      rating,
      date: new Date().toISOString().split('T')[0],
      text,
      verified: true,
      replyText: `Thank you, ${author.split(' ')[0]}! We appreciate your support and are glad to assist you with your dental care.`,
      replyDate: new Date().toISOString().split('T')[0]
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('dr_javeria_reviews', JSON.stringify(updated));

    // Reset Form
    setAuthor('');
    setRating(5);
    setText('');
    setSubmitted(true);
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Calculate Aggregates
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  const countStars = (starVal: number) => {
    return reviews.filter(r => r.rating === starVal).length;
  };

  return (
    <section id="reviews" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4 mb-12">
          <span className="text-teal-600 text-xs font-extrabold tracking-widest uppercase bg-teal-50 px-3 py-1 rounded-full self-center border border-teal-100">
            Patient Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
            What Our Patients Say
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            We are dedicated to providing painless dental surgeon care in Attock. Read feedback from our patients, or write yours.
          </p>
        </div>

        {/* Aggregate Ratings Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-md flex flex-col justify-center items-center text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Aggregate Rating</h3>
            <p className="text-5xl font-extrabold text-slate-800 mt-2 font-display">{averageRating}</p>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${star <= Math.round(parseFloat(averageRating)) ? 'text-amber-400 fill-current' : 'text-slate-200'}`} 
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 font-medium">Based on {totalReviews} patient evaluations</p>
            
            {submitted && (
              <div className="mt-4 bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Review submitted successfully!
              </div>
            )}

            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md shadow-teal-100 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              Write Patient Review
            </button>
          </div>

          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-md flex flex-col justify-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Rating Breakdown</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = countStars(star);
                const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600 w-3 font-mono">{star}</span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" />
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-500 rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Review Submission Form Drawer */}
        {showForm && (
          <div id="add-review-form" className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-xl shadow-teal-50/20 max-w-2xl mx-auto mb-12 animate-fade-in">
            <form onSubmit={handleAddReview} className="flex flex-col gap-5">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Write Your Dental Review</span>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)} 
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Cancel
                </button>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="review-author-input" className="text-xs font-bold text-slate-600">Your Full Name</label>
                  <input
                    type="text"
                    id="review-author-input"
                    required
                    placeholder="e.g. Dr. Asif Mehmood"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-2.5 text-slate-800 text-sm outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="review-rating-select" className="text-xs font-bold text-slate-600">Overall Rating Score</label>
                  <div className="flex items-center gap-2 h-10">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-amber-400 focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-slate-200'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-2">({rating} / 5 Stars)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="review-text-textarea" className="text-xs font-bold text-slate-600">Your Treatment Experience</label>
                <textarea
                  id="review-text-textarea"
                  required
                  rows={4}
                  placeholder="Share details about your clinical experience, sterilization quality, and Dr. Javeria's expertise..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 text-slate-800 text-sm outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs"
              >
                <Send className="w-4 h-4" />
                Submit Verification Review
              </button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-md flex flex-col justify-between gap-5 relative">
              
              <div>
                {/* Header Rating & Meta */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star 
                        key={s} 
                        className={`w-3.5 h-3.5 ${s <= rev.rating ? 'text-amber-400 fill-current' : 'text-slate-100'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-semibold">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-600 mt-4 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">{rev.author}</h4>
                    {rev.verified && (
                      <span className="flex items-center gap-1 text-[10px] text-teal-600 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-500 fill-teal-50" />
                        Verified Patient
                      </span>
                    )}
                  </div>
                </div>

                {/* Dr. Javeria's reply text */}
                {rev.replyText && (
                  <div className="bg-slate-50 border-l-2 border-teal-500 p-3 rounded-r-xl text-[11px] text-slate-600 mt-2">
                    <div className="flex justify-between font-bold text-[10px] text-teal-700 uppercase tracking-wide">
                      <span>{CLINIC_INFO.dentistName} (Reply)</span>
                      <span className="text-slate-400 font-mono font-normal lowercase">{rev.replyDate || rev.date}</span>
                    </div>
                    <p className="mt-1 leading-normal italic">&ldquo;{rev.replyText}&rdquo;</p>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
