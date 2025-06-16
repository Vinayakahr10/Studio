
import type { ReactNode } from 'react';
import type { PowerElectronicsLesson } from '@/types';
import { BatteryCharging, Zap, ArrowRightLeft, Repeat, Settings2 } from 'lucide-react';

const comingSoonContent = <p>Content for this lesson is coming soon. Check back later!</p>;

export const powerElectronicsLessons: PowerElectronicsLesson[] = [
  {
    slug: 'introduction-to-power-electronics',
    title: '1. Introduction to Power Electronics',
    mainTitle: 'The Realm of Power Conversion',
    description: 'Overview of power electronics, its applications, and the key types of power electronic converters.',
    difficulty: 'Beginner',
    Icon: BatteryCharging,
    content: (
      <>
        <p className="mb-4 text-lg">
          Power electronics deals with the control and conversion of electrical power. It plays a crucial role in a wide range of applications, from everyday consumer electronics to large industrial systems, renewable energy, and electric vehicles.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">What is Power Electronics?</h3>
        <p className="mb-4">
          The primary goal of power electronics is to process and control the flow of electrical energy by supplying voltages and currents in a form that is optimally suited for user loads. This often involves converting electrical energy from one form to another (e.g., AC to DC, DC to DC).
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Key Converter Types</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Rectifiers (AC-DC Converters):</strong> Convert AC voltage to DC voltage. Used in power supplies for most electronic devices.</li>
          <li><strong>Inverters (DC-AC Converters):</strong> Convert DC voltage to AC voltage. Used in uninterruptible power supplies (UPS), solar inverters, and motor drives.</li>
          <li><strong>DC-DC Converters (Choppers):</strong> Convert a DC voltage to a different DC voltage level (step-up or step-down). Essential in battery-powered devices and voltage regulation.</li>
          <li><strong>AC-AC Converters (Cycloconverters/Voltage Controllers):</strong> Convert an AC voltage to another AC voltage with different magnitude or frequency.</li>
        </ul>
        <p>This series will delve into the principles, devices, and circuits used in these power conversion processes.</p>
      </>
    )
  },
  {
    slug: 'power-semiconductor-devices',
    title: '2. Power Semiconductor Devices',
    mainTitle: 'Key Components in Power Electronics',
    description: 'Introduction to power diodes, SCRs, TRIACs, GTOs, power BJTs, MOSFETs, and IGBTs used in power converters.',
    difficulty: 'Intermediate',
    Icon: Zap,
    content: comingSoonContent
  },
  {
    slug: 'rectifiers-ac-dc-conversion',
    title: '3. Rectifiers (AC-DC Conversion)',
    mainTitle: 'Converting AC to DC: Rectifier Circuits',
    description: 'Study of single-phase and three-phase rectifiers, including half-wave, full-wave, and bridge rectifiers.',
    difficulty: 'Intermediate',
    Icon: ArrowRightLeft, // Symbolizing AC to DC flow
    content: comingSoonContent
  },
  {
    slug: 'dc-dc-converters',
    title: '4. DC-DC Converters (Choppers)',
    mainTitle: 'Step-Up and Step-Down DC Converters',
    description: 'Analysis of buck, boost, buck-boost, Cuk, and SEPIC converters for DC voltage level control.',
    difficulty: 'Advanced',
    Icon: Repeat, // Symbolizing DC to DC transformation
    content: comingSoonContent
  },
  {
    slug: 'inverters-dc-ac-conversion',
    title: '5. Inverters (DC-AC Conversion)',
    mainTitle: 'Generating AC from DC: Inverter Circuits',
    description: 'Principles of voltage source inverters (VSI), current source inverters (CSI), and PWM techniques for waveform generation.',
    difficulty: 'Advanced',
    Icon: ArrowRightLeft, // DC to AC, reverse of rectifier icon
    content: comingSoonContent
  },
  {
    slug: 'power-supplies-design',
    title: '6. Power Supply Design',
    mainTitle: 'Designing Linear and Switched-Mode Power Supplies',
    description: 'Fundamentals of linear power supplies (LPS) and switched-mode power supplies (SMPS), including design considerations and topologies.',
    difficulty: 'Advanced',
    Icon: Settings2,
    content: comingSoonContent
  },
];

export function getPowerElectronicsLessonBySlug(slug: string): PowerElectronicsLesson | undefined {
  return powerElectronicsLessons.find(lesson => lesson.slug === slug);
}
