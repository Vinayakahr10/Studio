
import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

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
  Icon: LucideIcon | ((props: React.ComponentProps<'svg'>) => JSX.Element); // Allow custom SVGs too
  href: string;
  description?: string;
}

export interface Article {
  id: string; // Firestore document ID
  title: string;
  summary: string;
  imageUrl: string;
  imageHint?: string;
  href: string; // Will likely be /blog/[slug] or /blog/[id]
  category?: string;
  date?: string; // Could be derived from createdAt for display
  author?: string;
  // Firestore specific fields
  slug?: string;
  status?: 'draft' | 'published' | 'archived';
  content?: string;
  tags?: string[]; // Or a comma-separated string
  featuredImage?: string; // Could be same as imageUrl or a different one
  createdAt?: Timestamp | Date | string; // Firestore Timestamp, or Date/string after conversion
  updatedAt?: Timestamp | Date | string;
}

export interface Tag {
  id: string;
  name: string;
  href: string;
}
