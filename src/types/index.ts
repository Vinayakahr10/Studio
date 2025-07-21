
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface NavItem {
  href: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  tutorialLink: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  Icon: LucideIcon | ((props: React.ComponentProps<'svg'>) => JSX.Element);
  href: string;
  description?: string;
}

export interface Article {
  id: string; 
  title: string;
  summary: string;
  imageUrl: string;
  imageHint?: string;
  href: string; 
  category?: string;
  date?: string; 
  author?: string;
  slug?: string;
  status?: 'draft' | 'published' | 'archived';
  content?: string;
  tags?: string[];
  featuredImage?: string;
  createdAt?: Date | string; 
  updatedAt?: Date | string; 
}

export interface Tag {
  id: string;
  name: string;
  href: string;
}

// Generic Lesson Type for simplicity, can be specialized if needed
export interface GenericLesson {
  slug: string;
  title: string; // For sidebar, cards
  mainTitle?: string; // For H1 on lesson page
  description: string; // For meta, cards
  Icon?: LucideIcon | ((props: React.ComponentProps<'svg'>) => JSX.Element);
  content: ReactNode;
}


export interface ArduinoLesson extends GenericLesson {}
export interface DCCircuitLesson extends GenericLesson {}
export interface ACCircuitLesson extends GenericLesson {}
export interface ESP32Lesson extends GenericLesson {}
export interface BJTLesson extends GenericLesson {}
export interface DigitalElectronicsLesson extends GenericLesson {}
export interface OpAmpLesson extends GenericLesson {}
export interface SemiconductorDeviceLesson extends GenericLesson {}
export interface PowerElectronicsLesson extends GenericLesson {}
export interface OscillatorLesson extends GenericLesson {}
export interface STM32Lesson extends GenericLesson {}
