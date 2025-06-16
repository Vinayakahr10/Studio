
import type { ReactNode } from 'react';
import type { SemiconductorDeviceLesson } from '@/types';
import { MemoryStick as SemiconductorIcon, DivideSquare, ToggleRight, Thermometer, Power, Waves } from 'lucide-react';

const comingSoonContent = <p>Content for this lesson is coming soon. Check back later!</p>;

export const semiconductorDeviceLessons: SemiconductorDeviceLesson[] = [
  {
    slug: 'introduction-to-semiconductors',
    title: '1. Introduction to Semiconductors',
    mainTitle: 'The Foundation: Semiconductor Materials',
    description: 'Understanding semiconductor materials, intrinsic vs. extrinsic, P-type, N-type, and the concept of energy bands.',
    Icon: SemiconductorIcon,
    content: (
      <>
        <p className="mb-4 text-lg">
          Semiconductor devices are the heart of modern electronics. This lesson introduces the fundamental materials and concepts that make these devices possible.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">What are Semiconductors?</h3>
        <p className="mb-4">
          Semiconductors are materials that have an electrical conductivity value falling between that of a conductor, such as copper, and an insulator, such as glass. Their resistivity falls as their temperature rises; metals behave in the opposite way. Their conducting properties may be altered in useful ways by introducing impurities ("doping") into the crystal structure.
        </p>
        <p className="mb-4">Common semiconductor materials include Silicon (Si), Germanium (Ge), and Gallium Arsenide (GaAs).</p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Key Concepts</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Intrinsic Semiconductors:</strong> Pure semiconductor materials without any significant dopant species present.</li>
          <li><strong>Extrinsic Semiconductors:</strong> Semiconductors that have been doped, meaning impurities have been added to alter their electrical properties.</li>
          <li><strong>N-type Semiconductors:</strong> Doped with donor impurities (e.g., Phosphorus in Silicon), creating an excess of free electrons.</li>
          <li><strong>P-type Semiconductors:</strong> Doped with acceptor impurities (e.g., Boron in Silicon), creating an excess of "holes" (absence of electrons).</li>
          <li><strong>PN Junction:</strong> The boundary or interface between two types of semiconductor material, one P-type and one N-type, inside a single crystal of semiconductor. This junction is fundamental to diodes and transistors.</li>
        </ul>
        <p>Understanding these basics is crucial for comprehending how diodes, transistors, and integrated circuits function.</p>
      </>
    )
  },
  {
    slug: 'diodes',
    title: '2. Diodes: The PN Junction',
    mainTitle: 'Understanding Diodes and the PN Junction',
    description: 'How PN junctions form diodes, forward and reverse bias, and basic diode characteristics.',
    Icon: DivideSquare, // Represents a diode symbol
    content: comingSoonContent
  },
  {
    slug: 'zener-diodes',
    title: '3. Zener Diodes',
    mainTitle: 'Zener Diodes: Voltage Regulation',
    description: 'Principles of Zener breakdown, Zener diode characteristics, and their use in voltage regulation.',
    Icon: DivideSquare,
    content: comingSoonContent
  },
  {
    slug: 'leds-photodiodes',
    title: '4. LEDs and Photodiodes',
    mainTitle: 'Light Emitting and Light Detecting Diodes',
    description: 'Exploring Light Emitting Diodes (LEDs), their operation, and photodiodes for light detection.',
    Icon: Thermometer, // Placeholder, better icon needed for light
    content: comingSoonContent
  },
  {
    slug: 'bjt-revisited',
    title: '5. BJT (Bipolar Junction Transistors) Revisited',
    mainTitle: 'Deep Dive into BJT Operation',
    description: 'A comprehensive look at BJT structure (NPN, PNP), operating modes (cutoff, active, saturation), and basic biasing.',
    Icon: ToggleRight,
    content: comingSoonContent // This could link to or consolidate content from the separate BJT series
  },
  {
    slug: 'fets-jfet-mosfet',
    title: '6. FETs: JFETs and MOSFETs',
    mainTitle: 'Introduction to Field-Effect Transistors',
    description: 'Overview of Field-Effect Transistors, including JFETs and MOSFETs (enhancement and depletion modes).',
    Icon: Power, // Placeholder, needs a FET symbol icon
    content: comingSoonContent
  },
  {
    slug: 'thyristors-scr-triac',
    title: '7. Thyristors: SCRs and TRIACs',
    mainTitle: 'Power Control with Thyristors',
    description: 'Understanding Silicon Controlled Rectifiers (SCRs) and TRIACs for high-power switching applications.',
    Icon: Waves, // Placeholder
    content: comingSoonContent
  },
];

export function getSemiconductorDeviceLessonBySlug(slug: string): SemiconductorDeviceLesson | undefined {
  return semiconductorDeviceLessons.find(lesson => lesson.slug === slug);
}
