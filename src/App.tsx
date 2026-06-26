/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuickActions from './components/QuickActions';
import Services from './components/Services';
import AppointmentForm from './components/AppointmentForm';
import Reviews from './components/Reviews';
import LocationHours from './components/LocationHours';
import Footer from './components/Footer';

export default function App() {
  const [selectedService, setSelectedService] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clinicOpenState, setClinicOpenState] = useState({
    isOpen: false,
    nextOpening: "Opens Saturday at 9:00 AM"
  });

  // Clock Ticker to keep live times fully accurate
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Calculate open status based on current local clock
  useEffect(() => {
    const day = currentTime.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const timeValue = hours + minutes / 60; // Decimal hours representation

    let isOpen = false;
    let nextOpening = "Opens Saturday at 9:00 AM";

    if (day === 6) { // Saturday
      if (timeValue >= 9 && timeValue < 18) {
        isOpen = true;
        nextOpening = "Closed · Opens Monday at 4:00 PM";
      } else if (timeValue < 9) {
        isOpen = false;
        nextOpening = "Opens today at 9:00 AM";
      } else {
        isOpen = false;
        nextOpening = "Closed · Opens Monday at 4:00 PM";
      }
    } else if (day === 0) { // Sunday
      isOpen = false;
      nextOpening = "Opens Monday at 4:00 PM";
    } else { // Monday to Friday
      if (timeValue >= 16 && timeValue < 20.5) { // 4:00 PM - 8:30 PM
        isOpen = true;
        nextOpening = day === 5 ? "Closed · Opens Saturday at 9:00 AM" : "Closed · Opens tomorrow at 4:00 PM";
      } else if (timeValue < 16) {
        isOpen = false;
        nextOpening = "Opens today at 4:00 PM";
      } else {
        isOpen = false;
        nextOpening = day === 5 ? "Closed · Opens Saturday at 9:00 AM" : "Closed · Opens tomorrow at 4:00 PM";
      }
    }

    setClinicOpenState({ isOpen, nextOpening });
  }, [currentTime]);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = daysOfWeek[currentTime.getDay()];
  const currentTimeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div id="app-viewport" className="min-h-screen bg-[#fcfdfd] text-slate-800 flex flex-col font-sans">
      
      {/* Header with dynamic props */}
      <Header 
        currentDay={currentDayName} 
        isClinicOpen={clinicOpenState.isOpen} 
        nextOpeningText={clinicOpenState.nextOpening} 
      />

      {/* Main Sections Scroll Flow */}
      <main className="flex-1">
        <Hero />
        
        <QuickActions />
        
        <Services 
          onSelectService={setSelectedService} 
          selectedService={selectedService} 
        />
        
        <AppointmentForm 
          selectedService={selectedService} 
          setSelectedService={setSelectedService} 
        />
        
        <Reviews />
        
        <LocationHours 
          currentDay={currentDayName}
          currentTimeString={currentTimeString}
          isClinicOpen={clinicOpenState.isOpen}
          nextOpeningText={clinicOpenState.nextOpening}
        />
      </main>

      {/* Footer & Floating Triggers */}
      <Footer />

    </div>
  );
}
