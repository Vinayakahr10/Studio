
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, GitMerge, Zap, AlertTriangle, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function ParallelResistorCalculatorPage() {
  const { toast } = useToast();
  const [resistors, setResistors] = useState<string[]>(['', '']);
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

  const formatOhms = (ohms: number): string => {
      if (isNaN(ohms) || !isFinite(ohms)) return "--- Ω";
      if (ohms >= 1e9) return `${(ohms / 1e9).toPrecision(3)} GΩ`;
      if (ohms >= 1e6) return `${(ohms / 1e6).toPrecision(3)} MΩ`;
      if (ohms >= 1e3) return `${(ohms / 1e3).toPrecision(3)} kΩ`;
      return `${ohms.toPrecision(3)} Ω`;
  };

  const calculateParallelResistance = () => {
    setError(null);
    setResult(null);

    const numResistors = resistors.map(r => parseFloat(r)).filter(r => !isNaN(r));

    if (numResistors.length < 2) {
      setError("Please enter at least two valid resistor values.");
      return;
    }

    if (numResistors.some(r => r <= 0)) {
      setError("All resistor values must be positive and greater than zero.");
      return;
    }
    
    let sumOfReciprocals = 0;
    for (const r of numResistors) {
      sumOfReciprocals += (1 / r);
    }

    if (sumOfReciprocals === 0) {
        setError("Total resistance calculation resulted in division by zero. Check inputs.");
        return;
    }
    
    const totalResistance = 1 / sumOfReciprocals;

    if (isNaN(totalResistance) || !isFinite(totalResistance)) {
      setError("Calculation resulted in an invalid number. Please check input values.");
      return;
    }
    
    setResult(formatOhms(totalResistance));
    toast({
        title: "Calculation Complete",
        description: `Total Parallel Resistance (Rt): ${formatOhms(totalResistance)}`,
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
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="space-y-4">
            {resistors.map((resValue, index) => (
              <div key={index} className="flex items-center gap-2">
                 <div className="flex-grow space-y-1.5">
                  <Label htmlFor={`r${index + 1}_parallel`}>Resistor R{index + 1} (Ohms)</Label>
                  <Input 
                    id={`r${index + 1}_parallel`} 
                    type="text" 
                    placeholder="e.g., 1000" 
                    value={resValue} 
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
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateParallelResistance} size="lg" className={cn("w-full transition-transform hover:scale-105", "bg-red-600 hover:bg-red-700 text-white")}>
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

    