
import type { ReactNode } from 'react';
import type { ACCircuitLesson } from '@/types';
import { Activity, BookOpen, Sigma, Zap, TrendingUp, Filter, Magnet, RefreshCw, CircuitBoard, Waves, Combine, BarChartBig, Network, SlidersHorizontal } from 'lucide-react'; // Added more icons

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

export const acCircuitLessons: ACCircuitLesson[] = [
  {
    slug: toSlug("1. Introduction to AC Circuits"),
    title: "1. Introduction to AC Circuits",
    mainTitle: "Fundamentals of AC Circuit Theory",
    description: "Understanding alternating current, sine waves, frequency, phase, and RMS values.",
    difficulty: "Beginner",
    Icon: Activity,
    content: (
      <>
        <p className="mb-4 text-lg">
          Welcome to the world of Alternating Current (AC) circuits! This lesson introduces the fundamental concepts of AC, which is the form of electricity that powers our homes and industries.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">What is Alternating Current (AC)?</h3>
        <p className="mb-4">
          Alternating Current (AC) is an electric current which periodically reverses direction, in contrast to Direct Current (DC) which flows only in one direction. The most common waveform for AC is a sine wave.
        </p>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Key Characteristics of AC Sine Waves</h3>
        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
          <li><strong>Frequency (f):</strong> The number of cycles per second, measured in Hertz (Hz). Standard power line frequency is 50 Hz or 60 Hz depending on the region.</li>
          <li><strong>Period (T):</strong> The time it takes to complete one full cycle (T = 1/f).</li>
          <li><strong>Amplitude (Peak Value):</strong> The maximum value of voltage or current from the zero point.</li>
          <li><strong>Peak-to-Peak Value:</strong> The difference between the maximum positive and maximum negative amplitudes.</li>
          <li><strong>RMS (Root Mean Square) Value:</strong> The effective value of an AC voltage or current. For a sine wave, V<sub>RMS</sub> = V<sub>peak</sub> / √2. This is the value typically quoted for AC supplies (e.g., 120V AC or 230V AC).</li>
          <li><strong>Phase:</strong> The position of a point in time on a waveform cycle. Phase difference describes the time shift between two waveforms of the same frequency.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Why Use AC?</h3>
        <p className="mb-4">
          AC is widely used for power distribution because its voltage can be easily stepped up or down using transformers. This allows for efficient transmission of power over long distances at high voltages (reducing resistive losses) and then stepping down to safer, usable voltages for consumers.
        </p>
        {/* Placeholder for AC waveform image */}
        <div className="my-6 flex justify-center">
          <div className="w-full max-w-md bg-muted/30 p-4 rounded-lg text-center text-muted-foreground">
             Image Placeholder: AC Sine Wave Diagram showing Amplitude, Period, etc. (600x300)
             data-ai-hint="ac sine wave diagram"
          </div>
        </div>
        <p className="mt-4">
          This introduction is just the beginning. AC circuit analysis involves concepts like impedance, reactance, phasors, and power factor, which we will explore in subsequent lessons.
        </p>
      </>
    )
  },
  {
    slug: toSlug("2. Electromagnetism for AC Circuits"),
    title: "2. Electromagnetism for AC Circuits",
    mainTitle: "Electromagnetism: The Basis of AC Components",
    description: "Fundamental principles of electromagnetism relevant to understanding inductors, transformers, and AC phenomena.",
    difficulty: "Beginner",
    Icon: Magnet,
    content: comingSoonContent
  },
  {
    slug: toSlug("3. Capacitors in AC Circuits"),
    title: "3. Capacitors in AC Circuits",
    mainTitle: "Capacitive Reactance and Behavior",
    description: "Explore how capacitors behave in AC circuits, understanding capacitive reactance (Xc) and phase relationships.",
    difficulty: "Intermediate",
    Icon: Zap, 
    content: comingSoonContent
  },
  {
    slug: toSlug("4. Inductors in AC Circuits"),
    title: "4. Inductors in AC Circuits",
    mainTitle: "Inductive Reactance and Behavior",
    description: "Learn about inductors in AC circuits, inductive reactance (XL), and their phase characteristics.",
    difficulty: "Intermediate",
    Icon: Magnet,
    content: comingSoonContent
  },
  {
    slug: toSlug("5. Impedance and Phasors"),
    title: "5. Impedance and Phasors",
    mainTitle: "Combining Resistance and Reactance",
    description: "Understand impedance (Z) as the total opposition to AC current flow and use phasors for AC circuit analysis.",
    difficulty: "Intermediate",
    Icon: Sigma,
    content: comingSoonContent
  },
  {
    slug: toSlug("6. Series RLC Circuits"),
    title: "6. Series RLC Circuits",
    mainTitle: "Analyzing Series RLC Configurations",
    description: "Analyze circuits containing resistors, inductors, and capacitors connected in series under AC conditions.",
    difficulty: "Intermediate",
    Icon: CircuitBoard,
    content: comingSoonContent
  },
  {
    slug: toSlug("7. Parallel RLC Circuits"),
    title: "7. Parallel RLC Circuits",
    mainTitle: "Analyzing Parallel RLC Configurations",
    description: "Analyze circuits containing resistors, inductors, and capacitors connected in parallel under AC conditions.",
    difficulty: "Intermediate",
    Icon: Combine,
    content: comingSoonContent
  },
  {
    slug: toSlug("8. Resonance in AC Circuits"),
    title: "8. Resonance in AC Circuits",
    mainTitle: "Series and Parallel Resonance",
    description: "Explore the phenomenon of resonance in series and parallel RLC circuits, including resonant frequency and Q factor.",
    difficulty: "Advanced",
    Icon: Waves,
    content: comingSoonContent
  },
  {
    slug: toSlug("9. AC Filters"),
    title: "9. AC Filters",
    mainTitle: "Passive Low-Pass, High-Pass, and Band-Pass Filters",
    description: "Learn about different types of passive AC filters (low-pass, high-pass, band-pass) and their frequency response.",
    difficulty: "Advanced",
    Icon: Filter,
    content: comingSoonContent
  },
  {
    slug: toSlug("10. RC Networks in AC Circuits"),
    title: "10. RC Networks in AC Circuits",
    mainTitle: "RC Network Analysis: Phase Shift & Time Constants",
    description: "Detailed analysis of RC networks, including phase shift, time constants, and applications like coupling/decoupling.",
    difficulty: "Intermediate",
    Icon: Network,
    content: comingSoonContent
  },
  {
    slug: toSlug("11. Attenuators in AC Circuits"),
    title: "11. Attenuators in AC Circuits",
    mainTitle: "Designing and Analyzing AC Attenuators",
    description: "Learn about resistive attenuators (e.g., T-type, Pi-type) for reducing AC signal levels.",
    difficulty: "Intermediate",
    Icon: SlidersHorizontal,
    content: comingSoonContent
  },
  {
    slug: toSlug("12. Transformers"),
    title: "12. Transformers",
    mainTitle: "Principles and Applications of Transformers",
    description: "Understand the operating principles of transformers, voltage/current transformation, and their applications in AC systems.",
    difficulty: "Intermediate",
    Icon: RefreshCw,
    content: comingSoonContent
  },
  {
    slug: toSlug("13. AC Power and Power Factor"),
    title: "13. AC Power and Power Factor",
    mainTitle: "Understanding Real, Reactive, and Apparent Power",
    description: "Delve into AC power calculations, including real power, reactive power, apparent power, and the concept of power factor correction.",
    difficulty: "Advanced",
    Icon: BarChartBig,
    content: comingSoonContent
  },
];

export function getACCircuitLessonBySlug(slug: string): ACCircuitLesson | undefined {
  return acCircuitLessons.find(lesson => lesson.slug === slug);
}
