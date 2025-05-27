
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Settings2, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type OperatingMode = 'astable' | 'monostable';

interface AstableResults {
  frequency: string;
  period: string;
  timeHigh: string;
  timeLow: string;
  dutyCycle: string;
}

interface MonostableResults {
  timePeriod: string;
}

// Helper to format numbers and select appropriate units for time
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds) || seconds === 0) return "0 s";
  if (Math.abs(seconds) < 1e-6) return `${(seconds * 1e9).toFixed(2)} ns`; // nanoseconds
  if (Math.abs(seconds) < 1e-3) return `${(seconds * 1e6).toFixed(2)} µs`; // microseconds
  if (Math.abs(seconds) < 1) return `${(seconds * 1e3).toFixed(2)} ms`;    // milliseconds
  return `${seconds.toFixed(3)} s`;                                     // seconds
};

// Helper to format numbers and select appropriate units for frequency
const formatFrequency = (hertz: number): string => {
  if (isNaN(hertz) || !isFinite(hertz) || hertz === 0) return "0 Hz";
  if (hertz >= 1e9) return `${(hertz / 1e9).toPrecision(3)} GHz`; // Gigahertz
  if (hertz >= 1e6) return `${(hertz / 1e6).toPrecision(3)} MHz`; // Megahertz
  if (hertz >= 1e3) return `${(hertz / 1e3).toPrecision(3)} kHz`; // Kilohertz
  return `${hertz.toPrecision(3)} Hz`;                             // Hertz
};


export default function Timer555CalculatorPage() {
  const { toast } = useToast();
  const [mode, setMode] = useState<OperatingMode>('astable');
  
  // Astable inputs
  const [r1Astable, setR1Astable] = useState<string>('');
  const [r2Astable, setR2Astable] = useState<string>('');
  const [cAstable, setCAstable] = useState<string>('');
  
  // Monostable inputs
  const [rMonostable, setRMonostable] = useState<string>('');
  const [cMonostable, setCMonostable] = useState<string>('');

  const [resultsAstable, setResultsAstable] = useState<AstableResults | null>(null);
  const [resultsMonostable, setResultsMonostable] = useState<MonostableResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     if (/^\d*\.?\d*$/.test(value) || value === '') { // Allow numbers and one decimal
      setter(value);
      setError(null); // Clear error on valid input change
    }
  };

  const calculateValues = () => {
    setError(null);
    setResultsAstable(null);
    setResultsMonostable(null);

    if (mode === 'astable') {
      const r1 = parseFloat(r1Astable);
      const r2 = parseFloat(r2Astable);
      const cMicro = parseFloat(cAstable);

      if (isNaN(r1) || isNaN(r2) || isNaN(cMicro)) {
        setError("Please enter valid numeric values for all fields.");
        return;
      }
      if (r1 <= 0 || r2 <= 0 || cMicro <= 0) {
        setError("Resistor and Capacitor values must be positive.");
        return;
      }
      if (r1 < 1000) {
        toast({ title: "Note", description: "R1 values below 1kΩ can sometimes lead to excessive current draw for the 555 timer.", variant: "default" });
      }


      const c = cMicro * 1e-6; // Convert µF to F

      const timeHigh = 0.693 * (r1 + r2) * c;
      const timeLow = 0.693 * r2 * c;
      const period = timeHigh + timeLow;
      const frequency = 1 / period;
      const dutyCycle = (timeHigh / period) * 100;

      setResultsAstable({
        frequency: formatFrequency(frequency),
        period: formatTime(period),
        timeHigh: formatTime(timeHigh),
        timeLow: formatTime(timeLow),
        dutyCycle: `${dutyCycle.toFixed(2)} %`,
      });

    } else if (mode === 'monostable') {
      const r = parseFloat(rMonostable);
      const cMicro = parseFloat(cMonostable);

      if (isNaN(r) || isNaN(cMicro)) {
        setError("Please enter valid numeric values for all fields.");
        return;
      }
       if (r <= 0 || cMicro <= 0) {
        setError("Resistor and Capacitor values must be positive.");
        return;
      }

      const c = cMicro * 1e-6; // Convert µF to F
      const timePeriod = 1.1 * r * c;

      setResultsMonostable({
        timePeriod: formatTime(timePeriod),
      });
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
            <Settings2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">555 Timer Calculator</CardTitle>
          <CardDescription>
            Calculate frequencies, periods, and duty cycles for 555 timer IC circuits in Astable or Monostable mode.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mode">Operating Mode</Label>
            <Select value={mode} onValueChange={(value) => setMode(value as OperatingMode)}>
              <SelectTrigger id="mode" className="h-11 text-base">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="astable">Astable Mode</SelectItem>
                <SelectItem value="monostable">Monostable Mode</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mode === 'astable' && (
            <div className="space-y-4 p-4 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium text-primary">Astable Mode Inputs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="r1_astable">Resistor R1 (Ohms)</Label>
                  <Input id="r1_astable" type="text" placeholder="e.g., 1000" value={r1Astable} onChange={handleInputChange(setR1Astable)} className="h-10 text-base" inputMode="decimal" />
                </div>
                 <div className="space-y-1.5">
                  <Label htmlFor="r2_astable">Resistor R2 (Ohms)</Label>
                  <Input id="r2_astable" type="text" placeholder="e.g., 4700" value={r2Astable} onChange={handleInputChange(setR2Astable)} className="h-10 text-base" inputMode="decimal" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c_astable">Capacitor C (µF)</Label>
                <Input id="c_astable" type="text" placeholder="e.g., 10" value={cAstable} onChange={handleInputChange(setCAstable)} className="h-10 text-base" inputMode="decimal" />
              </div>
            </div>
          )}

          {mode === 'monostable' && (
             <div className="space-y-4 p-4 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium text-primary">Monostable Mode Inputs</h3>
              <div className="space-y-1.5">
                <Label htmlFor="r_monostable">Resistor R (Ohms)</Label>
                <Input id="r_monostable" type="text" placeholder="e.g., 10000" value={rMonostable} onChange={handleInputChange(setRMonostable)} className="h-10 text-base" inputMode="decimal" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c_monostable">Capacitor C (µF)</Label>
                <Input id="c_monostable" type="text" placeholder="e.g., 100" value={cMonostable} onChange={handleInputChange(setCMonostable)} className="h-10 text-base" inputMode="decimal" />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateValues} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate
          </Button>

          {resultsAstable && mode === 'astable' && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-3 border border-primary/20">
              <h3 className="text-xl font-semibold text-center text-primary mb-2">Astable Mode Results:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-base">
                <p><strong>Frequency:</strong> {resultsAstable.frequency}</p>
                <p><strong>Period (T):</strong> {resultsAstable.period}</p>
                <p><strong>Time High (Th):</strong> {resultsAstable.timeHigh}</p>
                <p><strong>Time Low (Tl):</strong> {resultsAstable.timeLow}</p>
                <p className="sm:col-span-2"><strong>Duty Cycle:</strong> {resultsAstable.dutyCycle}</p>
              </div>
            </div>
          )}

          {resultsMonostable && mode === 'monostable' && (
             <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-3 border border-primary/20">
              <h3 className="text-xl font-semibold text-center text-primary mb-2">Monostable Mode Results:</h3>
              <p className="text-center text-lg"><strong>Time Period (T):</strong> {resultsMonostable.timePeriod}</p>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}

    