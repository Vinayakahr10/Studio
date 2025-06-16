
import type { ReactNode } from 'react';
import type { DCCircuitLesson } from '@/types';
import { Zap, BookOpen, UserCheck, Settings, Sigma, FileText, AlertTriangle, CheckCircle2, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { CodeBlock } from '@/components/content/CodeBlock';

// Helper function to generate slugs (you might want a more robust one)
const toSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/^\d+\.\s*/, '') // Remove numbering like "1. "
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except space and hyphen
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
};

const comingSoonContent = <p>Content for this lesson is coming soon. Check back later!</p>;

export const dcCircuitLessons: DCCircuitLesson[] = [
  { 
    slug: toSlug("1. DC Circuit Theory"), 
    title: "1. Introduction to DC Circuits", 
    mainTitle: "Fundamentals of DC Circuit Theory",
    description: "Introduction to direct current, circuit elements, and basic electrical principles.", 
    Icon: BookOpen,
    content: (
      <>
        <p className="mb-4 text-lg">
          Welcome to the fascinating world of Direct Current (DC) circuits! Understanding DC circuits is the bedrock upon which much of electrical and electronics engineering is built. This lesson will introduce you to the fundamental concepts.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">What is Direct Current (DC)?</h3>
        <p className="mb-4">
          Direct Current refers to the unidirectional flow of electric charge. Unlike Alternating Current (AC), which periodically reverses direction, DC always flows in the same direction. Batteries are a common source of DC power, providing a constant voltage that pushes current through a circuit.
        </p>
        <p className="mb-4">
          Studying DC circuits is crucial because many electronic devices rely on DC power, and the principles learned here are foundational for understanding more complex AC circuits and electronics.
        </p>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Key Components in DC Circuits</h3>
        <p className="mb-2">Simple DC circuits are typically made up of a few key components:</p>
        <ul className="list-disc list-inside space-y-3 mb-6 pl-4">
          <li>
            <strong>Voltage Source:</strong> Provides the electrical pressure (voltage) that drives current. Common examples include batteries (symbol: <code className="font-mono text-primary">---|i---</code>) or DC power supplies.
          </li>
          <li>
            <strong>Resistors:</strong> Components that oppose the flow of current. They are used to limit current, divide voltages, and more. (Symbol: a zigzag line)
          </li>
          <li>
            <strong>Conductors (Wires):</strong> Materials, typically metallic wires, that allow current to flow easily with minimal resistance. They connect components together.
          </li>
          <li>
            <strong>Switches:</strong> Devices used to open or close a circuit, thereby controlling the flow of current.
          </li>
          <li>
            <strong>Loads:</strong> Components that consume electrical energy and convert it into another form, like light (LEDs, lamps), heat (heaters), or motion (motors).
          </li>
        </ul>
        
        <div className="my-6 flex justify-center">
          <Image
            src="https://placehold.co/600x350.png"
            alt="Basic DC Circuit Components Symbols"
            data-ai-hint="circuit symbols battery resistor switch led"
            width={600}
            height={350}
            className="rounded-lg border shadow-md object-contain bg-white p-2"
          />
        </div>
        <p className="text-center text-sm text-muted-foreground italic mb-6">Common symbols for DC circuit components.</p>


        <h3 className="text-2xl font-semibold mt-6 mb-3">Basic Electrical Quantities</h3>
        <ul className="list-disc list-inside space-y-3 mb-6 pl-4">
          <li>
            <strong>Voltage (V):</strong> Also known as potential difference or electromotive force (EMF), it's the electrical pressure or force that causes current to flow. Measured in Volts (V).
          </li>
          <li>
            <strong>Current (I):</strong> The rate of flow of electric charge through a conductor. Measured in Amperes (A or Amps).
          </li>
          <li>
            <strong>Resistance (R):</strong> The opposition to the flow of current. Measured in Ohms (Ω).
          </li>
        </ul>
        <p className="mb-4">These three quantities are related by Ohm's Law, which we will cover in detail in a later lesson.</p>

        <h3 className="text-2xl font-semibold mt-6 mb-3">A Simple DC Circuit Example</h3>
        <p className="mb-2">
          Consider a basic circuit consisting of a battery (voltage source), a switch, a resistor, and an LED (Light Emitting Diode - a load).
        </p>
        <div className="my-6 flex justify-center">
          <Image
            src="https://placehold.co/500x300.png"
            alt="Simple DC Circuit Diagram with Battery, Switch, Resistor, LED"
            data-ai-hint="simple dc circuit battery led resistor switch diagram"
            width={500}
            height={300}
            className="rounded-lg border shadow-md object-contain bg-white p-2"
          />
        </div>
        <p className="mb-4">
          When the switch is closed, a complete path (circuit) is formed. The battery provides voltage, pushing current out from its positive terminal, through the switch, through the resistor (which limits the current to protect the LED), through the LED (causing it to light up), and finally back to the negative terminal of the battery.
        </p>
        <p className="mb-4">
          If the switch is opened, the path is broken, current stops flowing, and the LED turns off.
        </p>

        <p className="mt-6">
          This lesson provides a very basic overview. Subsequent lessons will delve deeper into each component, electrical quantity, and the laws that govern their behavior in DC circuits.
        </p>
      </>
    )
  },
  { slug: toSlug("2. Electrical Units"), title: "2. Electrical Units", description: "Understanding voltage, current, resistance, and power units.", Icon: Settings, content: comingSoonContent },
  { slug: toSlug("3. Ohm's Law & Power"), title: "3. Ohm's Law & Power", description: "Fundamental V-I-R relationship and power calculations.", Icon: Sigma, content: comingSoonContent },
  { slug: toSlug("4. Electrical Energy"), title: "4. Electrical Energy", description: "Concepts of energy, consumption, efficiency, and conversion.", Icon: FileText, content: comingSoonContent },
  { slug: toSlug("5. Voltage Sources"), title: "5. Voltage Sources", description: "Ideal and real voltage sources, internal resistance, models.", Icon: Zap, content: comingSoonContent },
  { slug: toSlug("6. Current Sources"), title: "6. Current Sources", description: "Ideal and real current sources, internal resistance, models.", Icon: Zap, content: comingSoonContent },
  { slug: toSlug("7. Kirchhoff's Laws"), title: "7. Kirchhoff's Laws", description: "General introduction to Kirchhoff's fundamental circuit laws.", Icon: UserCheck, content: comingSoonContent },
  { slug: toSlug("8. KCL"), title: "8. KCL", description: "In-depth exploration of KCL, node analysis, and current conservation.", Icon: UserCheck, content: comingSoonContent },
  { slug: toSlug("9. KVL"), title: "9. KVL", description: "Detailed explanation of KVL, loop analysis, and voltage conservation.", Icon: UserCheck, content: comingSoonContent },
  { slug: toSlug("10. Voltage Divider"), title: "10. Voltage Divider", description: "Voltage division in series circuits and practical applications.", Icon: Settings, content: comingSoonContent },
  { slug: toSlug("11. Current Divider"), title: "11. Current Divider", description: "Current division in parallel circuits and practical applications.", Icon: Settings, content: comingSoonContent },
  { slug: toSlug("12. DC Series Circuit"), title: "12. DC Series Circuit", description: "Analysis of series-connected components, equivalent R, voltage distribution.", Icon: BookOpen, content: comingSoonContent },
  { slug: toSlug("13. DC Parallel Circuit"), title: "13. DC Parallel Circuit", description: "Analysis of parallel-connected components, equivalent R, current distribution.", Icon: BookOpen, content: comingSoonContent },
  { slug: toSlug("14. Combination Circuits"), title: "14. Combination Circuits", description: "Analysis techniques for circuits with series and parallel connections.", Icon: BookOpen, content: comingSoonContent },
  { slug: toSlug("15. Star-Delta Transform"), title: "15. Star-Delta Transform", description: "Convert between star (Y) and delta (Δ) to simplify analysis.", Icon: Settings, content: comingSoonContent },
  { slug: toSlug("16. Mesh Current Analysis"), title: "16. Mesh Current Analysis", description: "Systematic approach to solve circuits by analyzing mesh currents (KVL).", Icon: Sigma, content: comingSoonContent },
  { slug: toSlug("17. Nodal Voltage Analysis"), title: "17. Nodal Voltage Analysis", description: "Systematic approach to solve circuits by analyzing node voltages (KCL).", Icon: Sigma, content: comingSoonContent },
  { slug: toSlug("18. Thevenin's Theorem"), title: "18. Thevenin's Theorem", description: "Simplifying circuits into an equivalent voltage source and series R.", Icon: FileText, content: comingSoonContent },
  { slug: toSlug("19. Norton's Theorem"), title: "19. Norton's Theorem", description: "Simplifying circuits into an equivalent current source and parallel R.", Icon: FileText, content: comingSoonContent },
  { slug: toSlug("20. Superposition"), title: "20. Superposition", description: "Analyzing circuits with multiple sources by considering one at a time.", Icon: CheckCircle2, content: comingSoonContent },
  { slug: toSlug("21. Max Power Transfer"), title: "21. Max Power Transfer", description: "Conditions for transferring maximum power from a source to a load.", Icon: Zap, content: comingSoonContent },
];

export function getDCCircuitLessonBySlug(slug: string): DCCircuitLesson | undefined {
  return dcCircuitLessons.find(lesson => lesson.slug === slug);
}
