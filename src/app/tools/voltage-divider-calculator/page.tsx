
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
import { cn } from '@/lib/utils';

type CalculateOption = 'vout' | 'r1' | 'r2';

export default function VoltageDividerCalculatorPage() {
  const { toast } = useToast();
  const [vin, setVin] = useState<string>('');
  const [r1, setR1] = useState<string>('');
  const [r2, setR2] = useState<string>('');
  const [vout, setVout] = useState<string>('');
  
  const [calculateWhich, setCalculateWhich] = useState<CalculateOption>('vout');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setter(value);
      setError(null);
      setResult(null);
      // Clear the field that will be calculated if user is editing other inputs
      if (calculateWhich === 'vout' && (fieldName === 'vin' || fieldName === 'r1' || fieldName === 'r2')) setVout('');
      if (calculateWhich === 'r1' && (fieldName === 'vin' || fieldName === 'r2' || fieldName === 'vout')) setR1('');
      if (calculateWhich === 'r2' && (fieldName === 'vin' || fieldName === 'r1' || fieldName === 'vout')) setR2('');
    }
  };
  
  const handleSelectChange = (value: CalculateOption) => {
    setCalculateWhich(value);
    setVin(''); setR1(''); setR2(''); setVout(''); // Clear all fields on mode change
    setError(null);
    setResult(null);
  };

  const formatValue = (val: number | null | undefined, unit: string): string => {
    if (val === null || val === undefined || isNaN(val) || !isFinite(val)) return "---";
    // Basic formatting, can be expanded for k, M, etc.
    return `${val.toPrecision(4)} ${unit}`;
  };


  const performCalculation = () => {
    setError(null);
    setResult(null);

    const numVin = parseFloat(vin);
    const numR1 = parseFloat(r1);
    const numR2 = parseFloat(r2);
    const numVoutInput = parseFloat(vout); // Vout is an input when calculating R1/R2

    let calculatedValue: number | null = null;
    let resultString: string | null = null;

    try {
      if (calculateWhich === 'vout') {
        if (isNaN(numVin) || isNaN(numR1) || isNaN(numR2)) {
          throw new Error("Vin, R1, and R2 are required to calculate Vout.");
        }
        if (numR1 < 0 || numR2 < 0) throw new Error("Resistor values cannot be negative.");
        if (numR1 + numR2 === 0) throw new Error("Total resistance (R1+R2) cannot be zero.");
        calculatedValue = numVin * (numR2 / (numR1 + numR2));
        setVout(calculatedValue.toPrecision(4)); // Update the Vout display field
        resultString = `Vout: ${formatValue(calculatedValue, "V")}`;
      } else if (calculateWhich === 'r1') {
        if (isNaN(numVin) || isNaN(numR2) || isNaN(numVoutInput)) {
          throw new Error("Vin, R2, and Vout are required to calculate R1.");
        }
        if (numR2 < 0) throw new Error("R2 cannot be negative.");
        if (numVoutInput === 0) throw new Error("Vout cannot be zero when calculating R1 (division by zero).");
        if (numVin <= numVoutInput && numVoutInput !== 0) throw new Error("Vin must be greater than Vout to calculate R1.");
        calculatedValue = numR2 * (numVin / numVoutInput - 1);
        if (calculatedValue < 0) throw new Error("Calculated R1 is negative, check inputs (Vin > Vout required).");
        setR1(calculatedValue.toPrecision(4));
        resultString = `R1: ${formatValue(calculatedValue, "Ω")}`;
      } else if (calculateWhich === 'r2') {
        if (isNaN(numVin) || isNaN(numR1) || isNaN(numVoutInput)) {
          throw new Error("Vin, R1, and Vout are required to calculate R2.");
        }
        if (numR1 < 0) throw new Error("R1 cannot be negative.");
        if (numVin - numVoutInput === 0) throw new Error("Vin cannot be equal to Vout (division by zero) when calculating R2.");
        if (numVin <= numVoutInput && numVoutInput !== 0) throw new Error("Vin must be greater than Vout to calculate R2.");
        calculatedValue = (numVoutInput * numR1) / (numVin - numVoutInput);
        if (calculatedValue < 0) throw new Error("Calculated R2 is negative, check inputs (Vin > Vout required).");
        setR2(calculatedValue.toPrecision(4));
        resultString = `R2: ${formatValue(calculatedValue, "Ω")}`;
      }
      
      if (resultString) {
        setResult(resultString);
        toast({ title: "Calculation Complete", description: resultString });
      }

    } catch (e: any) {
      setError(e.message || "Calculation error.");
      setResult(null); // Clear result on error
      // Also clear the field that was supposed to be calculated
      if (calculateWhich === 'vout') setVout('');
      if (calculateWhich === 'r1') setR1('');
      if (calculateWhich === 'r2') setR2('');
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
              <Input id="vin" type="text" placeholder="e.g., 5" value={vin} onChange={handleInputChange(setVin, 'vin')} className="h-10 text-base" inputMode="decimal" disabled={calculateWhich === 'vout' && false} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="r1">Resistor R1 - Ohms</Label>
              <Input id="r1" type="text" placeholder="e.g., 1000" value={r1} onChange={handleInputChange(setR1, 'r1')} className="h-10 text-base" inputMode="decimal" disabled={calculateWhich === 'r1'}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="r2">Resistor R2 - Ohms</Label>
              <Input id="r2" type="text" placeholder="e.g., 1000" value={r2} onChange={handleInputChange(setR2, 'r2')} className="h-10 text-base" inputMode="decimal" disabled={calculateWhich === 'r2'}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vout">Output Voltage (Vout) - Volts</Label>
              <Input id="vout" type="text" placeholder={calculateWhich === 'vout' ? "Calculated" : "e.g., 2.5"} value={vout} onChange={handleInputChange(setVout, 'vout')} className={`h-10 text-base ${calculateWhich === 'vout' ? 'bg-muted/50' : ''}`} inputMode="decimal" readOnly={calculateWhich === 'vout'}/>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="calculateWhich">Calculate Which Value?</Label>
            <Select value={calculateWhich} onValueChange={(value) => handleSelectChange(value as CalculateOption)}>
              <SelectTrigger className="h-11 text-base">
                <SelectValue placeholder="Select value to calculate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vout">Output Voltage (Vout)</SelectItem>
                <SelectItem value="r1">Resistor R1 (Ω)</SelectItem>
                <SelectItem value="r2">Resistor R2 (Ω)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}

          <Button onClick={performCalculation} size="lg" className={cn("w-full transition-transform hover:scale-105", "bg-red-600 hover:bg-red-700 text-white")}>
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

    