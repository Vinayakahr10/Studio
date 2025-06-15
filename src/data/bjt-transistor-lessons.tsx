
import type { ReactNode } from 'react';
import type { ArduinoLesson as BJTLesson } from '@/types'; // Reusing ArduinoLesson type structure for simplicity
import { CodeBlock } from '@/components/content/CodeBlock';
import Image from 'next/image';

const comingSoonContent = <p>Content for this lesson is coming soon. Check back later!</p>;

export const bjtTutorialLessons: BJTLesson[] = [
  {
    slug: 'introduction-to-bjt',
    title: '1. Introduction to BJT Transistors',
    description: 'Understanding Bipolar Junction Transistors, their types, and basic operation.',
    mainTitle: 'BJT: An Introduction to Bipolar Junction Transistors',
    content: (
      <>
        <p className="mb-4 text-lg">
          Bipolar Junction Transistors (BJTs) are three-terminal semiconductor devices that can be used for amplification or switching applications. They are fundamental components in many electronic circuits.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">What is a BJT?</h3>
        <p className="mb-4">
          A BJT consists of three doped semiconductor regions: the Emitter, the Base, and the Collector. The term "bipolar" refers to the fact that both electrons and holes are involved in the current conduction process.
        </p>
        
        <h3 className="text-2xl font-semibold mt-6 mb-3">Types of BJTs</h3>
        <p className="mb-2">There are two main types of BJTs:</p>
        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
          <li><strong>NPN Transistor:</strong> Consists of a P-type semiconductor layer (the base) sandwiched between two N-type layers (the emitter and collector). Current flows from collector to emitter when a small current flows into the base.</li>
          <li><strong>PNP Transistor:</strong> Consists of an N-type semiconductor layer (the base) sandwiched between two P-type layers (the emitter and collector). Current flows from emitter to collector when a small current flows out of the base.</li>
        </ul>
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col items-center">
                 <Image
                    src="https://placehold.co/300x250.png"
                    alt="NPN Transistor Symbol and Structure"
                    data-ai-hint="npn transistor symbol structure"
                    width={300}
                    height={250}
                    className="rounded-lg border shadow-md object-contain bg-white p-2"
                />
                <p className="text-sm text-muted-foreground italic mt-2">NPN Transistor Symbol & Structure</p>
            </div>
            <div className="flex flex-col items-center">
                <Image
                    src="https://placehold.co/300x250.png"
                    alt="PNP Transistor Symbol and Structure"
                    data-ai-hint="pnp transistor symbol structure"
                    width={300}
                    height={250}
                    className="rounded-lg border shadow-md object-contain bg-white p-2"
                />
                <p className="text-sm text-muted-foreground italic mt-2">PNP Transistor Symbol & Structure</p>
            </div>
        </div>
        <p className="mb-4">The arrow on the emitter symbol indicates the direction of conventional current flow.</p>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Basic Operation</h3>
        <p className="mb-4">
          The key idea behind a BJT is that a small current at the base terminal can control a much larger current between the collector and emitter terminals. This property allows BJTs to be used as amplifiers or switches.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
          <li><strong>Emitter (E):</strong> Emits charge carriers (electrons or holes) into the base. It is heavily doped.</li>
          <li><strong>Base (B):</strong> A very thin, lightly doped region that controls the flow of charge carriers from emitter to collector.</li>
          <li><strong>Collector (C):</strong> Collects the charge carriers that pass through the base. It is moderately doped and is the largest region physically.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Operating Regions</h3>
        <p className="mb-2">A BJT can operate in three main regions:</p>
        <ol className="list-decimal list-inside space-y-2 mb-4 pl-4">
          <li><strong>Cutoff Region:</strong> The transistor is "OFF". Ideally, no current flows from collector to emitter (I<sub>C</sub> ≈ 0). This occurs when the base-emitter junction is not forward-biased enough.</li>
          <li><strong>Active Region:</strong> The transistor acts as an amplifier. The collector current (I<sub>C</sub>) is proportional to the base current (I<sub>B</sub>), related by the current gain (β or h<sub>FE</sub>): I<sub>C</sub> = β * I<sub>B</sub>. The base-emitter junction is forward-biased, and the base-collector junction is reverse-biased.</li>
          <li><strong>Saturation Region:</strong> The transistor is fully "ON" and acts like a closed switch. Collector current is at its maximum, limited primarily by the external circuit. Both base-emitter and base-collector junctions are forward-biased.</li>
        </ol>
        <div className="my-6 flex flex-col items-center gap-2">
          <Image
            src="https://placehold.co/600x400.png"
            alt="BJT Operating Regions Characteristic Curve"
            data-ai-hint="bjt characteristic curve regions"
            width={600}
            height={400}
            className="rounded-lg border shadow-md object-contain bg-white p-2"
          />
           <p className="text-sm text-muted-foreground italic mt-1 text-center">Conceptual BJT Output Characteristic Curves showing operating regions.</p>
        </div>

        <p className="mt-4">
          Understanding these basic concepts is crucial before diving into specific applications like using BJTs as switches or amplifiers, which will be covered in subsequent lessons.
        </p>
      </>
    ),
  },
  {
    slug: 'bjt-as-a-switch',
    title: '2. BJT as a Switch',
    description: 'Using NPN and PNP transistors as electronic switches.',
    mainTitle: 'Using BJT Transistors as Electronic Switches',
    content: comingSoonContent,
  },
];

export function getBJTLessonBySlug(slug: string): BJTLesson | undefined {
  return bjtTutorialLessons.find(lesson => lesson.slug === slug);
}
