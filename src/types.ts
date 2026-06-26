/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DentalService {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string; // Name of Lucide icon
  duration: string;
  costRange: string;
  category: 'preventive' | 'restorative' | 'cosmetic' | 'surgical';
}

export interface OperatingHours {
  day: string;
  hours: string;
  isOpen: boolean;
  isSaturday?: boolean;
}

export interface PatientReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  replyText?: string;
  replyDate?: string;
}

export interface AppointmentRequest {
  name: string;
  phone: string;
  service: string;
  date: string;
  timeSlot: string;
  message: string;
}
