
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Timer as TimerIcon, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Helper to format time
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds) || seconds === 0) return "0 s";
  if (Math.abs(seconds) < 1e-6) return `${(seconds * 1e9).toPrecision(3)} ns`;
  if (Math.abs(seconds) < 1e-3) return `${(seconds * 1e6).toPrecision(3)} µs`;
  if (Math.abs(seconds) < 1) return `${(seconds * 1e3).toPrecision(3)} ms`;
  return `${seconds.toPrecision(3)} s`;
};

export default function RcTimeConstantCalculatorPage() {
  const { toast } = useToast();
  const [resistance, setResistance] = useState<string>(''); // Ohms
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

  const calculateTimeConstant = () => {
    setError(null);
    setResult(null);

    const R_val = parseFloat(resistance);
    const C_val_input = parseFloat(capacitance);

    if (isNaN(R_val) || isNaN(C_val_input)) {
      setError("Please enter valid numeric values for resistance and capacitance.");
      return;
    }
    if (R_val <= 0 || C_val_input <= 0) {
      setError("Resistance and Capacitance values must be positive and greater than zero.");
      return;
    }

    let C_farads: number;
    switch (capacitanceUnit) {
      case 'pF': C_farads = C_val_input * 1e-12; break;
      case 'nF': C_farads = C_val_input * 1e-9; break;
      case 'uF': C_farads = C_val_input * 1e-6; break;
      case 'mF': C_farads = C_val_input * 1e-3; break;
      case 'F': C_farads = C_val_input; break;
      default: C_farads = C_val_input * 1e-6; // Default to µF
    }
    
    const timeConstant = R_val * C_farads;

    if (isNaN(timeConstant) || !isFinite(timeConstant)) {
      setError("Calculation resulted in an invalid number. Please check input values.");
      return;
    }

    setResult(formatTime(timeConstant)); 
    toast({ title: "Calculation Complete", description: `Time Constant (τ): ${formatTime(timeConstant)}` });
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
            <TimerIcon className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">RC Time Constant Calculator</CardTitle>
          <CardDescription>
            Calculate the time constant (τ) of a resistor-capacitor (RC) circuit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="resistance">Resistance (R) - Ohms</Label>
            <Input id="resistance" type="text" placeholder="e.g., 1000" value={resistance} onChange={handleInputChange(setResistance)} className="h-10 text-base" inputMode="decimal" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="capacitance">Capacitance (C)</Label>
              <Input id="capacitance" type="text" placeholder="e.g., 10" value={capacitance} onChange={handleInputChange(setCapacitance)} className="h-10 text-base" inputMode="decimal" />
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

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateTimeConstant} size="lg" className={cn("w-full transition-transform hover:scale-105", "bg-red-600 hover:bg-red-700 text-white")}>
            <Zap className="mr-2 h-5 w-5"/> Calculate Time Constant (τ)
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Time Constant (τ):</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
              <p className="text-xs text-muted-foreground text-center pt-2">The time constant represents the time required for the voltage across the capacitor to reach approximately 63.2% of its final value during charging, or to fall to 36.8% of its initial value during discharging.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    