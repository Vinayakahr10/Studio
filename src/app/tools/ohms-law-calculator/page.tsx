
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function OhmsLawCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/tools">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Tools
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="inline-block bg-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
            <Calculator className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Ohm's Law Calculator</CardTitle>
          <CardDescription>
            Calculate Voltage (V), Current (I), Resistance (R), or Power (P).
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground mb-4">
            The Ohm's Law Calculator functionality will be implemented here.
          </p>
          <p className="text-sm text-muted-foreground">
            You'll be able to input any two known values (e.g., Voltage and Current)
            and the calculator will determine the other two values according to Ohm's Law (V=IR) and the power formula (P=VI).
          </p>
          {/* Placeholder for form inputs and results */}
        </CardContent>
      </Card>
    </div>
  );
}
