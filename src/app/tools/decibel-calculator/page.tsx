
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Signal, Zap } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type CalculationType = 'ratio_to_db' | 'db_to_ratio';
type RatioType = 'power' | 'voltage_current';

export default function DecibelCalculatorPage() {
  const { toast } = useToast();
  const [calcType, setCalcType] = useState<CalculationType>('ratio_to_db');
  const [ratioType, setRatioType] = useState<RatioType>('power');
  const [inputValue1, setInputValue1] = useState<string>(''); // P1/V1 or dB
  const [inputValue2, setInputValue2] = useState<string>(''); // P2/V2 (only for ratio_to_db)
  
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '' || value ==='-') { // Allow numbers, decimal, and negative sign
      setter(value);
      setError(null);
      setResult(null);
    }
  };

  const calculateDecibels = () => {
    setError(null);
    setResult(null);
    toast({ title: "Placeholder", description: "Decibel calculation logic needs to be implemented." });
    // Logic to be added
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
            <Signal className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Decibel (dB) Calculator</CardTitle>
          <CardDescription>
            Convert between linear ratios (power or voltage/current) and decibels, or vice-versa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calcType">Calculation Type</Label>
              <Select value={calcType} onValueChange={(value) => setCalcType(value as CalculationType)}>
                <SelectTrigger id="calcType" className="h-11 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ratio_to_db">Ratio to dB</SelectItem>
                  <SelectItem value="db_to_ratio">dB to Ratio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ratioType">Ratio Type</Label>
              <Select value={ratioType} onValueChange={(value) => setRatioType(value as RatioType)}>
                <SelectTrigger id="ratioType" className="h-11 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="power">Power Ratio</SelectItem>
                  <SelectItem value="voltage_current">Voltage/Current Ratio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {calcType === 'ratio_to_db' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="inputValue1_ratio">{ratioType === 'power' ? 'Power P1' : 'Voltage/Current V1/I1'}</Label>
                <Input id="inputValue1_ratio" type="text" placeholder="e.g., 10" value={inputValue1} onChange={handleInputChange(setInputValue1)} className="h-10 text-base" inputMode="decimal"/>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="inputValue2_ratio">{ratioType === 'power' ? 'Power P2' : 'Voltage/Current V2/I2'}</Label>
                <Input id="inputValue2_ratio" type="text" placeholder="e.g., 1" value={inputValue2} onChange={handleInputChange(setInputValue2)} className="h-10 text-base" inputMode="decimal"/>
              </div>
            </div>
          )}

          {calcType === 'db_to_ratio' && (
            <div className="space-y-1.5">
              <Label htmlFor="inputValue1_db">Decibels (dB)</Label>
              <Input id="inputValue1_db" type="text" placeholder="e.g., 3 or -3" value={inputValue1} onChange={handleInputChange(setInputValue1)} className="h-10 text-base" inputMode="decimal"/>
            </div>
          )}


          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive">
              {error}
            </div>
          )}
          
          <Button onClick={calculateDecibels} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Result:</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

