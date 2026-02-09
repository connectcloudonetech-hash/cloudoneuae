
import React from 'react';
import { Layout, Code, Smartphone, Globe, Palette, ShieldCheck, Zap, HeartHandshake, MapPin, ShoppingCart } from 'lucide-react';
import { Service, Package, Project, Client } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-design',
    title: 'Web Designing',
    description: 'Modern, responsive and user-friendly website designs that captivate your audience.',
    icon: 'Layout',
    details: ['Responsive Design', 'UI/UX Optimization', 'Mobile Friendly', 'Corporate Branding']
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Fast, secure and scalable web applications built with cutting-edge technologies.',
    icon: 'Code',
    details: ['Custom CMS', 'E-commerce Solutions', 'PHP/Laravel/React', 'API Integration']
  },
  {
    id: 'e-commerce',
    title: 'E-commerce Solutions',
    description: 'High-conversion online stores with seamless payment integration and advanced management.',
    icon: 'ShoppingCart',
    details: ['Secure Payment Gateways', 'Inventory Management', 'Order Tracking Systems', 'Customer Analytics']
  },
  {
    id: 'app-design',
    title: 'App Design',
    description: 'Custom Android & iOS app UI/UX solutions tailored for business growth.',
    icon: 'Smartphone',
    details: ['iOS & Android Design', 'Prototype Development', 'User Flow Mapping', 'App Store Ready']
  },
  {
    id: 'domain-hosting',
    title: 'Domain & Hosting',
    description: 'Secure registration, high-speed hosting, and professional business emails.',
    icon: 'Globe',
    details: ['.ae/.com Registration', 'SSD Web Hosting', 'SSL Certificates', 'Business Emails']
  },
  {
    id: 'graphics',
    title: 'Graphics Design',
    description: 'Complete branding solutions including logos, pamphlets, and business cards.',
    icon: 'Palette',
    details: ['Logo Design', 'Pamphlet/Flyer Design', 'Business Card Design', 'Social Media Kits']
  }
];

export const PACKAGES: Package[] = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: '799',
    features: [
      'One Page Website',
      'Mobile Responsive',
      'Free Domain',
      'Free Hosting',
      'Basic SEO',
      '1 Email ID',
      '1 Month Support'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Package',
    price: '1499',
    recommended: true,
    features: [
      'Up to 10 Pages',
      'Custom UI Design',
      'Free Domain',
      'Free Hosting',
      'WhatsApp Integration',
      'SEO Optimization',
      '3 Months Support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: '2999',
    features: [
      'Unlimited Pages',
      'E-commerce Integration',
      'Payment Gateway',
      'Advanced Admin Panel',
      'Free Domain',
      'Priority Support',
      '1 Year Maintenance'
    ]
  }
];

// Professional placeholder images for initial data
const PLACEHOLDER_LOGO = (text: string) => `https://placehold.co/400x400/F1F5F9/1F4E79?text=${encodeURIComponent(text)}`;
const PLACEHOLDER_WORK = (seed: string) => `https://images.unsplash.com/photo-${seed}?q=80&w=800&auto=format&fit=crop`;

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Luxury Real Estate Portal',
    category: 'Web',
    imageUrl: PLACEHOLDER_WORK('1560448204-603b3fc33ddc'),
    link: '#',
    description: 'A high-end property listing site for Dubai real estate featuring immersive VR tours and custom filtering.'
  },
  {
    id: '2',
    title: 'Cloud-Based Delivery App',
    category: 'App',
    imageUrl: PLACEHOLDER_WORK('1526628953301-3e589a6a8b74'),
    link: '#',
    description: 'Efficient logistics management mobile application with real-time tracking and automated dispatch.'
  },
  {
    id: '3',
    title: 'Corporate Identity Kit',
    category: 'Graphics',
    imageUrl: PLACEHOLDER_WORK('1634942550612-b105fb467921'),
    link: '#',
    description: 'Brand guidelines, stationary, and digital asset library for a high-growth tech startup.'
  }
];

export const CLIENTS: Client[] = [
  { id: 'c1', name: 'Vertex Group', industry: 'Logistics', logoUrl: PLACEHOLDER_LOGO('Vertex') },
  { id: 'c2', name: 'Apex Real Estate', industry: 'Real Estate', logoUrl: PLACEHOLDER_LOGO('Apex') },
  { id: 'c3', name: 'Dubai Tech Hub', industry: 'Technology', logoUrl: PLACEHOLDER_LOGO('TechHub') },
  { id: 'c4', name: 'Skyline Hospitality', industry: 'Tourism', logoUrl: PLACEHOLDER_LOGO('Skyline') },
  { id: 'c5', name: 'Emirates Health', industry: 'Healthcare', logoUrl: PLACEHOLDER_LOGO('Health') },
  { id: 'c6', name: 'Blue Ocean Media', industry: 'Marketing', logoUrl: PLACEHOLDER_LOGO('BlueOcean') },
  { id: 'c7', name: 'Desert Oasis', industry: 'Retail', logoUrl: PLACEHOLDER_LOGO('Oasis') },
  { id: 'c8', name: 'Nova Finance', industry: 'Finance', logoUrl: PLACEHOLDER_LOGO('Nova') },
];

export const WHY_CHOOSE_US = [
  { title: 'Dubai Based Company', icon: <MapPin className="text-blue-600" /> },
  { title: 'Affordable Packages', icon: <ShieldCheck className="text-blue-600" /> },
  { title: 'Modern Designs', icon: <Layout className="text-blue-600" /> },
  { title: 'Fast Delivery', icon: <Zap className="text-blue-600" /> },
  { title: 'Dedicated Support', icon: <HeartHandshake className="text-blue-600" /> }
];
