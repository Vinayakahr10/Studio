
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
  const { toast } = useToast();
  const [capacitorCode, setCapacitorCode] = useState<string>('');
  const [capacitanceResult, setCapacitanceResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only up to 3 digits
    if (/^\d{0,3}$/.test(value)) {
      setCapacitorCode(value);
      setError(null); // Clear error on valid input
    }
  };

  const calculateCapacitance = () => {
    setError(null);
    if (capacitorCode.length !== 3 || !/^\d{3}$/.test(capacitorCode)) {
      setError("Please enter a valid 3-digit capacitor code (e.g., 104, 222).");
      setCapacitanceResult('');
      return;
    }

    // Placeholder for actual calculation logic
    toast({
      title: "Calculation Placeholder",
      description: "Actual capacitor code calculation logic needs to be implemented.",
    });

    // Example placeholder result (Needs real logic)
    // For 104: 10 * 10^4 pF = 100,000 pF = 100 nF = 0.1 µF
    if (capacitorCode === "104") {
        setCapacitanceResult("100,000 pF (100 nF or 0.1 µF)");
    } else if (capacitorCode === "222") {
        setCapacitanceResult("2,200 pF (2.2 nF or 0.0022 µF)");
    } else {
        setCapacitanceResult("Calculated Value (e.g., X pF / Y nF / Z µF)");
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

      <Card className="max-w-md mx-auto shadow-xl">
        <CardHeader className="text-center">
           <div className="inline-block bg-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
            <DraftingCompass className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Capacitor Code Calculator</CardTitle>
          <CardDescription>
            Convert 3-digit capacitor codes (e.g., 104, 222) to capacitance values.
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
            />
             <p className="text-xs text-muted-foreground">Enter the 3 digits found on the capacitor.</p>
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
