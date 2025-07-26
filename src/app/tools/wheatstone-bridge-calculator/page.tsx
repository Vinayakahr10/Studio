
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Diamond, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type UnknownResistor = 'Rx' | 'R1' | 'R2' | 'R3';

export default function WheatstoneBridgeCalculatorPage() {
  const { toast } = useToast();
  const [r1, setR1] = useState<string>('');
  const [r2, setR2] = useState<string>('');
  const [r3, setR3] = useState<string>('');
  const [rx, setRx] = useState<string>(''); // This is R4
  const [calculateWhich, setCalculateWhich] = useState<UnknownResistor>('Rx');
  
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
  
  const handleSelectChange = (value: UnknownResistor) => {
    setCalculateWhich(value);
    // Optionally clear all fields when changing calculation target
    // setR1(''); setR2(''); setR3(''); setRx(''); 
    setError(null);
    setResult(null);
  };
  
  const formatOhms = (ohms: number | null): string => {
      if (ohms === null || isNaN(ohms) || !isFinite(ohms)) return "--- Ω";
      if (ohms >= 1e9) return `${(ohms / 1e9).toPrecision(3)} GΩ`;
      if (ohms >= 1e6) return `${(ohms / 1e6).toPrecision(3)} MΩ`;
      if (ohms >= 1e3) return `${(ohms / 1e3).toPrecision(3)} kΩ`;
      return `${ohms.toPrecision(3)} Ω`;
  };

  const calculateBridge = () => {
    setError(null);
    setResult(null);

    const numR1 = parseFloat(r1);
    const numR2 = parseFloat(r2);
    const numR3 = parseFloat(r3);
    const numRx = parseFloat(rx); // R4

    let calculatedValue: number | null = null;
    let resultString = "";

    try {
      const inputs = { R1: numR1, R2: numR2, R3: numR3, Rx: numRx };
      const knownResistors = (Object.keys(inputs) as UnknownResistor[])
        .filter(key => key !== calculateWhich && !isNaN(inputs[key]) && inputs[key] > 0);
      
      if (knownResistors.length < 3) {
        throw new Error("Please provide three known positive resistor values.");
      }

      const r1Val = calculateWhich === 'R1' ? NaN : numR1;
      const r2Val = calculateWhich === 'R2' ? NaN : numR2;
      const r3Val = calculateWhich === 'R3' ? NaN : numR3;
      const rxVal = calculateWhich === 'Rx' ? NaN : numRx;


      if (calculateWhich === 'Rx') {
        if (isNaN(r1Val) || isNaN(r2Val) || isNaN(r3Val)) throw new Error("R1, R2, and R3 are required to calculate Rx.");
        if (r2Val === 0) throw new Error("R2 cannot be zero when calculating Rx.");
        calculatedValue = (r1Val * r3Val) / r2Val; // Rx = (R1 * R3) / R2, standard form R1/R2 = R3/Rx -> R1*Rx = R2*R3
        setRx(calculatedValue.toPrecision(4));
      } else if (calculateWhich === 'R1') {
        if (isNaN(r2Val) || isNaN(r3Val) || isNaN(rxVal)) throw new Error("R2, R3, and Rx are required to calculate R1.");
        if (rxVal === 0) throw new Error("Rx cannot be zero when calculating R1.");
        calculatedValue = (r2Val * r3Val) / rxVal; // R1 = (R2 * R3) / Rx
        setR1(calculatedValue.toPrecision(4));
      } else if (calculateWhich === 'R2') {
        if (isNaN(r1Val) || isNaN(r3Val) || isNaN(rxVal)) throw new Error("R1, R3, and Rx are required to calculate R2.");
        if (r3Val === 0) throw new Error("R3 cannot be zero when calculating R2 (if R1*Rx/R3).");
        calculatedValue = (r1Val * rxVal) / r3Val; // R2 = (R1 * Rx) / R3
        setR2(calculatedValue.toPrecision(4));
      } else if (calculateWhich === 'R3') {
        if (isNaN(r1Val) || isNaN(r2Val) || isNaN(rxVal)) throw new Error("R1, R2, and Rx are required to calculate R3.");
        if (r1Val === 0) throw new Error("R1 cannot be zero when calculating R3 (if R2*Rx/R1).");
        calculatedValue = (r2Val * rxVal) / r1Val; // R3 = (R2 * Rx) / R1
        setR3(calculatedValue.toPrecision(4));
      }

      if (calculatedValue === null || isNaN(calculatedValue) || !isFinite(calculatedValue) || calculatedValue <= 0) {
        throw new Error("Calculation resulted in an invalid or non-positive resistance value. Check inputs.");
      }
      
      resultString = `${calculateWhich}: ${formatOhms(calculatedValue)}`;
      setResult(resultString);
      toast({ title: "Calculation Complete", description: resultString });

    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
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
            Calculate the unknown resistance in a balanced Wheatstone bridge.
            The bridge is balanced when R1/R2 = R3/Rx (or R1*Rx = R2*R3).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="r1_wheatstone">Resistor R1 (Ohms)</Label>
              <Input id="r1_wheatstone" type="text" placeholder={calculateWhich === 'R1' ? "Calculated" : "e.g., 100"} value={r1} onChange={handleInputChange(setR1)} className={`h-10 text-base ${calculateWhich === 'R1' ? 'bg-muted/50' : ''}`} inputMode="decimal" readOnly={calculateWhich === 'R1'}/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r2_wheatstone">Resistor R2 (Ohms)</Label>
              <Input id="r2_wheatstone" type="text" placeholder={calculateWhich === 'R2' ? "Calculated" : "e.g., 200"} value={r2} onChange={handleInputChange(setR2)} className={`h-10 text-base ${calculateWhich === 'R2' ? 'bg-muted/50' : ''}`} inputMode="decimal" readOnly={calculateWhich === 'R2'}/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r3_wheatstone">Resistor R3 (Ohms)</Label>
              <Input id="r3_wheatstone" type="text" placeholder={calculateWhich === 'R3' ? "Calculated" : "e.g., 300"} value={r3} onChange={handleInputChange(setR3)} className={`h-10 text-base ${calculateWhich === 'R3' ? 'bg-muted/50' : ''}`} inputMode="decimal" readOnly={calculateWhich === 'R3'}/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rx_wheatstone">Resistor Rx (R4) (Ohms)</Label>
              <Input id="rx_wheatstone" type="text" placeholder={calculateWhich === 'Rx' ? "Calculated" : "e.g., 600"} value={rx} onChange={handleInputChange(setRx)} className={`h-10 text-base ${calculateWhich === 'Rx' ? 'bg-muted/50' : ''}`} inputMode="decimal" readOnly={calculateWhich === 'Rx'}/>
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
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4" /> {error}
            </div>
          )}
          
          <Button onClick={calculateBridge} size="lg" className={cn("w-full transition-transform hover:scale-105", "bg-red-600 hover:bg-red-700 text-white")}>
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

    