
import type { ReactNode } from 'react';
import type { DigitalElectronicsLesson } from '@/types';
import { Binary, Atom, FunctionSquare, Sigma, IterationCcw, Rows, CheckSquare, FileText, HelpCircle, Calculator, Palette } from 'lucide-react';

const comingSoonContent = <p>Content for this lesson is coming soon. Check back later!</p>;

// Helper function to generate slugs
const toSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/^\d+\.\s*/, '') // Remove numbering like "1. "
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except space and hyphen
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-');
};

export const digitalElectronicsLessons: DigitalElectronicsLesson[] = [
  {
    slug: 'introduction-to-digital-electronics',
    title: '1. Introduction to Digital Electronics',
    mainTitle: 'The World of Digital Systems',
    description: 'Understanding the basics of digital signals, logic levels, and their importance in modern electronics.',
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
    Icon: Binary,
    content: comingSoonContent
  },
  {
    slug: 'logic-gates',
    title: '3. Logic Gates',
    mainTitle: 'Fundamental Building Blocks: Logic Gates',
    description: 'Explore basic logic gates (AND, OR, NOT, XOR, NAND, NOR), their symbols, truth tables, and functions.',
    Icon: Atom, 
    content: comingSoonContent
  },
  { 
    slug: 'boolean-algebra',
    title: '4. Boolean Algebra Introduction',
    mainTitle: 'The Mathematics of Digital Logic',
    description: 'General introduction to Boolean algebra, its postulates, basic theorems, and its role in digital circuit analysis and simplification.',
    Icon: FunctionSquare,
    content: comingSoonContent
  },
  {
    slug: toSlug('5. Logic AND Function'),
    title: '5. Logic AND Function',
    mainTitle: 'The AND Gate and its Function',
    description: 'Detailed explanation of the AND logic function, its symbol, truth table, and common uses.',
    Icon: Atom,
    content: comingSoonContent
  },
  {
    slug: toSlug('6. Logic OR Function'),
    title: '6. Logic OR Function',
    mainTitle: 'The OR Gate and its Function',
    description: 'Detailed explanation of the OR logic function, its symbol, truth table, and common uses.',
    Icon: Atom,
    content: comingSoonContent
  },
  {
    slug: toSlug('7. Logic NOT Function'),
    title: '7. Logic NOT Function (Inverter)',
    mainTitle: 'The NOT Gate (Inverter) and its Function',
    description: 'Detailed explanation of the NOT logic function (inverter), its symbol, truth table, and importance.',
    Icon: Atom,
    content: comingSoonContent
  },
  {
    slug: toSlug('8. Logic NAND Function'),
    title: '8. Logic NAND Function',
    mainTitle: 'The NAND Gate and its Function',
    description: 'Understanding the NAND logic function as a universal gate, its symbol, and truth table.',
    Icon: Atom,
    content: comingSoonContent
  },
  {
    slug: toSlug('9. Logic NOR Function'),
    title: '9. Logic NOR Function',
    mainTitle: 'The NOR Gate and its Function',
    description: 'Understanding the NOR logic function as another universal gate, its symbol, and truth table.',
    Icon: Atom,
    content: comingSoonContent
  },
  {
    slug: toSlug('10. Laws of Boolean Algebra'),
    title: '10. Laws of Boolean Algebra',
    mainTitle: 'Fundamental Laws and Theorems of Boolean Algebra',
    description: 'Exploring commutative, associative, distributive laws, identity, complement, and other key Boolean theorems.',
    Icon: FunctionSquare,
    content: comingSoonContent
  },
  {
    slug: toSlug('11. Boolean Algebra Truth Tables'),
    title: '11. Boolean Algebra Truth Tables',
    mainTitle: 'Using Truth Tables in Boolean Algebra',
    description: 'How to construct and use truth tables to prove Boolean identities and analyze logic functions.',
    Icon: CheckSquare,
    content: comingSoonContent
  },
  {
    slug: toSlug('12. Boolean Algebra Examples'),
    title: '12. Boolean Algebra Examples',
    mainTitle: 'Practical Examples of Boolean Algebra',
    description: 'Worked examples demonstrating the application of Boolean laws and theorems for expression simplification.',
    Icon: Palette, // Icon for examples/creative application
    content: comingSoonContent
  },
  {
    slug: toSlug('13. DeMorgan’s Theorem'),
    title: '13. DeMorgan’s Theorem',
    mainTitle: 'Understanding DeMorgan’s Theorem',
    description: 'Detailed explanation of DeMorgan’s theorems and their use in simplifying complex Boolean expressions and converting logic forms.',
    Icon: FunctionSquare,
    content: comingSoonContent
  },
  {
    slug: toSlug('14. Switching Theory'),
    title: '14. Switching Theory Basics',
    mainTitle: 'Introduction to Switching Theory',
    description: 'Basic concepts of switching algebra and its relation to logic circuits and Boolean functions.',
    Icon: HelpCircle, // For theory/concepts
    content: comingSoonContent
  },
  {
    slug: toSlug('15. Sum of Product (SOP)'),
    title: '15. Sum of Product (SOP) Form',
    mainTitle: 'Boolean Expressions: Sum of Product Form',
    description: 'Understanding the Sum of Product (SOP) canonical form and its derivation from truth tables.',
    Icon: Calculator,
    content: comingSoonContent
  },
  {
    slug: toSlug('16. Product of Sum (POS)'),
    title: '16. Product of Sum (POS) Form',
    mainTitle: 'Boolean Expressions: Product of Sum Form',
    description: 'Understanding the Product of Sum (POS) canonical form and its derivation from truth tables.',
    Icon: Calculator,
    content: comingSoonContent
  },
  {
    slug: toSlug('17. Boolean Algebra Simplification'),
    title: '17. Boolean Algebra Simplification Techniques',
    mainTitle: 'Simplifying Boolean Expressions',
    description: 'Methods for simplifying Boolean expressions, including algebraic manipulation and Karnaugh Maps (K-Maps overview).',
    Icon: FileText,
    content: comingSoonContent
  },
  {
    slug: 'combinational-logic-circuits',
    title: '18. Combinational Logic Circuits', // Was 5
    mainTitle: 'Designing Combinational Circuits',
    description: 'Learn about circuits whose outputs depend solely on the current inputs, such as adders, decoders, and multiplexers.',
    Icon: Sigma, 
    content: comingSoonContent
  },
  {
    slug: 'sequential-logic-circuits',
    title: '19. Sequential Logic Circuits', // Was 6
    mainTitle: 'Circuits with Memory: Sequential Logic',
    description: 'Introduction to circuits with memory elements like flip-flops, and their use in counters and registers.',
    Icon: IterationCcw,
    content: comingSoonContent
  },
  {
    slug: 'counters-and-registers',
    title: '20. Counters and Registers', // Was 7
    mainTitle: 'Practical Sequential Circuits',
    description: 'Detailed exploration of different types of counters (asynchronous, synchronous) and registers (shift registers).',
    Icon: Rows,
    content: comingSoonContent
  },
];

export function getDigitalElectronicsLessonBySlug(slug: string): DigitalElectronicsLesson | undefined {
  return digitalElectronicsLessons.find(lesson => lesson.slug === slug);
}
