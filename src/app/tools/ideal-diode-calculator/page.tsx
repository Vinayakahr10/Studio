
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRightLeft, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface IdealDiodeResults {
  diodeCurrent: string;
  diodeVoltage: string;
  resistorVoltage: string;
}

export default function IdealDiodeCalculatorPage() {
  const { toast } = useToast();
  const [sourceVoltage, setSourceVoltage] = useState<string>(''); // Vs
  const [resistance, setResistance] = useState<string>(''); // R
  
  const [results, setResults] = useState<IdealDiodeResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     // Allow numbers, one decimal, and negative for voltage
     if (/^-?\d*\.?\d*$/.test(value) || value === '') {
      setter(value);
      setError(null); 
      setResults(null);
    }
  };

  const formatCurrent = (amps: number): string => {
    if (isNaN(amps) || !isFinite(amps)) return "---";
    if (Math.abs(amps) < 1e-3 && amps !== 0) return `${(amps * 1e3).toPrecision(3)} mA`;
    return `${amps.toPrecision(3)} A`;
  };

  const calculateDiodeParameters = () => {
    setError(null);
    setResults(null);

    const vs = parseFloat(sourceVoltage);
    const r = parseFloat(resistance);

    if (isNaN(vs) || isNaN(r)) {
      setError("Please enter valid numeric values for Source Voltage and Resistance.");
      return;
    }

    if (r <= 0) {
      setError("Resistance (R) must be a positive value greater than zero.");
      return;
    }

    let id_amps: number;
    let vd_volts: number;
    let vr_volts: number;

    if (vs > 0) { // Assuming diode is forward biased if Vs is positive
      id_amps = vs / r;
      vd_volts = 0; // Ideal diode forward voltage drop
      vr_volts = vs;
    } else { // Source voltage is zero, negative, or diode would be reverse biased
      id_amps = 0;
      vd_volts = vs; // Diode blocks the entire source voltage
      vr_volts = 0;
    }
    
    setResults({
      diodeCurrent: formatCurrent(id_amps),
      diodeVoltage: `${vd_volts.toFixed(2)} V`,
      resistorVoltage: `${vr_volts.toFixed(2)} V`
    });
    
    toast({
        title: "Calculation Complete",
        description: `Diode Current: ${formatCurrent(id_amps)}`,
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
            <ArrowRightLeft className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Ideal Diode Calculator</CardTitle>
          <CardDescription>
            Calculate current and voltage for an ideal diode in a series circuit with a resistor and voltage source.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="sourceVoltage">Source Voltage (Vs) - Volts</Label>
              <Input id="sourceVoltage" type="text" placeholder="e.g., 5 or -5" value={sourceVoltage} onChange={handleInputChange(setSourceVoltage)} className="h-10 text-base" inputMode="decimal" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="resistance">Series Resistance (R) - Ohms</Label>
              <Input id="resistance" type="text" placeholder="e.g., 1000" value={resistance} onChange={handleInputChange(setResistance)} className="h-10 text-base" inputMode="decimal" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateDiodeParameters} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate Parameters
          </Button>

          {results && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-3 border border-primary/20">
              <h3 className="text-xl font-semibold text-center text-primary mb-2">Calculated Values:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-base">
                 <p><strong>Diode Current (Id):</strong> {results.diodeCurrent}</p>
                 <p><strong>Diode Voltage (Vd):</strong> {results.diodeVoltage}</p>
                 <p className="sm:col-span-2"><strong>Resistor Voltage (Vr):</strong> {results.resistorVoltage}</p>
              </div>
               <p className="text-xs text-muted-foreground text-center pt-2">Note: Assumes an ideal diode. For positive Vs, forward bias is assumed. For Vs ≤ 0, reverse bias is assumed (or current flow is blocked).</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
