import { User } from 'firebase/auth';
import { StaticImageData } from 'next/image';

export interface ProfileMenuProps {
  user: User | null;
  onClose: () => void;
}

export interface MenuItem {
  id: string;
  label: string;
  src: string;
  action: () => void;
}

export interface Links {
  href: string;
  label: string;
}

export interface Blogs {
  id: string;
  img: StaticImageData;
  tag: string;
  title: string;
  date: string;
  duration: number;
}

export interface PricingType {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface FAQDataProps {
  question: string;
  answer: string;
}
