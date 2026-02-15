
import React from 'react';
import { Package, Ad } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'pkg-basic',
    name: 'Starter',
    price: 500,
    dailyAds: 10,
    earningPerAd: 5,
    durationDays: 30,
    color: 'bg-emerald-500'
  },
  {
    id: 'pkg-pro',
    name: 'Professional',
    price: 1500,
    dailyAds: 20,
    earningPerAd: 8,
    durationDays: 30,
    color: 'bg-blue-600'
  },
  {
    id: 'pkg-elite',
    name: 'Elite',
    price: 5000,
    dailyAds: 50,
    earningPerAd: 12,
    durationDays: 30,
    color: 'bg-purple-600'
  }
];

export const MOCK_ADS: Ad[] = [
  {
    id: 'ad-1',
    title: 'New Luxury Apartments',
    description: 'Explore our latest real estate projects in Dhaka.',
    reward: 10,
    duration: 15,
    thumbnail: 'https://picsum.photos/seed/ad1/400/225'
  },
  {
    id: 'ad-2',
    title: 'Tech Gadgets 2024',
    description: 'The future is here. Get 20% off on smartwatches.',
    reward: 10,
    duration: 20,
    thumbnail: 'https://picsum.photos/seed/ad2/400/225'
  },
  {
    id: 'ad-3',
    title: 'Global Travel Guide',
    description: 'Your dream vacation is just one click away.',
    reward: 10,
    duration: 10,
    thumbnail: 'https://picsum.photos/seed/ad3/400/225'
  },
  {
    id: 'ad-4',
    title: 'Foodie Paradise',
    description: 'Taste the best burgers in the city.',
    reward: 10,
    duration: 30,
    thumbnail: 'https://picsum.photos/seed/ad4/400/225'
  }
];

export const PAYMENT_METHODS = [
  { id: 'bkash', name: 'bKash', color: 'bg-pink-600', textColor: 'text-white' },
  { id: 'nagad', name: 'Nagad', color: 'bg-orange-500', textColor: 'text-white' },
  { id: 'rocket', name: 'Rocket', color: 'bg-indigo-700', textColor: 'text-white' },
  { id: 'bank', name: 'Bank Transfer', color: 'bg-slate-700', textColor: 'text-white' }
];
