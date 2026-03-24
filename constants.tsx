
import React from 'react';
import { Layout, Code, Smartphone, Globe, Palette, ShieldCheck, Zap, HeartHandshake, MapPin, ShoppingCart } from 'lucide-react';
import { Service, Package, Project, Client } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'Modern, responsive and user-friendly website designs that captivate your audience.',
    icon: 'Layout',
    details: ['Responsive Design', 'UI/UX Optimization', 'Mobile Friendly', 'Corporate Branding']
  },
  {
    id: 'web-dev',
    title: 'Website Development',
    description: 'Fast, secure and scalable web applications built with cutting-edge technologies.',
    icon: 'Code',
    details: ['Custom CMS', 'E-commerce Solutions', 'PHP/Laravel/React', 'API Integration']
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce Website',
    description: 'High-conversion online stores with seamless payment integration and advanced management.',
    icon: 'ShoppingCart',
    details: ['Secure Payment Gateways', 'Inventory Management', 'Order Tracking Systems', 'Customer Analytics']
  },
  {
    id: 'app-design',
    title: 'Mobile App Development',
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
    priceUAE: '799',
    priceIndia: '9,999',
    features: [
      'One Page Website',
      'Free Domain Name',
      'Free Hosting',
      'Google My Business',
      'Social Media Integration',
      'WhatsApp Button Integration',
      'Mobile Responsive',
      'Basic SEO',
      '1 Email ID',
      '1 Month Support'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Package',
    priceUAE: '1499',
    priceIndia: '14,999',
    recommended: true,
    features: [
      'Up to 5 Pages',
      'Free Domain Name',
      'Free Hosting',
      'Google My Business',
      'Social Media Integration',
      'WhatsApp Button Integration',
      'Custom UI Design',
      'WhatsApp Integration',
      'Enquiry Form / Contact Form',
      '3 Email ID',
      'SEO Optimization',
      '3 Months Support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Package',
    priceUAE: '2999',
    priceIndia: '24,999',
    features: [
      'Up to 10 Pages',
      'Free Domain Name',
      'Free Hosting',
      'Google My Business',
      'Social Media Integration',
      'WhatsApp Button Integration',
      'Custom UI Design',
      'WhatsApp Integration',
      'Enquiry Form / Contact Form',
      '5 Email ID',
      'SEO Optimization',
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
  { title: 'Best Web Design Company UAE', icon: <MapPin className="text-blue-600" /> },
  { title: 'Affordable Website Design Dubai', icon: <ShieldCheck className="text-blue-600" /> },
  { title: 'Website Development Dubai', icon: <Layout className="text-blue-600" /> },
  { title: 'Fast Delivery', icon: <Zap className="text-blue-600" /> },
  { title: 'Dedicated Support', icon: <HeartHandshake className="text-blue-600" /> }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ahmed Al-Maktoum",
    role: "CEO, Vertex Group",
    content: "Cloud One Technologies transformed our digital presence. Their web design team in Dubai is truly world-class. The new site has significantly increased our lead generation.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Marketing Director, Apex Real Estate",
    content: "Working with Cloud One was a breeze. They understood our requirements for a luxury real estate portal perfectly. Their website development skills are top-notch.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    role: "Founder, Dubai Tech Hub",
    content: "The best web design company in UAE! They delivered our project ahead of schedule and the quality was beyond our expectations. Highly recommended for any tech startup.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
  }
];

export const FAQS = [
  {
    id: 1,
    question: "What services do you provide?",
    answer: "We offer complete digital solutions including website design, web development, digital marketing, SEO, graphic design, and branding services."
  },
  {
    id: 2,
    question: "Do you create custom websites?",
    answer: "Yes, we design fully customized websites tailored to your business needs, ensuring a professional and user-friendly experience."
  },
  {
    id: 3,
    question: "How long does it take to build a website?",
    answer: "The timeline depends on the project complexity, but most websites are completed within 3 to 10 days after finalizing requirements."
  },
  {
    id: 4,
    question: "Will my website be mobile-friendly?",
    answer: "Absolutely. All our websites are fully responsive and optimized for mobile, tablet, and desktop devices."
  },
  {
    id: 5,
    question: "Do you provide domain and hosting?",
    answer: "Yes, we provide domain registration and hosting services as part of our packages or can work with your existing provider."
  },
  {
    id: 6,
    question: "Can I update my website after completion?",
    answer: "Yes, you can update your website easily. We also provide training and support if needed."
  },
  {
    id: 7,
    question: "Do you offer SEO services?",
    answer: "Yes, we provide basic and advanced SEO services to help your website rank higher on search engines and attract more traffic."
  },
  {
    id: 8,
    question: "What is the cost of a website?",
    answer: "The cost depends on your requirements such as number of pages, features, and design complexity. We offer affordable packages for all business sizes."
  },
  {
    id: 9,
    question: "Do you provide support after delivery?",
    answer: "Yes, we offer ongoing support and maintenance to ensure your website runs smoothly."
  },
  {
    id: 10,
    question: "How do I start a project with you?",
    answer: "You can contact us with your requirements. After discussion, we provide a proposal and begin work once the advance payment is made."
  },
  {
    id: 11,
    question: "Do you offer digital marketing services?",
    answer: "Yes, we provide social media marketing, Google My Business optimization, and online advertising to grow your business online."
  },
  {
    id: 12,
    question: "Can you redesign my existing website?",
    answer: "Yes, we can upgrade or redesign your current website with modern UI/UX and improved performance."
  },
  {
    id: 13,
    question: "Is there any advance payment required?",
    answer: "Yes, a small advance is required to start the project, and the remaining payment is completed in stages."
  },
  {
    id: 14,
    question: "Do you provide e-commerce websites?",
    answer: "Yes, we build fully functional e-commerce websites with payment gateway integration and product management."
  },
  {
    id: 15,
    question: "How can I contact you?",
    answer: "You can reach us via phone, email, or through the contact form on our website."
  }
];
