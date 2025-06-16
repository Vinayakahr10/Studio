
import type { ReactNode } from 'react';
import type { OscillatorLesson } from '@/types';
import { Waves, Zap, Settings2, Activity, RefreshCcwDot, CheckSquare, Rss, Network } from 'lucide-react'; // Example icons

// Helper function to generate slugs
const toSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/^\d+\.\s*/, '') // Remove numbering like "1. "
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except space and hyphen
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-');
};

const comingSoonContent = <p>Content for this lesson is coming soon. Check back later!</p>;

export const oscillatorLessons: OscillatorLesson[] = [
  {
    slug: toSlug("1. LC Oscillator Basics"),
    title: "1. LC Oscillator Basics",
    mainTitle: "Fundamentals of LC Oscillators",
    description: "Understanding the principles of LC tank circuits and how they generate oscillations.",
    Icon: Waves,
    content: comingSoonContent
  },
  {
    slug: toSlug("2. The Hartley Oscillator"),
    title: "2. The Hartley Oscillator",
    mainTitle: "Exploring the Hartley Oscillator Circuit",
    description: "Detailed analysis of the Hartley oscillator, its configuration, and applications.",
    Icon: Zap, // Using a generic "power/energy" icon
    content: comingSoonContent
  },
  {
    slug: toSlug("3. The Colpitts Oscillator"),
    title: "3. The Colpitts Oscillator",
    mainTitle: "Understanding the Colpitts Oscillator",
    description: "In-depth look at the Colpitts oscillator, its tapped capacitor design, and uses.",
    Icon: Settings2, // Using a generic "settings/config" icon
    content: comingSoonContent
  },
  {
    slug: toSlug("4. The RC Oscillator Circuit"),
    title: "4. The RC Oscillator Circuit",
    mainTitle: "Principles of RC Phase-Shift Oscillators",
    description: "Learn how RC networks are used to create phase shifts for oscillation in RC oscillators.",
    Icon: Activity,
    content: comingSoonContent
  },
  {
    slug: toSlug("5. The Wien Bridge Oscillator"),
    title: "5. The Wien Bridge Oscillator",
    mainTitle: "Analyzing the Wien Bridge Oscillator",
    description: "Study of the Wien Bridge oscillator, known for producing low-distortion sine waves.",
    Icon: RefreshCcwDot, // Suggests feedback/oscillation
    content: comingSoonContent
  },
  {
    slug: toSlug("6. Quartz Crystal Oscillators"),
    title: "6. Quartz Crystal Oscillators",
    mainTitle: "High Stability with Crystal Oscillators",
    description: "Understanding how quartz crystals provide high frequency stability in oscillator circuits.",
    Icon: CheckSquare, // Suggests precision/stability
    content: comingSoonContent
  },
  {
    slug: toSlug("7. Twin-T Oscillator"),
    title: "7. Twin-T Oscillator",
    mainTitle: "The Twin-T Notch Filter Oscillator",
    description: "Exploring the Twin-T oscillator, which uses a notch filter in its feedback loop.",
    Icon: Network, // Suggests network/filter
    content: comingSoonContent
  },
  {
    slug: toSlug("8. Armstrong Oscillator"),
    title: "8. Armstrong Oscillator",
    mainTitle: "The Armstrong (Tickler Coil) Oscillator",
    description: "Learn about the Armstrong oscillator, one of the earliest oscillator circuits using inductive feedback.",
    Icon: Rss, // Suggests radio/early transmission
    content: comingSoonContent
  },
];

export function getOscillatorLessonBySlug(slug: string): OscillatorLesson | undefined {
  return oscillatorLessons.find(lesson => lesson.slug === slug);
}
