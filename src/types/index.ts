
import type { LucideIcon } from 'lucide-react';

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
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageHint?: string;
  href: string;
  category?: string;
  date?: string;
  author?: string;
}

export interface Tag {
  id: string;
  name: string;
  href: string;
}
