
import type { ReactNode } from 'react';
import type { DigitalElectronicsLesson } from '@/types';
import { Binary, Atom, FunctionSquare, Sigma, IterationCcw, Rows } from 'lucide-react';

const comingSoonContent = <p>Content for this lesson is coming soon. Check back later!</p>;

export const digitalElectronicsLessons: DigitalElectronicsLesson[] = [
  {
    slug: 'introduction-to-digital-electronics',
    title: '1. Introduction to Digital Electronics',
    mainTitle: 'The World of Digital Systems',
    description: 'Understanding the basics of digital signals, logic levels, and their importance in modern electronics.',
    difficulty: 'Beginner',
    Icon: Binary,
    content: (
      <>
        <p className="mb-4 text-lg">
          Digital electronics is a field of electronics involving the study of digital signals and the engineering of devices that use or produce them. Unlike analog electronics which deals with continuously varying signals, digital electronics works with discrete signals, typically represented as two distinct voltage levels: HIGH and LOW (often representing binary 1 and 0).
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Why Digital?</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Noise Immunity:</strong> Digital signals are more resistant to noise. Small variations in voltage don't usually change the interpretation of a HIGH or LOW state.</li>
          <li><strong>Ease of Design:</strong> Digital circuits can be easier to design and reproduce reliably.</li>
          <li><strong>Programmability:</strong> Digital systems can be easily programmed and reconfigured (e.g., microprocessors, FPGAs).</li>
          <li><strong>Information Storage:</strong> Digital information can be stored and retrieved with high accuracy.</li>
        </ul>
        <p>This series will cover fundamental topics like binary numbers, logic gates, Boolean algebra, and various digital circuit designs.</p>
      </>
    )
  },
  {
    slug: 'binary-numbers',
    title: '2. Binary Numbers',
    mainTitle: 'Understanding the Binary System',
    description: 'Learn about the binary number system (base-2), its relationship to digital logic, and conversions to/from decimal.',
    difficulty: 'Beginner',
    Icon: Binary,
    content: comingSoonContent
  },
  {
    slug: 'logic-gates',
    title: '3. Logic Gates',
    mainTitle: 'Fundamental Building Blocks: Logic Gates',
    description: 'Explore basic logic gates (AND, OR, NOT, XOR, NAND, NOR), their symbols, truth tables, and functions.',
    difficulty: 'Beginner',
    Icon: Atom, // Placeholder, a better icon might be multiple gate symbols combined
    content: comingSoonContent
  },
  {
    slug: 'boolean-algebra',
    title: '4. Boolean Algebra',
    mainTitle: 'The Mathematics of Digital Logic',
    description: 'Introduction to Boolean algebra, its postulates, theorems, and how it is used to analyze and simplify logic circuits.',
    difficulty: 'Intermediate',
    Icon: FunctionSquare,
    content: comingSoonContent
  },
  {
    slug: 'combinational-logic-circuits',
    title: '5. Combinational Logic Circuits',
    mainTitle: 'Designing Combinational Circuits',
    description: 'Learn about circuits whose outputs depend solely on the current inputs, such as adders, decoders, and multiplexers.',
    difficulty: 'Intermediate',
    Icon: Sigma, // Represents sum-of-products
    content: comingSoonContent
  },
  {
    slug: 'sequential-logic-circuits',
    title: '6. Sequential Logic Circuits',
    mainTitle: 'Circuits with Memory: Sequential Logic',
    description: 'Introduction to circuits with memory elements like flip-flops, and their use in counters and registers.',
    difficulty: 'Intermediate',
    Icon: IterationCcw,
    content: comingSoonContent
  },
  {
    slug: 'counters-and-registers',
    title: '7. Counters and Registers',
    mainTitle: 'Practical Sequential Circuits',
    description: 'Detailed exploration of different types of counters (asynchronous, synchronous) and registers (shift registers).',
    difficulty: 'Advanced',
    Icon: Rows,
    content: comingSoonContent
  },
];

export function getDigitalElectronicsLessonBySlug(slug: string): DigitalElectronicsLesson | undefined {
  return digitalElectronicsLessons.find(lesson => lesson.slug === slug);
}
