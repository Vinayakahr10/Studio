
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, GitMerge, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ParallelResistorCalculatorPage() {
  const { toast } = useToast();
  const [r1, setR1] = useState<string>('');
  const [r2, setR2] = useState<string>('');
  // Add more states if supporting more than 2 resistors, e.g., an array of resistor values
  
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     if (/^\d*\.?\d*$/.test(value) || value === '') {
      setter(value);
      setError(null); 
      setResult(null);
    }
  };

  const calculateParallelResistance = () => {
    setError(null);
    setResult(null);

    const numR1 = parseFloat(r1);
    const numR2 = parseFloat(r2);

    if (isNaN(numR1) || isNaN(numR2)) {
      setError("Please enter valid numeric values for all resistor fields.");
      return;
    }

    if (numR1 <= 0 || numR2 <= 0) {
      setError("Resistor values must be positive and greater than zero.");
      return;
    }
    
    // For two resistors: R_total = (R1 * R2) / (R1 + R2)
    // For more: 1/R_total = 1/R1 + 1/R2 + 1/R3 + ...
    const totalResistance = (numR1 * numR2) / (numR1 + numR2);

    if (isNaN(totalResistance) || !isFinite(totalResistance)) {
      setError("Calculation resulted in an invalid number. Please check input values.");
      return;
    }
    
    const formatOhms = (ohms: number): string => {
        if (ohms >= 1e9) return `${(ohms / 1e9).toPrecision(3)} GΩ`;
        if (ohms >= 1e6) return `${(ohms / 1e6).toPrecision(3)} MΩ`;
        if (ohms >= 1e3) return `${(ohms / 1e3).toPrecision(3)} kΩ`;
        return `${ohms.toPrecision(3)} Ω`;
    };
    
    setResult(formatOhms(totalResistance));
    toast({
        title: "Calculation Complete (Placeholder Logic)",
        description: `Total Resistance: ${formatOhms(totalResistance)} (Logic needs to be fully implemented if more than 2 resistors needed)`,
    });
  };

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
            <GitMerge className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Parallel Resistor Calculator</CardTitle>
          <CardDescription>
            Calculate the total equivalent resistance of resistors connected in parallel.
            (Currently supports 2 resistors. For more, manually use 1/Rt = 1/R1 + 1/R2 + ...)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="r1_parallel">Resistor R1 (Ohms)</Label>
              <Input id="r1_parallel" type="text" placeholder="e.g., 1000" value={r1} onChange={handleInputChange(setR1)} className="h-10 text-base" inputMode="decimal" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r2_parallel">Resistor R2 (Ohms)</Label>
              <Input id="r2_parallel" type="text" placeholder="e.g., 2200" value={r2} onChange={handleInputChange(setR2)} className="h-10 text-base" inputMode="decimal" />
            </div>
          </div>
          {/* Placeholder for adding more resistor inputs dynamically if needed in future */}
          {/* <Button variant="outline" size="sm" disabled>+ Add Resistor (Future)</Button> */}


          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateParallelResistance} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate Total Resistance
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Total Parallel Resistance (Rt):</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
