
import type { LucideIcon } from 'lucide-react';
// Removed: import type { Timestamp } from 'firebase/firestore';

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
  createdAt?: Date | string; // Changed from Timestamp | Date | string
  updatedAt?: Date | string; // Changed from Timestamp | Date | string
}

export interface Tag {
  id: string;
  name: string;
  href: string;
}
