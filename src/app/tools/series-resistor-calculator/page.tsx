
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Network, Zap, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function SeriesResistorCalculatorPage() {
  const { toast } = useToast();
  const [resistors, setResistors] = useState<string[]>(['', '']); // Start with two resistor inputs
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (index: number, value: string) => {
    const newResistors = [...resistors];
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      newResistors[index] = value;
      setResistors(newResistors);
      setError(null);
      setResult(null);
    }
  };

  const addResistorInput = () => {
    setResistors([...resistors, '']);
  };

  const removeResistorInput = (index: number) => {
    if (resistors.length > 2) { // Keep at least two inputs
      const newResistors = resistors.filter((_, i) => i !== index);
      setResistors(newResistors);
    }
  };

  const calculateSeriesResistance = () => {
    setError(null);
    setResult(null);
    toast({ title: "Placeholder", description: "Calculation logic for series resistors needs to be implemented." });
    // Actual logic to be added later
    // Example:
    // let totalResistance = 0;
    // for (const rStr of resistors) {
    //   const rVal = parseFloat(rStr);
    //   if (isNaN(rVal) || rVal <= 0) {
    //     setError("All resistor values must be positive numbers.");
    //     return;
    //   }
    //   totalResistance += rVal;
    // }
    // setResult(`${totalResistance.toFixed(2)} Ω`);
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
            <Network className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Series Resistor Calculator</CardTitle>
          <CardDescription>
            Calculate the total equivalent resistance of resistors connected in series.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {resistors.map((resistorValue, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-grow space-y-1.5">
                  <Label htmlFor={`r${index + 1}_series`}>Resistor R{index + 1} (Ohms)</Label>
                  <Input 
                    id={`r${index + 1}_series`} 
                    type="text" 
                    placeholder="e.g., 100" 
                    value={resistorValue} 
                    onChange={(e) => handleInputChange(index, e.target.value)} 
                    className="h-10 text-base" 
                    inputMode="decimal" 
                  />
                </div>
                {resistors.length > 2 && (
                  <Button variant="ghost" size="icon" onClick={() => removeResistorInput(index)} className="mt-auto text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Remove resistor</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <Button variant="outline" onClick={addResistorInput} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Another Resistor
          </Button>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive">
              {error}
            </div>
          )}
          
          <Button onClick={calculateSeriesResistance} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate Total Resistance
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Total Series Resistance (Rt):</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
