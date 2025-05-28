
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Signal, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type CalculationType = 'ratio_to_db' | 'db_to_ratio';
type RatioType = 'power' | 'voltage_current';

export default function DecibelCalculatorPage() {
  const { toast } = useToast();
  const [calcType, setCalcType] = useState<CalculationType>('ratio_to_db');
  const [ratioType, setRatioType] = useState<RatioType>('power');
  const [inputValue1, setInputValue1] = useState<string>(''); // P1/V1/I1 or dB
  const [inputValue2, setInputValue2] = useState<string>(''); // P2/V2/I2 (only for ratio_to_db)
  
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow numbers, decimal point, and negative sign only for dB input
    const pattern = (calcType === 'db_to_ratio' && setter === setInputValue1) 
                    ? /^-?\d*\.?\d*$/ 
                    : /^\d*\.?\d*$/;
    if (pattern.test(value) || value === '') {
      setter(value);
      setError(null);
      setResult(null);
    }
  };

  const calculateDecibels = () => {
    setError(null);
    setResult(null);

    const val1 = parseFloat(inputValue1);
    const val2 = parseFloat(inputValue2); // Only used for ratio_to_db

    let calculatedResult: number | null = null;
    let resultString = "";

    try {
      if (calcType === 'ratio_to_db') {
        if (isNaN(val1) || isNaN(val2)) {
          throw new Error("Please enter valid numeric values for both inputs.");
        }
        if (val1 <= 0 || val2 <= 0) {
          throw new Error("Ratio inputs (P1/P2 or V1/V2) must be positive and greater than zero.");
        }
        const ratio = val1 / val2;
        if (ratioType === 'power') {
          calculatedResult = 10 * Math.log10(ratio);
        } else { // voltage_current
          calculatedResult = 20 * Math.log10(ratio);
        }
        resultString = `${calculatedResult.toFixed(3)} dB`;

      } else { // db_to_ratio
        if (isNaN(val1)) {
          throw new Error("Please enter a valid numeric value for Decibels (dB).");
        }
        if (ratioType === 'power') {
          calculatedResult = Math.pow(10, val1 / 10);
        } else { // voltage_current
          calculatedResult = Math.pow(10, val1 / 20);
        }
        resultString = `Ratio: ${calculatedResult.toPrecision(4)}`;
      }

      if (calculatedResult === null || isNaN(calculatedResult) || !isFinite(calculatedResult)) {
        throw new Error("Calculation resulted in an invalid number. Check inputs.");
      }
      setResult(resultString);
      toast({ title: "Calculation Complete", description: resultString });

    } catch (e: any) {
      setError(e.message);
      setResult(null);
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
              <Select value={calcType} onValueChange={(value) => {setCalcType(value as CalculationType); setInputValue1(''); setInputValue2(''); setResult(null); setError(null);}}>
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
              <Select value={ratioType} onValueChange={(value) => {setRatioType(value as RatioType); setResult(null); setError(null);}}>
                <SelectTrigger id="ratioType" className="h-11 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="power">Power Ratio (P1/P2)</SelectItem>
                  <SelectItem value="voltage_current">Voltage/Current Ratio (V1/V2 or I1/I2)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {calcType === 'ratio_to_db' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="inputValue1_ratio">{ratioType === 'power' ? 'Value 1 (e.g., P1)' : 'Value 1 (e.g., V1 or I1)'}</Label>
                <Input id="inputValue1_ratio" type="text" placeholder="e.g., 10" value={inputValue1} onChange={handleInputChange(setInputValue1)} className="h-10 text-base" inputMode="decimal"/>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="inputValue2_ratio">{ratioType === 'power' ? 'Value 2 (e.g., P2, reference)' : 'Value 2 (e.g., V2 or I2, reference)'}</Label>
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
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
               <AlertTriangle className="h-4 w-4"/> {error}
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
