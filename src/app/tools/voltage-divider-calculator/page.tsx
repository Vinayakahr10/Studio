
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Network, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type CalculateOption = 'vout' | 'r1' | 'r2';

export default function VoltageDividerCalculatorPage() {
  const { toast } = useToast();
  const [vin, setVin] = useState<string>('');
  const [r1, setR1] = useState<string>('');
  const [r2, setR2] = useState<string>('');
  const [vout, setVout] = useState<string>(''); // Also used for input if calculating R1/R2
  
  const [calculateWhich, setCalculateWhich] = useState<CalculateOption>('vout');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') { // Allow numbers and one decimal
      setter(value);
      setError(null);
      setResult(null);
    }
  };

  const performCalculation = () => {
    setError(null);
    setResult(null);

    const numVin = parseFloat(vin);
    const numR1 = parseFloat(r1);
    const numR2 = parseFloat(r2);
    const numVoutTarget = parseFloat(vout); // Vout can be an input if we are calculating R1 or R2

    // Basic validation
    let knownValues = 0;
    if (!isNaN(numVin)) knownValues++;
    if (!isNaN(numR1)) knownValues++;
    if (!isNaN(numR2)) knownValues++;
    if (calculateWhich !== 'vout' && !isNaN(numVoutTarget)) knownValues++; // Vout is known when calculating R1/R2
    
    if (knownValues < (calculateWhich === 'vout' ? 3 : 3) ) { // Need Vin, R1, R2 for Vout; or Vin, Vout, one R for other R.
         setError("Please provide sufficient input values for the calculation.");
         return;
    }

    // Placeholder logic
    toast({
      title: "Calculation Placeholder",
      description: `Logic to calculate ${calculateWhich} needs to be implemented with values: Vin=${vin}, R1=${r1}, R2=${r2}, VoutTarget=${vout}.`,
    });
    // Example result:
    // setResult("Calculated Value: X (Placeholder)");
    
    // Actual calculation logic would go here
    // if (calculateWhich === 'vout') { Vout = Vin * (R2 / (R1 + R2)) }
    // if (calculateWhich === 'r1') { R1 = R2 * (Vin / Vout - 1) }
    // if (calculateWhich === 'r2') { R2 = R1 / (Vin / Vout - 1) }

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
          <CardTitle className="text-3xl">Voltage Divider Calculator</CardTitle>
          <CardDescription>
            Calculate output voltage (Vout) or resistor values (R1, R2) for a voltage divider circuit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vin">Input Voltage (Vin) - Volts</Label>
              <Input id="vin" type="text" placeholder="e.g., 5" value={vin} onChange={handleInputChange(setVin)} className="h-10 text-base" inputMode="decimal" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="r1">Resistor R1 - Ohms</Label>
              <Input id="r1" type="text" placeholder="e.g., 1000" value={r1} onChange={handleInputChange(setR1)} className="h-10 text-base" inputMode="decimal" disabled={calculateWhich === 'r1'}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="r2">Resistor R2 - Ohms</Label>
              <Input id="r2" type="text" placeholder="e.g., 1000" value={r2} onChange={handleInputChange(setR2)} className="h-10 text-base" inputMode="decimal" disabled={calculateWhich === 'r2'}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vout">Output Voltage (Vout) - Volts</Label>
              <Input id="vout" type="text" placeholder={calculateWhich === 'vout' ? "Calculated" : "e.g., 2.5"} value={vout} onChange={handleInputChange(setVout)} readOnly={calculateWhich === 'vout'} className="h-10 text-base" inputMode="decimal" disabled={calculateWhich === 'vout'}/>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="calculateWhich">Calculate Which Value?</Label>
            <Select value={calculateWhich} onValueChange={(value) => setCalculateWhich(value as CalculateOption)}>
              <SelectTrigger className="h-11 text-base">
                <SelectValue placeholder="Select value to calculate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vout">Output Voltage (Vout)</SelectItem>
                <SelectItem value="r1">Resistor R1</SelectItem>
                <SelectItem value="r2">Resistor R2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}

          <Button onClick={performCalculation} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5" /> Calculate
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Calculation Result:</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
