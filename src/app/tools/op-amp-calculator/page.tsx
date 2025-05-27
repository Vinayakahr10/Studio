
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Triangle as OpAmpIcon, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type OpAmpConfig = 'inverting' | 'non-inverting'; // Add more as needed

interface OpAmpResults {
  gain: string;
  vout?: string;
}

export default function OpAmpCalculatorPage() {
  const { toast } = useToast();
  const [config, setConfig] = useState<OpAmpConfig>('inverting');
  
  const [rIn, setRIn] = useState<string>(''); // For inverting config (R_in or R1)
  const [rF, setRF] = useState<string>('');   // Feedback resistor (Rf)
  const [r1NonInverting, setR1NonInverting] = useState<string>(''); // R1 for non-inverting (to ground)
  const [vIn, setVIn] = useState<string>(''); // Optional input voltage

  const [results, setResults] = useState<OpAmpResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     if (/^-?\d*\.?\d*$/.test(value) || value === '') { // Allow numbers, one decimal, and negative for Vin
      setter(value);
      setError(null); 
      setResults(null);
    }
  };
  
  const handleConfigChange = (value: OpAmpConfig) => {
    setConfig(value);
    setRIn(''); setRF(''); setR1NonInverting(''); setVIn('');
    setError(null);
    setResults(null);
  }

  const calculateOpAmp = () => {
    setError(null);
    setResults(null);

    // Placeholder for actual calculation logic
    toast({
      title: "Calculation Logic Placeholder",
      description: "The actual Op-Amp calculations will be implemented here.",
    });

    // Example of how results might be set (replace with actual calculations)
    // if (config === 'inverting' && rIn && rF) {
    //   const gainVal = - (parseFloat(rF) / parseFloat(rIn));
    //   let voutVal: number | undefined = undefined;
    //   if (vIn) {
    //      voutVal = gainVal * parseFloat(vIn);
    //   }
    //   setResults({
    //     gain: gainVal.toFixed(2),
    //     vout: voutVal !== undefined ? voutVal.toFixed(2) + " V" : "N/A (Vin not provided)",
    //   });
    // } // Add more for non-inverting, etc.
    // else {
    //    setError("Please enter all required resistor values for the selected configuration.");
    // }
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
            <OpAmpIcon className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Op-Amp Gain Calculator</CardTitle>
          <CardDescription>
            Calculate voltage gain and output voltage for common operational amplifier configurations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="opAmpConfig">Op-Amp Configuration</Label>
            <Select value={config} onValueChange={(value) => handleConfigChange(value as OpAmpConfig)}>
              <SelectTrigger id="opAmpConfig" className="h-11 text-base">
                <SelectValue placeholder="Select configuration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inverting">Inverting Amplifier</SelectItem>
                <SelectItem value="non-inverting">Non-Inverting Amplifier</SelectItem>
                {/* Add more configurations like Summing, Difference, etc. later */}
              </SelectContent>
            </Select>
          </div>

          {config === 'inverting' && (
            <div className="space-y-4 p-4 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium text-primary">Inverting Amplifier Inputs</h3>
              <div className="space-y-1.5">
                <Label htmlFor="rIn_inverting">Input Resistor (Rin) - Ohms</Label>
                <Input id="rIn_inverting" type="text" placeholder="e.g., 1000" value={rIn} onChange={handleInputChange(setRIn)} className="h-10 text-base" inputMode="decimal" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rF_inverting">Feedback Resistor (Rf) - Ohms</Label>
                <Input id="rF_inverting" type="text" placeholder="e.g., 10000" value={rF} onChange={handleInputChange(setRF)} className="h-10 text-base" inputMode="decimal" />
              </div>
            </div>
          )}

          {config === 'non-inverting' && (
             <div className="space-y-4 p-4 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium text-primary">Non-Inverting Amplifier Inputs</h3>
               <div className="space-y-1.5">
                <Label htmlFor="r1_noninverting">Resistor R1 (to Ground) - Ohms</Label>
                <Input id="r1_noninverting" type="text" placeholder="e.g., 1000" value={r1NonInverting} onChange={handleInputChange(setR1NonInverting)} className="h-10 text-base" inputMode="decimal" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rF_noninverting">Feedback Resistor (Rf) - Ohms</Label>
                <Input id="rF_noninverting" type="text" placeholder="e.g., 10000" value={rF} onChange={handleInputChange(setRF)} className="h-10 text-base" inputMode="decimal" />
              </div>
            </div>
          )}
          
          <div className="space-y-1.5">
            <Label htmlFor="vIn">Input Voltage (Vin) - Volts (Optional)</Label>
            <Input id="vIn" type="text" placeholder="e.g., 1 or -0.5" value={vIn} onChange={handleInputChange(setVIn)} className="h-10 text-base" inputMode="decimal" />
             <p className="text-xs text-muted-foreground">If provided, Vout will be calculated.</p>
          </div>


          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateOpAmp} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate
          </Button>

          {results && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-3 border border-primary/20">
              <h3 className="text-xl font-semibold text-center text-primary mb-2">Calculated Values:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-base">
                 <p><strong>Voltage Gain (Av):</strong> {results.gain}</p>
                {results.vout && <p><strong>Output Voltage (Vout):</strong> {results.vout}</p>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
