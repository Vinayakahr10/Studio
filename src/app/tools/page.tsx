
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator, Zap, Settings2, DraftingCompass, Sigma, Cpu, Network, RadioTower, Hourglass, Activity, 
  ArrowRight, Triangle as OpAmpIcon, ArrowRightLeft, Timer, Radio, GitMerge, Bolt, Layers, Diamond, PieChart, Signal
} from 'lucide-react';
import Image from 'next/image';

const toolsData = [
  {
    title: "Ohm's Law Calculator",
    description: "Calculate Voltage (V), Current (I), Resistance (R), or Power (P) based on Ohm's Law.",
    href: "/tools/ohms-law-calculator",
    Icon: Calculator,
    imageUrl: "https://lh3.googleusercontent.com/d/1NT09WAiCDsB-CuTaT5PozJ8sYxpfT9Iu",
    imageHint: "ohms law chart",
  },
  {
    title: "Resistor Color Code Calculator",
    description: "Determine the resistance value of a resistor based on its color bands (4, 5, or 6 bands).",
    href: "/tools/resistance-calculator",
    Icon: Zap,
    imageUrl: "https://lh3.googleusercontent.com/d/1XPtbyTKYjwFVIfy_tfccvLTdTfCsECzn",
    imageHint: "resistor color bands",
  },
  {
    title: "555 Timer Calculator",
    description: "Calculate frequencies and duty cycles for astable and monostable 555 timer circuits.",
    href: "/tools/555-timer-calculator",
    Icon: Settings2,
  },
  {
    title: "Capacitor Code Calculator",
    description: "Convert 3-digit EIA capacitor codes (e.g., 104) to capacitance values (pF, nF, µF).",
    href: "/tools/capacitor-code-calculator",
    Icon: DraftingCompass,
  },
  {
    title: "LED Resistor Calculator",
    description: "Calculate the required series resistor value and power rating for an LED.",
    href: "/tools/led-resistor-calculator",
    Icon: Sigma,
  },
  {
    title: "SMD Resistor Code Calculator",
    description: "Decode 3-digit, 4-digit, and EIA-96 SMD resistor codes to determine their resistance.",
    href: "/tools/smd-resistor-calculator",
    Icon: Cpu,
  },
  {
    title: "Voltage Divider Calculator",
    description: "Calculate output voltage or resistor values in a voltage divider circuit.",
    href: "/tools/voltage-divider-calculator",
    Icon: Network,
  },
  {
    title: "LC Resonance Calculator",
    description: "Calculate the resonant frequency of an inductor-capacitor (LC) circuit.",
    href: "/tools/lc-resonance-calculator",
    Icon: RadioTower,
  },
  {
    title: "Battery Life Calculator",
    description: "Estimate battery life based on capacity and average current consumption.",
    href: "/tools/battery-life-calculator",
    Icon: Hourglass,
  },
  {
    title: "RC Circuit Phase Shift Visualizer",
    description: "Visualize phase shift and cutoff frequency in an RC circuit with dynamic graphs.",
    href: "/tools/rc-phase-shift-visualizer",
    Icon: Activity,
  },
  {
    title: "Op-Amp Gain Calculator",
    description: "Calculate gain for common op-amp configurations like inverting and non-inverting amplifiers.",
    href: "/tools/op-amp-calculator",
    Icon: OpAmpIcon,
  },
  {
    title: "Ideal Diode Calculator",
    description: "Calculate current and voltage in a simple ideal diode circuit with a resistor.",
    href: "/tools/ideal-diode-calculator",
    Icon: ArrowRightLeft,
  },
  {
    title: "RC Time Constant Calculator",
    description: "Calculate the time constant (τ) of a resistor-capacitor (RC) circuit.",
    href: "/tools/rc-time-constant-calculator",
    Icon: Timer,
  },
  {
    title: "Reactance Calculator",
    description: "Calculate capacitive (Xc) or inductive (Xl) reactance based on frequency and component value.",
    href: "/tools/reactance-calculator",
    Icon: Radio,
  },
  {
    title: "Parallel Resistor Calculator",
    description: "Calculate the total resistance of resistors connected in parallel.",
    href: "/tools/parallel-resistor-calculator",
    Icon: GitMerge,
  },
  {
    title: "Capacitor Charge & Energy Calculator",
    description: "Calculate charge stored and energy stored in a capacitor.",
    href: "/tools/capacitor-charge-energy-calculator",
    Icon: Bolt,
  },
  {
    title: "Series Resistor Calculator",
    description: "Calculate the total resistance of resistors connected in series.",
    href: "/tools/series-resistor-calculator",
    Icon: Network, 
  },
  {
    title: "Capacitors in Series/Parallel",
    description: "Calculate total capacitance for capacitors in series or parallel.",
    href: "/tools/capacitors-series-parallel-calculator",
    Icon: Layers,
  },
  {
    title: "Decibel (dB) Calculator",
    description: "Convert between power/voltage ratios and decibels.",
    href: "/tools/decibel-calculator",
    Icon: Signal,
  },
  {
    title: "Wheatstone Bridge Calculator",
    description: "Calculate unknown resistance in a balanced Wheatstone bridge.",
    href: "/tools/wheatstone-bridge-calculator",
    Icon: Diamond, 
  },
  {
    title: "Power Factor Calculator",
    description: "Calculate power factor from real and apparent power.",
    href: "/tools/power-factor-calculator",
    Icon: PieChart,
  }
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
          Electronics Tools
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          A collection of handy calculators and utilities for electronics enthusiasts and professionals.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {toolsData.map((tool) => {
           const ToolIcon = tool.Icon;
           return (
            <Card key={tool.title} className="flex flex-col overflow-hidden shadow-lg transition-all">
              <CardHeader className="p-0">
                <Link href={tool.href} className="block" aria-label={`Use tool: ${tool.title}`}>
                  <div className="relative aspect-[4/3] w-full bg-primary/5 flex items-center justify-center">
                    {tool.imageUrl ? (
                      <Image 
                        src={tool.imageUrl} 
                        alt={tool.title} 
                        data-ai-hint={tool.imageHint || tool.title.toLowerCase()}
                        layout="fill"
                        className="object-contain" 
                      />
                    ) : (
                      <ToolIcon className="h-16 w-16 text-primary/80" />
                    )}
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="flex-grow p-6 space-y-2">
                <CardTitle className="text-xl font-semibold">
                  <Link href={tool.href} className="hover:text-primary transition-colors">
                    {tool.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                  {tool.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full transition-colors group hover:bg-black hover:text-white">
                  <Link href={tool.href}>
                    Use Tool <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
        )})}
      </section>
    </div>
  );
}
