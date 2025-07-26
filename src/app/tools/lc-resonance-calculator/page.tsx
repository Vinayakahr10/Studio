
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, RadioTower, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Helper to format frequency
const formatFrequency = (hertz: number): string => {
  if (isNaN(hertz) || !isFinite(hertz) || hertz === 0) return "0 Hz";
  if (hertz >= 1e9) return `${(hertz / 1e9).toPrecision(4)} GHz`;
  if (hertz >= 1e6) return `${(hertz / 1e6).toPrecision(4)} MHz`;
  if (hertz >= 1e3) return `${(hertz / 1e3).toPrecision(4)} kHz`;
  return `${hertz.toPrecision(4)} Hz`;
};

export default function LcResonanceCalculatorPage() {
  const { toast } = useToast();
  const [inductance, setInductance] = useState<string>('');
  const [inductanceUnit, setInductanceUnit] = useState<string>('mH'); // millihenries
  const [capacitance, setCapacitance] = useState<string>('');
  const [capacitanceUnit, setCapacitanceUnit] = useState<string>('uF'); // microfarads
  
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

  const calculateResonance = () => {
    setError(null);
    setResult(null);

    const L_val = parseFloat(inductance);
    const C_val = parseFloat(capacitance);

    if (isNaN(L_val) || isNaN(C_val)) {
      setError("Please enter valid numeric values for inductance and capacitance.");
      return;
    }
    if (L_val <= 0 || C_val <= 0) {
      setError("Inductance and Capacitance values must be positive and greater than zero.");
      return;
    }

    let L_henries: number;
    switch (inductanceUnit) {
      case 'uH': L_henries = L_val * 1e-6; break;
      case 'mH': L_henries = L_val * 1e-3; break;
      case 'H': L_henries = L_val; break;
      default: L_henries = L_val * 1e-3; // Default to mH
    }

    let C_farads: number;
    switch (capacitanceUnit) {
      case 'pF': C_farads = C_val * 1e-12; break;
      case 'nF': C_farads = C_val * 1e-9; break;
      case 'uF': C_farads = C_val * 1e-6; break;
      default: C_farads = C_val * 1e-6; // Default to uF
    }
    
    const frequency = 1 / (2 * Math.PI * Math.sqrt(L_henries * C_farads));

    if (isNaN(frequency) || !isFinite(frequency)) {
      setError("Calculation resulted in an invalid number. Please check input values.");
      return;
    }

    setResult(formatFrequency(frequency)); 
    toast({ title: "Calculation Complete", description: `Resonant Frequency: ${formatFrequency(frequency)}` });
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
            <RadioTower className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">LC Resonance Calculator</CardTitle>
          <CardDescription>
            Calculate the resonant frequency of an inductor-capacitor (LC) circuit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="inductance">Inductance (L)</Label>
              <Input id="inductance" type="text" placeholder="e.g., 10" value={inductance} onChange={handleInputChange(setInductance)} className="h-10 text-base" inputMode="decimal" />
            </div>
            <div className="space-y-1.5">
              <Select value={inductanceUnit} onValueChange={setInductanceUnit}>
                <SelectTrigger className="h-10 text-base">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="capacitance">Capacitance (C)</Label>
              <Input id="capacitance" type="text" placeholder="e.g., 100" value={capacitance} onChange={handleInputChange(setCapacitance)} className="h-10 text-base" inputMode="decimal" />
            </div>
             <div className="space-y-1.5">
              <Select value={capacitanceUnit} onValueChange={setCapacitanceUnit}>
                <SelectTrigger className="h-10 text-base">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pF">pF (picofarads)</SelectItem>
                  <SelectItem value="nF">nF (nanofarads)</SelectItem>
                  <SelectItem value="uF">µF (microfarads)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateResonance} size="lg" className={cn("w-full transition-transform hover:scale-105", "bg-red-600 hover:bg-red-700 text-white")}>
            <Zap className="mr-2 h-5 w-5"/> Calculate Frequency
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Resonant Frequency (f):</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    