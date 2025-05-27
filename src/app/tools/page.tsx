
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Zap, Settings2, DraftingCompass, Sigma } from 'lucide-react'; // Added Sigma

const toolsData = [
  {
    title: "Ohm's Law Calculator",
    description: "Calculate Voltage (V), Current (I), Resistance (R), or Power (P) based on Ohm's Law.",
    href: "/tools/ohms-law-calculator",
    Icon: Calculator,
  },
  {
    title: "Resistor Color Code Calculator",
    description: "Determine the resistance value of a resistor based on its color bands.",
    href: "/tools/resistance-calculator",
    Icon: Zap, 
  },
  {
    title: "555 Timer Calculator",
    description: "Calculate frequencies and duty cycles for astable and monostable 555 timer circuits.",
    href: "/tools/555-timer-calculator",
    Icon: Settings2,
  },
  {
    title: "Capacitor Code Calculator",
    description: "Convert capacitor codes (e.g., 104) to capacitance values (pF, nF, µF).",
    href: "/tools/capacitor-code-calculator",
    Icon: DraftingCompass,
  },
  {
    title: "LED Resistor Calculator",
    description: "Calculate the required series resistor value and power rating for an LED.",
    href: "/tools/led-resistor-calculator",
    Icon: Sigma, // Using Sigma icon for this new tool
  }
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
          Electronics Tools
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          A collection of handy calculators and utilities for electronics enthusiasts and professionals.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {toolsData.map((tool) => (
          <Card key={tool.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow hover:bg-muted/30">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-3">
                 <tool.Icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">{tool.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <CardDescription>{tool.description}</CardDescription>
            </CardContent>
            <CardContent className="text-center">
              <Button asChild>
                <Link href={tool.href}>Use Tool</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
