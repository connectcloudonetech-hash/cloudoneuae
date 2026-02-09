
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface Package {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'App' | 'Graphics';
  imageUrl: string;
  link: string;
  description: string;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
}

export enum Page {
  Home = '/',
  About = '/about',
  Services = '/services',
  Packages = '/packages',
  Portfolio = '/portfolio',
  Clients = '/clients',
  Contact = '/contact'
}
