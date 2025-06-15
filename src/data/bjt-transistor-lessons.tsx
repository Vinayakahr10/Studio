
import type { ReactNode } from 'react';
import type { ArduinoLesson as BJTLesson } from '@/types'; // Reusing ArduinoLesson type structure for simplicity
import { CodeBlock } from '@/components/content/CodeBlock';
import Image from 'next/image';

const comingSoonContent = <p>Content for this lesson is coming soon. Check back later!</p>;

export const bjtTutorialLessons: BJTLesson[] = [
  {
    slug: 'introduction-to-bjt',
    title: '1. Introduction to BJT Transistors',
    description: 'Understanding Bipolar Junction Transistors, their types, construction, and basic operation including operating regions and biasing.',
    mainTitle: 'BJT: An Introduction to Bipolar Junction Transistors',
    content: (
      <>
        <p className="mb-4 text-lg">
          Bipolar Junction Transistors (BJTs) are three-terminal semiconductor devices fundamental to electronics, used primarily for amplification and switching. They are called "bipolar" because their operation involves both electrons and holes as charge carriers.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">What is a BJT?</h3>
        <p className="mb-4">
          A BJT is constructed with three alternating layers of P-type and N-type semiconductor material, forming two P-N junctions. These layers are named the Emitter, the Base, and the Collector.
        </p>
        
        <h3 className="text-2xl font-semibold mt-6 mb-3">Types and Construction of BJTs</h3>
        <p className="mb-2">There are two main types of BJTs, distinguished by their layer arrangement:</p>
        
        <div className="my-6 space-y-8">
          <div>
            <h4 className="text-xl font-semibold mb-2 text-primary/90">NPN Transistor</h4>
            <p className="mb-3">
              An NPN transistor consists of a thin layer of P-type semiconductor (the Base) sandwiched between two layers of N-type semiconductor (the Emitter and the Collector).
              In normal operation for amplification, the Emitter-Base junction is forward-biased, and the Collector-Base junction is reverse-biased. A small current flowing from the base to the emitter controls a larger current flowing from the collector to the emitter. The schematic symbol arrow on the emitter points outwards, indicating the direction of conventional current flow when forward-biased.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex flex-col items-center p-2 border rounded-lg shadow-sm bg-card">
                <Image
                    src="https://placehold.co/280x230.png"
                    alt="NPN Transistor Schematic Symbol"
                    data-ai-hint="npn transistor symbol schematic"
                    width={280}
                    height={230}
                    className="rounded-md object-contain bg-white p-1"
                />
                <p className="text-sm text-muted-foreground italic mt-2">NPN Transistor Schematic Symbol</p>
              </div>
              <div className="flex flex-col items-center p-2 border rounded-lg shadow-sm bg-card">
                <Image
                    src="https://placehold.co/280x230.png"
                    alt="NPN Transistor Layered Structure"
                    data-ai-hint="npn transistor layers"
                    width={280}
                    height={230}
                    className="rounded-md object-contain bg-white p-1"
                />
                <p className="text-sm text-muted-foreground italic mt-2">NPN Transistor Layered Structure</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2 text-primary/90">PNP Transistor</h4>
             <p className="mb-3">
              A PNP transistor consists of a thin layer of N-type semiconductor (the Base) sandwiched between two layers of P-type semiconductor (the Emitter and the Collector).
              Operation is similar to NPN but with polarities reversed. The Emitter-Base junction is forward-biased, and the Collector-Base junction is reverse-biased for amplification. A small current flowing out of the base controls a larger current flowing from the emitter to the collector. The schematic symbol arrow on the emitter points inwards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex flex-col items-center p-2 border rounded-lg shadow-sm bg-card">
                  <Image
                      src="https://placehold.co/280x230.png"
                      alt="PNP Transistor Schematic Symbol"
                      data-ai-hint="pnp transistor symbol schematic"
                      width={280}
                      height={230}
                      className="rounded-md object-contain bg-white p-1"
                  />
                  <p className="text-sm text-muted-foreground italic mt-2">PNP Transistor Schematic Symbol</p>
              </div>
              <div className="flex flex-col items-center p-2 border rounded-lg shadow-sm bg-card">
                  <Image
                      src="https://placehold.co/280x230.png"
                      alt="PNP Transistor Layered Structure"
                      data-ai-hint="pnp transistor layers"
                      width={280}
                      height={230}
                      className="rounded-md object-contain bg-white p-1"
                  />
                  <p className="text-sm text-muted-foreground italic mt-2">PNP Transistor Layered Structure</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mt-8 mb-3">Basic BJT Operation & Terminals</h3>
        <p className="mb-4">
          The BJT has two P-N junctions: the Emitter-Base (E-B) junction and the Collector-Base (C-B) junction. The way these junctions are biased (forward or reverse) determines the transistor's operating mode.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
          <li><strong>Emitter (E):</strong> This region is heavily doped compared to the other two layers. Its job is to inject a large number of majority charge carriers (electrons for NPN, holes for PNP) into the base.</li>
          <li><strong>Base (B):</strong> This region is very thin and lightly doped. It allows most of the charge carriers injected from the emitter to pass through to the collector. The small base current (I<sub>B</sub>) is used to control the much larger collector current (I<sub>C</sub>).</li>
          <li><strong>Collector (C):</strong> This region is moderately doped and is physically the largest of the three. Its purpose is to collect the charge carriers that have diffused through the base. The C-B junction is usually reverse-biased in normal operation (active mode).</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Operating Regions & Biasing</h3>
        <p className="mb-2">A BJT's behavior is defined by its operating region, which depends on the biasing of its two junctions:</p>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Region</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Emitter-Base Junction (E-B)</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Collector-Base Junction (C-B)</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Application</th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">Cutoff</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Reverse-Biased</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Reverse-Biased</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Switch "OFF"</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">Active</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Forward-Biased</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Reverse-Biased</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Amplifier</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">Saturation</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Forward-Biased</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Forward-Biased</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Switch "ON"</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4">
          In the <strong>Active Region</strong>, I<sub>C</sub> ≈ β * I<sub>B</sub>, where β (beta) or h<sub>FE</sub> is the DC current gain.
          In <strong>Cutoff</strong>, ideally I<sub>C</sub> = 0.
          In <strong>Saturation</strong>, I<sub>C</sub> is maximized, limited by the external circuit, and V<sub>CE(sat)</sub> (collector-emitter saturation voltage) is very small (typically 0.1V to 0.3V).
        </p>
        
        <div className="my-6 flex flex-col items-center gap-2">
          <Image
            src="https://placehold.co/600x400.png"
            alt="BJT Output Characteristic Curves"
            data-ai-hint="bjt output characteristic curve regions"
            width={600}
            height={400}
            className="rounded-lg border shadow-md object-contain bg-white p-2"
          />
           <p className="text-sm text-muted-foreground italic mt-1 text-center">Conceptual BJT Output Characteristic Curves showing operating regions (I<sub>C</sub> vs. V<sub>CE</sub> for different I<sub>B</sub>).</p>
        </div>

        <p className="mt-4">
          Understanding these basic concepts and operating regions is crucial for effectively using BJTs in electronic circuits, whether for switching applications or for signal amplification. Subsequent lessons will delve deeper into these applications.
        </p>
      </>
    ),
  },
  {
    slug: 'bjt-as-a-switch',
    title: '2. BJT as a Switch',
    description: 'Using NPN and PNP transistors as electronic switches, covering cutoff and saturation regions.',
    mainTitle: 'Using BJT Transistors as Electronic Switches',
    content: comingSoonContent,
  },
  {
    slug: 'bipolar-transistor-overview',
    title: '3. Bipolar Transistor Overview',
    description: 'A general overview of bipolar transistors, revisiting key characteristics and behaviors.',
    mainTitle: 'Bipolar Transistor: A Deeper Overview',
    content: comingSoonContent,
  },
  {
    slug: 'npn-transistor-details',
    title: '4. NPN Transistor In-Depth',
    description: 'Detailed look at NPN transistor operation, biasing, and typical applications.',
    mainTitle: 'NPN Transistor: In-Depth Analysis',
    content: comingSoonContent,
  },
  {
    slug: 'pnp-transistor-details',
    title: '5. PNP Transistor In-Depth',
    description: 'Detailed look at PNP transistor operation, biasing, and typical applications.',
    mainTitle: 'PNP Transistor: In-Depth Analysis',
    content: comingSoonContent,
  },
  {
    slug: 'junction-field-effect-transistor-jfet',
    title: '6. Junction Field Effect Transistor (JFET)',
    description: 'Introduction to JFETs, their types (N-channel, P-channel), operation, and characteristics.',
    mainTitle: 'Understanding Junction Field Effect Transistors (JFETs)',
    content: comingSoonContent,
  },
  {
    slug: 'mosfet-basics',
    title: '7. MOSFET Basics',
    description: 'Introduction to Metal-Oxide-Semiconductor Field-Effect Transistors (MOSFETs), types (enhancement, depletion), and operation.',
    mainTitle: 'Fundamentals of MOSFETs',
    content: comingSoonContent,
  },
  {
    slug: 'mosfet-as-a-switch',
    title: '8. MOSFET as a Switch',
    description: 'Using MOSFETs as efficient electronic switches, including gate driving considerations.',
    mainTitle: 'Utilizing MOSFETs as Switches',
    content: comingSoonContent,
  },
  {
    slug: 'transistor-tutorial-summary',
    title: '9. Transistor Tutorial Summary',
    description: 'A recap of key concepts covered in the transistor tutorials.',
    mainTitle: 'Transistor Tutorials: Summary and Key Takeaways',
    content: comingSoonContent,
  },
  {
    slug: 'darlington-transistors',
    title: '10. Darlington Transistors',
    description: 'Understanding Darlington pairs, their high current gain, and applications.',
    mainTitle: 'Exploring Darlington Transistors',
    content: comingSoonContent,
  },
  {
    slug: 'fet-current-source',
    title: '11. FET Current Source',
    description: 'Designing and understanding constant current sources using FETs.',
    mainTitle: 'Field-Effect Transistors as Current Sources',
    content: comingSoonContent,
  },
  {
    slug: 'open-collector-outputs',
    title: '12. Open Collector Outputs',
    description: 'Understanding open collector (and open drain) transistor outputs and their uses, such as interfacing different logic levels.',
    mainTitle: 'Open Collector and Open Drain Outputs',
    content: comingSoonContent,
  },
];

export function getBJTLessonBySlug(slug: string): BJTLesson | undefined {
  return bjtTutorialLessons.find(lesson => lesson.slug === slug);
}
