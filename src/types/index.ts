
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

export interface ArduinoLesson { // Keep this if used elsewhere or for distinction
  slug: string;
  title: string;
  description: string; 
  mainTitle?: string; 
  content: ReactNode;
}

export interface DCCircuitLesson {
  slug: string;
  title: string; // Title for cards, sidebar, and default H1
  mainTitle?: string; // Optional override for H1 on lesson page
  description: string; // Description for cards, meta
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  Icon?: LucideIcon | ((props: React.ComponentProps<'svg'>) => JSX.Element); // Allow for functional SVG components too
  content: ReactNode; // JSX content for the lesson page
}

export interface ACCircuitLesson {
  slug: string;
  title: string; 
  mainTitle?: string; 
  description: string; 
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  Icon?: LucideIcon | ((props: React.ComponentProps<'svg'>) => JSX.Element);
  content: ReactNode; 
}
