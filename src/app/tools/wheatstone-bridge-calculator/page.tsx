
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Diamond, Zap } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type UnknownResistor = 'Rx' | 'R1' | 'R2' | 'R3'; // Assuming Rx is R4 conceptually

export default function WheatstoneBridgeCalculatorPage() {
  const { toast } = useToast();
  const [r1, setR1] = useState<string>('');
  const [r2, setR2] = useState<string>('');
  const [r3, setR3] = useState<string>('');
  const [rx, setRx] = useState<string>(''); // This is effectively R4
  const [calculateWhich, setCalculateWhich] = useState<UnknownResistor>('Rx');
  
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: UnknownResistor) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setter(value);
      setError(null);
      setResult(null);
      if (field !== calculateWhich) { // Clear the calculated field if other inputs change
        if (calculateWhich === 'R1') setR1('');
        if (calculateWhich === 'R2') setR2('');
        if (calculateWhich === 'R3') setR3('');
        if (calculateWhich === 'Rx') setRx('');
      }
    }
  };
  
  const handleSelectChange = (value: UnknownResistor) => {
    setCalculateWhich(value);
    setR1(''); setR2(''); setR3(''); setRx(''); // Clear all fields
    setError(null);
    setResult(null);
  };


  const calculateBridge = () => {
    setError(null);
    setResult(null);
    toast({ title: "Placeholder", description: "Wheatstone bridge calculation logic needs to be implemented." });
    // Logic to be added
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
            <Diamond className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Wheatstone Bridge Calculator</CardTitle>
          <CardDescription>
            Calculate the unknown resistance in a balanced Wheatstone bridge circuit.
            (Standard configuration: R1/R2 = R3/Rx or R1*Rx = R2*R3)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="r1_wheatstone">Resistor R1 (Ohms)</Label>
              <Input id="r1_wheatstone" type="text" placeholder="e.g., 100" value={r1} onChange={handleInputChange(setR1, 'R1')} className="h-10 text-base" inputMode="decimal" disabled={calculateWhich === 'R1'}/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r2_wheatstone">Resistor R2 (Ohms)</Label>
              <Input id="r2_wheatstone" type="text" placeholder="e.g., 200" value={r2} onChange={handleInputChange(setR2, 'R2')} className="h-10 text-base" inputMode="decimal" disabled={calculateWhich === 'R2'}/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r3_wheatstone">Resistor R3 (Ohms)</Label>
              <Input id="r3_wheatstone" type="text" placeholder="e.g., 300" value={r3} onChange={handleInputChange(setR3, 'R3')} className="h-10 text-base" inputMode="decimal" disabled={calculateWhich === 'R3'}/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rx_wheatstone">Resistor Rx (R4) (Ohms)</Label>
              <Input id="rx_wheatstone" type="text" placeholder={calculateWhich === 'Rx' ? "Calculated" : "e.g., 600"} value={rx} onChange={handleInputChange(setRx, 'Rx')} className={`h-10 text-base ${calculateWhich === 'Rx' ? 'bg-muted/50' : ''}`} inputMode="decimal" readOnly={calculateWhich === 'Rx'}/>
            </div>
          </div>
          
           <div className="space-y-2">
            <Label htmlFor="calculateWhichBridge">Calculate Which Resistor?</Label>
            <Select value={calculateWhich} onValueChange={(value) => handleSelectChange(value as UnknownResistor)}>
              <SelectTrigger className="h-11 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rx">Unknown Rx (R4)</SelectItem>
                <SelectItem value="R1">Resistor R1</SelectItem>
                <SelectItem value="R2">Resistor R2</SelectItem>
                <SelectItem value="R3">Resistor R3</SelectItem>
              </SelectContent>
            </Select>
          </div>


          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive">
              {error}
            </div>
          )}
          
          <Button onClick={calculateBridge} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Calculated Value:</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

