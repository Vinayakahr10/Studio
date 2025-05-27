
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Sigma, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface LedResistorResults {
  resistorValue: string;
  powerRating: string;
  actualCurrent: string;
}

export default function LedResistorCalculatorPage() {
  const { toast } = useToast();
  const [supplyVoltage, setSupplyVoltage] = useState<string>('');
  const [ledForwardVoltage, setLedForwardVoltage] = useState<string>('');
  const [ledForwardCurrent, setLedForwardCurrent] = useState<string>(''); // in mA
  
  const [results, setResults] = useState<LedResistorResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     if (/^\d*\.?\d*$/.test(value) || value === '') { // Allow numbers and one decimal
      setter(value);
      setError(null); 
      setResults(null); // Clear results on input change
    }
  };

  const calculateResistor = () => {
    setError(null);
    setResults(null);

    const vs = parseFloat(supplyVoltage);
    const vf = parseFloat(ledForwardVoltage);
    const ifMa = parseFloat(ledForwardCurrent);

    if (isNaN(vs) || isNaN(vf) || isNaN(ifMa)) {
      setError("Please enter valid numeric values for all fields.");
      return;
    }

    if (vs <= 0 || vf <= 0 || ifMa <= 0) {
      setError("All voltage and current values must be positive.");
      return;
    }

    if (vf >= vs) {
      setError("LED Forward Voltage (Vf) must be less than Supply Voltage (Vs).");
      return;
    }

    const ifAmps = ifMa / 1000; // Convert mA to Amps
    const resistorValueOhms = (vs - vf) / ifAmps;
    
    if (resistorValueOhms <= 0) {
        setError("Calculated resistor value is zero or negative. Check input values; Vs must be greater than Vf.");
        return;
    }

    const powerDissipatedWatts = (vs - vf) * ifAmps;

    // Standard resistor value (simplified - not implementing full E-series search here)
    // We'll just use the calculated value, often users pick the next common higher value.
    const standardResistorValue = resistorValueOhms; 

    // Recommend a power rating (typically at least 2x the dissipated power)
    let recommendedPowerRating = "1/8 W (0.125 W)";
    if (powerDissipatedWatts > 0.0625) recommendedPowerRating = "1/4 W (0.25 W)"; // Standard safety margin
    if (powerDissipatedWatts > 0.125) recommendedPowerRating = "1/2 W (0.5 W)";
    if (powerDissipatedWatts > 0.25) recommendedPowerRating = "1 W";
    if (powerDissipatedWatts > 0.5) recommendedPowerRating = "2 W";
    // Add more steps as needed for higher power LEDs

    const actualCurrentThroughLedAmps = (vs - vf) / standardResistorValue;
    const actualCurrentThroughLedMa = actualCurrentThroughLedAmps * 1000;

    setResults({
      resistorValue: `${standardResistorValue.toFixed(1)} Ω`,
      powerRating: recommendedPowerRating,
      actualCurrent: `${actualCurrentThroughLedMa.toFixed(2)} mA`
    });
    
    toast({
        title: "Calculation Complete",
        description: `Resistor: ${standardResistorValue.toFixed(1)} Ω, Power Rating: ${recommendedPowerRating}`,
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
            <Sigma className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">LED Series Resistor Calculator</CardTitle>
          <CardDescription>
            Calculate the required series resistor and its power rating for an LED.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="supplyVoltage">Supply Voltage (Vs) - Volts</Label>
              <Input id="supplyVoltage" type="text" placeholder="e.g., 5" value={supplyVoltage} onChange={handleInputChange(setSupplyVoltage)} className="h-10 text-base" inputMode="decimal" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ledForwardVoltage">LED Forward Voltage (Vf) - Volts</Label>
              <Input id="ledForwardVoltage" type="text" placeholder="e.g., 2.1 (Red LED)" value={ledForwardVoltage} onChange={handleInputChange(setLedForwardVoltage)} className="h-10 text-base" inputMode="decimal" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ledForwardCurrent">LED Forward Current (If) - Milliamps (mA)</Label>
            <Input id="ledForwardCurrent" type="text" placeholder="e.g., 20 (Standard LED)" value={ledForwardCurrent} onChange={handleInputChange(setLedForwardCurrent)} className="h-10 text-base" inputMode="decimal" />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateResistor} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate Resistor
          </Button>

          {results && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-3 border border-primary/20">
              <h3 className="text-xl font-semibold text-center text-primary mb-2">Calculated Values:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-base">
                 <p><strong>Required Resistor:</strong> {results.resistorValue}</p>
                <p><strong>Recommended Rating:</strong> {results.powerRating}</p>
                <p className="sm:col-span-2"><strong>Actual LED Current:</strong> {results.actualCurrent}</p>
              </div>
               <p className="text-xs text-muted-foreground text-center pt-2">Note: For a longer LED life, consider using a slightly higher resistor value than calculated, or ensure the actual current is slightly below the LED's maximum forward current rating. Always select a resistor with a power rating at least double the calculated dissipated power.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
