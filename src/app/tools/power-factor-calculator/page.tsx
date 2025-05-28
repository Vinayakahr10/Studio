
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, PieChart, Zap } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function PowerFactorCalculatorPage() {
  const { toast } = useToast();
  const [realPower, setRealPower] = useState<string>(''); // Watts (W)
  const [apparentPower, setApparentPower] = useState<string>(''); // Volt-Amperes (VA)
  
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

  const calculatePowerFactor = () => {
    setError(null);
    setResult(null);
    toast({ title: "Placeholder", description: "Power factor calculation logic needs to be implemented." });
    // Logic to be added:
    // const P = parseFloat(realPower);
    // const S = parseFloat(apparentPower);
    // if (isNaN(P) || isNaN(S) || P < 0 || S <= 0) { setError("Inputs must be valid positive numbers; Apparent Power > 0."); return; }
    // if (P > S) { setError("Real Power cannot be greater than Apparent Power."); return; }
    // const pf = P / S;
    // setResult(`Power Factor (PF): ${pf.toFixed(3)} ${pf < 0.85 ? '(Lagging/Leading - Poor)' : '(Good)'}`);
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
            <PieChart className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Power Factor Calculator</CardTitle>
          <CardDescription>
            Calculate the power factor (PF) given Real Power (P) and Apparent Power (S).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="realPower">Real Power (P) - Watts (W)</Label>
              <Input id="realPower" type="text" placeholder="e.g., 800" value={realPower} onChange={handleInputChange(setRealPower)} className="h-10 text-base" inputMode="decimal"/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="apparentPower">Apparent Power (S) - Volt-Amperes (VA)</Label>
              <Input id="apparentPower" type="text" placeholder="e.g., 1000" value={apparentPower} onChange={handleInputChange(setApparentPower)} className="h-10 text-base" inputMode="decimal"/>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive">
              {error}
            </div>
          )}
          
          <Button onClick={calculatePowerFactor} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate Power Factor
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Calculated Power Factor:</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
            </div>
          )}
           <p className="text-xs text-muted-foreground text-center">
            Note: Power Factor is unitless and ranges from 0 to 1. A value closer to 1 indicates efficient power usage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

