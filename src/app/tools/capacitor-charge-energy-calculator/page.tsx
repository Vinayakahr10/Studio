
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Bolt, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CapacitorResults {
  charge: string;
  energy: string;
}

export default function CapacitorChargeEnergyCalculatorPage() {
  const { toast } = useToast();
  const [capacitance, setCapacitance] = useState<string>('');
  const [capacitanceUnit, setCapacitanceUnit] = useState<string>('uF');
  const [voltage, setVoltage] = useState<string>('');
  
  const [results, setResults] = useState<CapacitorResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setter(value);
      setError(null);
      setResults(null);
    }
  };

  const formatScientific = (val: number, unit: string, precision: number = 3): string => {
      if (isNaN(val) || !isFinite(val)) return `--- ${unit.charAt(0)}`;
      if (val === 0) return `0 ${unit}`;
      
      const absVal = Math.abs(val);
      if (absVal < 1e-9 && unit !== 'J') return `${(val * 1e12).toPrecision(precision)} p${unit.charAt(0)}`;
      if (absVal < 1e-6 && unit !== 'J') return `${(val * 1e9).toPrecision(precision)} n${unit.charAt(0)}`;
      if (absVal < 1e-3) return `${(val * 1e6).toPrecision(precision)} µ${unit.charAt(0)}`;
      if (absVal < 1) return `${(val * 1e3).toPrecision(precision)} m${unit.charAt(0)}`;
      return `${val.toPrecision(precision)} ${unit}`;
  };

  const calculateValues = () => {
    setError(null);
    setResults(null);

    const C_input = parseFloat(capacitance);
    const V_input = parseFloat(voltage);

    if (isNaN(C_input) || isNaN(V_input)) {
      setError("Please enter valid numeric values for capacitance and voltage.");
      return;
    }
    if (C_input <= 0) { 
      setError("Capacitance must be positive and greater than zero.");
      return;
    }
     if (V_input < 0) { 
      setError("Voltage must be non-negative.");
      return;
    }


    let C_farads: number;
    switch (capacitanceUnit) {
      case 'pF': C_farads = C_input * 1e-12; break;
      case 'nF': C_farads = C_input * 1e-9; break;
      case 'uF': C_farads = C_input * 1e-6; break;
      case 'mF': C_farads = C_input * 1e-3; break;
      case 'F': C_farads = C_input; break;
      default: C_farads = C_input * 1e-6; // Should not happen with Select
    }
    
    const charge_coulombs = C_farads * V_input;
    const energy_joules = 0.5 * C_farads * Math.pow(V_input, 2);

    if (isNaN(charge_coulombs) || !isFinite(charge_coulombs) || isNaN(energy_joules) || !isFinite(energy_joules)) {
      setError("Calculation resulted in an invalid number. Check inputs.");
      return;
    }
    
    const chargeResult = formatScientific(charge_coulombs, "C");
    const energyResult = formatScientific(energy_joules, "J");

    setResults({
      charge: chargeResult,
      energy: energyResult,
    });
    
    toast({
      title: "Calculation Complete",
      description: `Charge: ${chargeResult}, Energy: ${energyResult}`,
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
            <Bolt className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Capacitor Charge & Energy Calculator</CardTitle>
          <CardDescription>
            Calculate the charge stored (Q) and energy stored (E) in a capacitor.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="capacitance_charge">Capacitance (C)</Label>
              <Input id="capacitance_charge" type="text" placeholder="e.g., 100" value={capacitance} onChange={handleInputChange(setCapacitance)} className="h-10 text-base" inputMode="decimal" />
            </div>
             <div className="space-y-1.5">
                <Label htmlFor="capacitanceUnit_charge" className="sr-only">Capacitance Unit</Label>
                <Select value={capacitanceUnit} onValueChange={setCapacitanceUnit}>
                    <SelectTrigger id="capacitanceUnit_charge" className="h-10 text-base">
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

           <div className="space-y-1.5">
            <Label htmlFor="voltage_charge">Voltage (V) - Volts</Label>
            <Input id="voltage_charge" type="text" placeholder="e.g., 12" value={voltage} onChange={handleInputChange(setVoltage)} className="h-10 text-base" inputMode="decimal" />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateValues} size="lg" className={cn("w-full transition-transform hover:scale-105", "bg-red-600 hover:bg-red-700 text-white")}>
            <Zap className="mr-2 h-5 w-5"/> Calculate Charge & Energy
          </Button>

          {results && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-3 border border-primary/20">
              <h3 className="text-xl font-semibold text-center text-primary mb-2">Calculated Values:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-base">
                <p><strong>Charge (Q):</strong> {results.charge}</p>
                <p><strong>Energy (E):</strong> {results.energy}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    