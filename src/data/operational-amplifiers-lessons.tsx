
import type { ReactNode } from 'react';
import type { OpAmpLesson } from '@/types';
import { Triangle, ListChecks, SlidersHorizontal, Sigma, MinusSquare, PlusSquare, Filter } from 'lucide-react';

const comingSoonContent = <p>Content for this lesson is coming soon. Check back later!</p>;

export const opAmpLessons: OpAmpLesson[] = [
  {
    slug: 'introduction-to-op-amps',
    title: '1. Introduction to Operational Amplifiers',
    mainTitle: 'The Versatile Op-Amp: An Introduction',
    description: 'What an Op-Amp is, its symbol, basic terminals, and why it\'s a cornerstone of analog circuit design.',
    difficulty: 'Beginner',
    Icon: Triangle,
    content: (
      <>
        <p className="mb-4 text-lg">
          Operational Amplifiers, commonly known as Op-Amps, are fundamental building blocks in analog electronics. They are high-gain, direct-coupled voltage amplifiers typically characterized by differential inputs and, usually, a single-ended output.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">What is an Op-Amp?</h3>
        <p className="mb-4">
          Op-Amps were originally developed for performing mathematical operations in analog computers (hence the name "operational"). Today, their versatility makes them indispensable in a vast array of applications including signal amplification, filtering, signal conditioning, and waveform generation.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Key Characteristics (Ideal Op-Amp)</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Infinite Open-Loop Gain (A<sub>VOL</sub>):</strong> The gain without any feedback is extremely large.</li>
          <li><strong>Infinite Input Impedance (Z<sub>in</sub>):</strong> It draws no current from the input source.</li>
          <li><strong>Zero Output Impedance (Z<sub>out</sub>):</strong> It can supply any amount of current to the load without its output voltage changing.</li>
          <li><strong>Infinite Bandwidth:</strong> It can amplify signals of any frequency equally.</li>
          <li><strong>Zero Offset Voltage:</strong> Output is zero when input voltage difference is zero.</li>
        </ul>
        <p>While real Op-Amps approximate these ideal characteristics, they are never perfect. Understanding these ideal properties, however, greatly simplifies the analysis of Op-Amp circuits.</p>
      </>
    )
  },
  {
    slug: 'ideal-op-amp-characteristics',
    title: '2. Ideal Op-Amp Characteristics & Golden Rules',
    mainTitle: 'The Ideal Op-Amp and Its "Golden Rules"',
    description: 'Detailed look at the properties of an ideal Op-Amp and the two "golden rules" for analyzing circuits with negative feedback.',
    difficulty: 'Beginner',
    Icon: ListChecks,
    content: comingSoonContent
  },
  {
    slug: 'inverting-amplifier',
    title: '3. The Inverting Amplifier',
    mainTitle: 'Op-Amp Inverting Amplifier Configuration',
    description: 'Analysis and design of the inverting amplifier configuration, including gain calculation and characteristics.',
    difficulty: 'Intermediate',
    Icon: MinusSquare,
    content: comingSoonContent
  },
  {
    slug: 'non-inverting-amplifier',
    title: '4. The Non-Inverting Amplifier',
    mainTitle: 'Op-Amp Non-Inverting Amplifier Configuration',
    description: 'Analysis and design of the non-inverting amplifier, its gain formula, and applications.',
    difficulty: 'Intermediate',
    Icon: PlusSquare,
    content: comingSoonContent
  },
  {
    slug: 'summing-and-difference-amplifiers',
    title: '5. Summing and Difference Amplifiers',
    mainTitle: 'Mathematical Operations with Op-Amps',
    description: 'Using Op-Amps to create circuits that can add or subtract input voltages.',
    difficulty: 'Intermediate',
    Icon: Sigma,
    content: comingSoonContent
  },
  {
    slug: 'op-amps-as-filters',
    title: '6. Op-Amps in Active Filters',
    mainTitle: 'Designing Active Filters with Op-Amps',
    description: 'Introduction to active filters (low-pass, high-pass, band-pass) using Op-Amps.',
    difficulty: 'Advanced',
    Icon: Filter,
    content: comingSoonContent
  },
  {
    slug: 'op-amp-comparators',
    title: '7. Op-Amps as Comparators',
    mainTitle: 'Using Op-Amps for Voltage Comparison',
    description: 'Understanding how Op-Amps can be used without feedback to compare two voltages.',
    difficulty: 'Intermediate',
    Icon: SlidersHorizontal,
    content: comingSoonContent
  },
];

export function getOpAmpLessonBySlug(slug: string): OpAmpLesson | undefined {
  return opAmpLessons.find(lesson => lesson.slug === slug);
}
