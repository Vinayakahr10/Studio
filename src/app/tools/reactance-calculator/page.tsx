
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Radio as RadioIcon, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type ReactanceType = 'capacitive' | 'inductive';

// Helper to format resistance/reactance
const formatOhms = (ohms: number): string => {
  if (isNaN(ohms) || !isFinite(ohms)) return "--- Ω";
  if (ohms >= 1e9) return `${(ohms / 1e9).toPrecision(3)} GΩ`;
  if (ohms >= 1e6) return `${(ohms / 1e6).toPrecision(3)} MΩ`;
  if (ohms >= 1e3) return `${(ohms / 1e3).toPrecision(3)} kΩ`;
  return `${ohms.toPrecision(3)} Ω`;
};

export default function ReactanceCalculatorPage() {
  const { toast } = useToast();
  const [reactanceType, setReactanceType] = useState<ReactanceType>('capacitive');
  const [frequency, setFrequency] = useState<string>(''); // Hz
  const [componentValue, setComponentValue] = useState<string>(''); // C or L
  const [capacitanceUnit, setCapacitanceUnit] = useState<string>('uF'); // microfarads
  const [inductanceUnit, setInductanceUnit] = useState<string>('mH'); // millihenries
  
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

  const handleTypeChange = (value: ReactanceType) => {
    setReactanceType(value);
    setComponentValue(''); // Reset component value when type changes
    setError(null);
    setResult(null);
  };

  const calculateReactance = () => {
    setError(null);
    setResult(null);

    const f_val = parseFloat(frequency);
    const val_input = parseFloat(componentValue);

    if (isNaN(f_val) || isNaN(val_input)) {
      setError("Please enter valid numeric values for frequency and component value.");
      return;
    }
    if (f_val <= 0 || val_input <= 0) {
      setError("Frequency and component value must be positive and greater than zero.");
      return;
    }

    let calculatedReactance: number | null = null;
    const twoPiF = 2 * Math.PI * f_val;

    if (reactanceType === 'capacitive') {
      let C_farads: number;
      switch (capacitanceUnit) {
        case 'pF': C_farads = val_input * 1e-12; break;
        case 'nF': C_farads = val_input * 1e-9; break;
        case 'uF': C_farads = val_input * 1e-6; break;
        case 'mF': C_farads = val_input * 1e-3; break;
        case 'F': C_farads = val_input; break;
        default: C_farads = val_input * 1e-6;
      }
      if (twoPiF * C_farads === 0) {
        setError("Cannot calculate capacitive reactance: 2πfC is zero (division by zero)."); return;
      }
      calculatedReactance = 1 / (twoPiF * C_farads);
    } else { // Inductive
      let L_henries: number;
      switch (inductanceUnit) {
        case 'uH': L_henries = val_input * 1e-6; break;
        case 'mH': L_henries = val_input * 1e-3; break;
        case 'H': L_henries = val_input; break;
        default: L_henries = val_input * 1e-3;
      }
      calculatedReactance = twoPiF * L_henries;
    }

    if (calculatedReactance === null || isNaN(calculatedReactance) || !isFinite(calculatedReactance)) {
      setError("Calculation resulted in an invalid number. Please check input values.");
      return;
    }
    
    const formattedResult = formatOhms(calculatedReactance);
    setResult(formattedResult);
    toast({ title: "Calculation Complete", description: `Reactance (${reactanceType === 'capacitive' ? 'Xc' : 'Xl'}): ${formattedResult}` });
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
            <RadioIcon className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Reactance Calculator</CardTitle>
          <CardDescription>
            Calculate capacitive reactance (Xc) or inductive reactance (Xl).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reactanceType">Type of Reactance</Label>
            <Select value={reactanceType} onValueChange={(value) => handleTypeChange(value as ReactanceType)}>
              <SelectTrigger id="reactanceType" className="h-11 text-base">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="capacitive">Capacitive Reactance (Xc)</SelectItem>
                <SelectItem value="inductive">Inductive Reactance (Xl)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="frequency">Frequency (f) - Hertz (Hz)</Label>
            <Input id="frequency" type="text" placeholder="e.g., 1000" value={frequency} onChange={handleInputChange(setFrequency)} className="h-10 text-base" inputMode="decimal" />
          </div>

          {reactanceType === 'capacitive' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div className="space-y-1.5">
                <Label htmlFor="capacitance">Capacitance (C)</Label>
                <Input id="capacitance" type="text" placeholder="e.g., 10" value={componentValue} onChange={handleInputChange(setComponentValue)} className="h-10 text-base" inputMode="decimal" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="capacitanceUnit" className="sr-only">Capacitance Unit</Label>
                <Select value={capacitanceUnit} onValueChange={setCapacitanceUnit}>
                  <SelectTrigger id="capacitanceUnit" className="h-10 text-base">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pF">pF (picofarads)</SelectItem>
                    <SelectItem value="nF">nF (nanofarads)</SelectItem>
                    <SelectItem value="uF">µF (microfarads)</SelectItem>
                    <SelectItem value="mF">mF (millifarads)</SelectItem>
                    <SelectItem value="F">F (farads)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {reactanceType === 'inductive' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div className="space-y-1.5">
                <Label htmlFor="inductance">Inductance (L)</Label>
                <Input id="inductance" type="text" placeholder="e.g., 100" value={componentValue} onChange={handleInputChange(setComponentValue)} className="h-10 text-base" inputMode="decimal" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="inductanceUnit" className="sr-only">Inductance Unit</Label>
                <Select value={inductanceUnit} onValueChange={setInductanceUnit}>
                  <SelectTrigger id="inductanceUnit" className="h-10 text-base">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uH">µH (microhenries)</SelectItem>
                    <SelectItem value="mH">mH (millihenries)</SelectItem>
                    <SelectItem value="H">H (henries)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateReactance} size="lg" className={cn("w-full transition-transform hover:scale-105", "bg-red-600 hover:bg-red-700 text-white")}>
            <Zap className="mr-2 h-5 w-5"/> Calculate Reactance
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Calculated Reactance ({reactanceType === 'capacitive' ? 'Xc' : 'Xl'}):</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    