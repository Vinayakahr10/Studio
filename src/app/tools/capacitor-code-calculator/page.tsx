
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, DraftingCompass, Zap } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function CapacitorCodeCalculatorPage() {
  const { toast } = useToast(); // Keep toast for potential future error messages if needed
  const [capacitorCode, setCapacitorCode] = useState<string>('');
  const [capacitanceResult, setCapacitanceResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only up to 3 digits
    if (/^\d*$/.test(value) && value.length <= 3) {
      setCapacitorCode(value);
      setError(null); // Clear error on valid input
      if (value.length < 3) {
        setCapacitanceResult(''); // Clear result if input is not complete
      }
    }
  };

  const calculateCapacitance = () => {
    setError(null);
    setCapacitanceResult('');

    if (capacitorCode.length !== 3 || !/^\d{3}$/.test(capacitorCode)) {
      setError("Please enter a valid 3-digit capacitor code (e.g., 104, 222).");
      return;
    }

    const d1 = parseInt(capacitorCode[0]);
    const d2 = parseInt(capacitorCode[1]);
    const multiplierDigit = parseInt(capacitorCode[2]);

    if (isNaN(d1) || isNaN(d2) || isNaN(multiplierDigit)) {
        setError("Invalid characters in code. Please use digits 0-9.");
        return;
    }
    
    // Calculate base value in pF
    const baseValue = d1 * 10 + d2;
    let capacitancePf: number;

    if (multiplierDigit === 8) { // Multiplier 0.01 for codes like XX8
      capacitancePf = baseValue * 0.01;
    } else if (multiplierDigit === 9) { // Multiplier 0.1 for codes like XX9
      capacitancePf = baseValue * 0.1;
    } else { // Standard multiplier 10^N
      capacitancePf = baseValue * Math.pow(10, multiplierDigit);
    }

    const capacitanceNf = capacitancePf / 1000;
    const capacitanceUf = capacitancePf / 1000000;

    // Helper to format numbers nicely, avoiding very small or very large scientific notations for common values
    const formatValue = (val: number) => {
        if (val < 0.000001 && val > 0) return val.toExponential(2);
        if (val >= 1000000 || (val < 1 && val > 0 && val.toString().split('.')[1]?.length > 6)) {
             // Limit decimal places for very small numbers or use scientific for very large
            if (val < 1) return parseFloat(val.toFixed(6)).toString(); // Trim trailing zeros from toFixed
            return val.toLocaleString(); // Add commas for large numbers
        }
        // For most common values, just convert to string, handle potential floating point issues by trimming
        return parseFloat(val.toPrecision(6)).toString(); 
    };
    
    let resultString = `${formatValue(capacitancePf)} pF`;
    if (capacitanceNf >= 0.001) { // Only show nF if it's a reasonable value
        resultString += ` / ${formatValue(capacitanceNf)} nF`;
    }
    if (capacitanceUf >= 0.000001) { // Only show µF if it's a reasonable value
        resultString += ` / ${formatValue(capacitanceUf)} µF`;
    }

    setCapacitanceResult(resultString);
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

      <Card className="max-w-md mx-auto shadow-xl">
        <CardHeader className="text-center">
           <div className="inline-block bg-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
            <DraftingCompass className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Capacitor Code Calculator</CardTitle>
          <CardDescription>
            Convert 3-digit EIA capacitor codes (e.g., 104, 222, 479) to capacitance values.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="capacitorCode">3-Digit Capacitor Code</Label>
            <Input
              id="capacitorCode"
              name="capacitorCode"
              type="text"
              placeholder="e.g., 104"
              value={capacitorCode}
              onChange={handleInputChange}
              className="h-11 text-base text-center tracking-wider font-mono"
              maxLength={3}
              inputMode="numeric"
              pattern="\d{3}" // Basic pattern for 3 digits
            />
             <p className="text-xs text-muted-foreground">Enter the 3 digits found on the capacitor. For codes ending in 8 (x0.01) or 9 (x0.1).</p>
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <Button onClick={calculateCapacitance} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate Capacitance
          </Button>

          {capacitanceResult && (
            <div className="mt-6 p-6 bg-muted/30 rounded-lg space-y-2">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Calculated Capacitance:</h3>
              <p className="text-center text-xl font-mono font-semibold tracking-wide">{capacitanceResult}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

