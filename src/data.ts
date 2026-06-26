/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DentalService, OperatingHours, PatientReview } from './types';

export const CLINIC_INFO = {
  name: "Dr. Javeria Dental Clinic",
  dentistName: "Dr. Javeria Javed",
  title: "Dentist in Attock & Qualified Dental Surgeon",
  tagline: "keep smiling with your healthy teeth 😬",
  bio: "Best dentist in your town. A qualified dental surgeon providing quality dental treatment following standard medical protocols.",
  phone: "0332 5618581",
  formattedPhone: "+92 332 5618581",
  whatsAppPhone: "923325618581",
  address: "Al Rasheed memorial hospital, opposite excise and taxation office, Attock, 43600",
  addressShort: "Al Rasheed Memorial Hospital, Attock",
  locationDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=Al+Rasheed+memorial+hospital+opposite+excise+and+taxation+office+Attock",
  email: "dr.javeria.javed@gmail.com", // Professional fallback
};

export const SERVICES: DentalService[] = [
  {
    id: "scaling-polishing",
    title: "Scaling & Polishing",
    description: "Professional removal of plaque, tartar, and surface stains to prevent gum disease and freshen breath.",
    benefits: ["Prevents gum bleeding", "Removes deep yellow stains", "Prevents bad breath (halitosis)"],
    icon: "Sparkles",
    duration: "30 - 45 mins",
    costRange: "PKR 2,500 - 4,000",
    category: "preventive"
  },
  {
    id: "rct",
    title: "Root Canal Treatment",
    description: "Advanced pain-free treatment to save decayed or infected teeth, relieving severe toothaches.",
    benefits: ["Saves your natural tooth", "Completely pain-free with modern anesthesia", "Restores chewing capability"],
    icon: "ShieldAlert",
    duration: "45 - 60 mins (1-2 visits)",
    costRange: "PKR 8,000 - 15,000",
    category: "restorative"
  },
  {
    id: "fillings",
    title: "Tooth Fillings & Restoration",
    description: "Aesthetic, composite fillings matched exactly to your natural tooth color to repair cavity damage.",
    benefits: ["Blends perfectly with natural teeth", "Restores tooth structure", "Prevents further decay"],
    icon: "FileHeart",
    duration: "20 - 30 mins",
    costRange: "PKR 2,000 - 4,500",
    category: "restorative"
  },
  {
    id: "crowns-bridges",
    title: "Dental Crowns & Bridges",
    description: "Premium porcelain or zirconia crowns and bridges to strengthen damaged teeth and replace missing ones.",
    benefits: ["Restores smile aesthetics", "Improves speech and bite force", "Long-lasting durability (10+ years)"],
    icon: "Crown",
    duration: "Requires 2 visits",
    costRange: "PKR 12,000 - 25,000",
    category: "restorative"
  },
  {
    id: "teeth-whitening",
    title: "Cosmetic Teeth Whitening",
    description: "Get a brighter, dazzling smile with our safe dental bleaching procedures that remove deep discoloration.",
    benefits: ["Instantly brightens smile up to 8 shades", "Safe for dental enamel", "Boosts self-confidence"],
    icon: "Smile",
    duration: "45 mins",
    costRange: "PKR 10,000 - 18,000",
    category: "cosmetic"
  },
  {
    id: "extractions",
    title: "Painless Dental Extractions",
    description: "Safe and surgical removal of severely damaged teeth or painful wisdom teeth following sterile protocols.",
    benefits: ["Stops radiating jaw pain", "Prevents spread of deep infection", "Minimum post-operative discomfort"],
    icon: "Trash2",
    duration: "30 - 50 mins",
    costRange: "PKR 3,000 - 8,000",
    category: "surgical"
  },
  {
    id: "pediatric",
    title: "Kids Dental Care",
    description: "Friendly, gentle, and welcoming dental checkups and treatments specifically designed for child patients.",
    benefits: ["Fear-free dental environment", "Teaches healthy dental habits early", "Cavity protection & sealants"],
    icon: "Baby",
    duration: "20 - 30 mins",
    costRange: "PKR 1,500 - 3,500",
    category: "preventive"
  },
  {
    id: "braces",
    title: "Orthodontics & Aligners",
    description: "Fix crooked teeth, gaps, and bite problems using high-quality dental braces or clear modern aligners.",
    benefits: ["Perfectly straight teeth", "Enhances facial profile", "Improves overall jaw health"],
    icon: "Activity",
    duration: "Varies (Consultation first)",
    costRange: "Consultation Free / Varies",
    category: "cosmetic"
  }
];

export const OPERATING_HOURS: OperatingHours[] = [
  { day: "Saturday", hours: "9:00 AM - 6:00 PM", isOpen: true, isSaturday: true },
  { day: "Sunday", hours: "Closed", isOpen: false },
  { day: "Monday", hours: "4:00 PM - 8:30 PM", isOpen: true },
  { day: "Tuesday", hours: "4:00 PM - 8:30 PM", isOpen: true },
  { day: "Wednesday", hours: "4:00 PM - 8:30 PM", isOpen: true },
  { day: "Thursday", hours: "4:00 PM - 8:30 PM", isOpen: true },
  { day: "Friday", hours: "4:00 PM - 8:30 PM", isOpen: true },
];

export const DEFAULT_REVIEWS: PatientReview[] = [
  {
    id: "rev-1",
    author: "Zeeshan Ahmed",
    rating: 5,
    date: "2026-05-12",
    text: "Dr. Javeria is hands down the best dentist in Attock. I got my root canal treatment done and she was so gentle that I didn't feel any pain. The sterilization protocols followed here are exceptional.",
    verified: true,
    replyText: "Thank you Zeeshan! Your comfort and safety are our highest priorities. Happy to hear you had a painless experience.",
    replyDate: "2026-05-13"
  },
  {
    id: "rev-2",
    author: "Amina Bibi",
    rating: 5,
    date: "2026-06-02",
    text: "Took my 6-year-old daughter for dental fillings. Dr. Javeria made her feel so comfortable that she wasn't scared at all. Very professional dental surgeon. Highly recommended!",
    verified: true,
    replyText: "It was a pleasure treating little Amina! Regular visits from a young age help maintain a life-long healthy smile.",
    replyDate: "2026-06-03"
  },
  {
    id: "rev-3",
    author: "Kamran Khan",
    rating: 5,
    date: "2026-06-18",
    text: "Excellent service at Al Rasheed Hospital. Very neat and clean clinic, cooperative staff, and Dr. Javeria explains the procedure very nicely. No extra charges, very reasonable rates.",
    verified: true,
  }
];
