
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calculator, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

type OhmsLawParameter = 'voltage' | 'current' | 'resistance' | 'power';

interface OhmsLawValues {
  voltage: string;
  current: string;
  resistance: string;
  power: string;
}

export default function OhmsLawCalculatorPage() {
  const { toast } = useToast(); // Toast can still be used for general notifications if needed
  const [values, setValues] = useState<OhmsLawValues>({
    voltage: '',
    current: '',
    resistance: '',
    power: '',
  });
  const [calculateWhich, setCalculateWhich] = useState<OhmsLawParameter>('voltage');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^\d*\.?\d*$/.test(value) || value === '') { // Allow numbers and one decimal point
      setValues(prev => ({ ...prev, [name]: value, power: '' })); // Clear power as it's always derived
      setError(null);
    }
  };

  const handleSelectChange = (value: OhmsLawParameter) => {
    setCalculateWhich(value);
    // Optionally clear fields when changing calculation target
    // setValues({ voltage: '', current: '', resistance: '', power: ''}); 
    setError(null);
  };

  const formatResult = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num) || !isFinite(num)) return '';
    // Show more precision for smaller numbers, less for larger ones.
    if (Math.abs(num) < 0.0001 && num !== 0) return num.toExponential(2);
    if (Math.abs(num) < 1) return num.toFixed(4);
    if (Math.abs(num) < 1000) return num.toFixed(2);
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const performCalculation = () => {
    setError(null);
    const v = parseFloat(values.voltage);
    const i = parseFloat(values.current);
    const r = parseFloat(values.resistance);

    let newVoltage = NaN;
    let newCurrent = NaN;
    let newResistance = NaN;
    let newPower = NaN;

    const knownValuesCount = [values.voltage, values.current, values.resistance]
      .filter(val => val !== '' && !isNaN(parseFloat(val)))
      .length;

    if (calculateWhich !== 'power' && knownValuesCount < 2) {
      setError("Please enter at least two values from Voltage, Current, or Resistance to calculate the third.");
      return;
    }

    try {
      if (calculateWhich === 'voltage') {
        if (isNaN(i) || isNaN(r)) throw new Error("Current and Resistance are required to calculate Voltage.");
        newVoltage = i * r;
        newPower = newVoltage * i;
      } else if (calculateWhich === 'current') {
        if (isNaN(v) || isNaN(r)) throw new Error("Voltage and Resistance are required to calculate Current.");
        if (r === 0) throw new Error("Resistance cannot be zero when calculating Current.");
        newCurrent = v / r;
        newPower = v * newCurrent;
      } else if (calculateWhich === 'resistance') {
        if (isNaN(v) || isNaN(i)) throw new Error("Voltage and Current are required to calculate Resistance.");
        if (i === 0) throw new Error("Current cannot be zero when calculating Resistance.");
        newResistance = v / i;
        newPower = v * i;
      } else if (calculateWhich === 'power') {
        if (!isNaN(v) && !isNaN(i)) { // V and I known
          newPower = v * i;
          if (isNaN(r) && i !== 0) newResistance = v / i;
          else if (isNaN(r) && i === 0 && v !== 0) newResistance = Infinity; // Open circuit
        } else if (!isNaN(i) && !isNaN(r)) { // I and R known
          newPower = i * i * r;
          if (isNaN(v)) newVoltage = i * r;
        } else if (!isNaN(v) && !isNaN(r)) { // V and R known
          if (r === 0) throw new Error("Resistance cannot be zero for this power calculation (V^2/R).");
          newPower = (v * v) / r;
          if (isNaN(i)) newCurrent = v / r;
        } else {
          throw new Error("To calculate Power, provide at least two of: Voltage, Current, or Resistance.");
        }
      }

      setValues({
        voltage: !isNaN(newVoltage) ? formatResult(newVoltage) : (calculateWhich === 'voltage' || isNaN(v) ? '' : formatResult(v)),
        current: !isNaN(newCurrent) ? formatResult(newCurrent) : (calculateWhich === 'current' || isNaN(i) ? '' : formatResult(i)),
        resistance: !isNaN(newResistance) ? formatResult(newResistance) : (calculateWhich === 'resistance' || isNaN(r) ? '' : formatResult(r)),
        power: formatResult(newPower),
      });

    } catch (e: any) {
      setError(e.message || "Calculation error.");
      setValues(prev => ({ ...prev, power: '' })); // Clear power on error
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
            <Calculator className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Ohm's Law Calculator</CardTitle>
          <CardDescription>
            Enter known values and select which value to calculate. Power (W) will also be calculated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="my-4 flex justify-center">
            <Image
              src="https://lh3.googleusercontent.com/d/1NT09WAiCDsB-CuTaT5PozJ8sYxpfT9Iu"
              alt="Ohm's Law Wheel"
              data-ai-hint="ohms law chart"
              width={400}
              height={400}
              className="rounded-full object-contain"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="voltage">Voltage (V)</Label>
              <Input id="voltage" name="voltage" type="text" placeholder="e.g., 12" value={values.voltage} onChange={handleInputChange} className="h-11 text-base" inputMode="decimal" disabled={calculateWhich === 'voltage'}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="current">Current (I) - Amps</Label>
              <Input id="current" name="current" type="text" placeholder="e.g., 0.5" value={values.current} onChange={handleInputChange} className="h-11 text-base" inputMode="decimal" disabled={calculateWhich === 'current'}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resistance">Resistance (R) - Ohms</Label>
              <Input id="resistance" name="resistance" type="text" placeholder="e.g., 24" value={values.resistance} onChange={handleInputChange} className="h-11 text-base" inputMode="decimal" disabled={calculateWhich === 'resistance'}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="power">Power (P) - Watts</Label>
              <Input id="power" name="power" type="text" placeholder="Calculated" value={values.power} readOnly className="h-11 text-base bg-muted/50" disabled={calculateWhich === 'power'}/>
            </div>
          </div>
          
          <div className="space-y-2">
              <Label htmlFor="calculateWhich">Calculate Which Value?</Label>
              <Select value={calculateWhich} onValueChange={handleSelectChange as any}>
                <SelectTrigger className="h-11 text-base">
                  <SelectValue placeholder="Select value to calculate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="voltage">Voltage (V)</SelectItem>
                  <SelectItem value="current">Current (I)</SelectItem>
                  <SelectItem value="resistance">Resistance (Ω)</SelectItem>
                  <SelectItem value="power">Power (W)</SelectItem>
                </SelectContent>
              </Select>
            </div>

          {error && 
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          }

          <Button onClick={performCalculation} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate
          </Button>

          <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-3 border border-primary/20">
            <h3 className="text-xl font-semibold text-center text-primary mb-2">Results Summary:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-base">
              <p><strong>Voltage (V):</strong> {values.voltage || "---"}</p>
              <p><strong>Current (A):</strong> {values.current || "---"}</p>
              <p><strong>Resistance (Ω):</strong> {values.resistance || "---"}</p>
              <p><strong>Power (W):</strong> {values.power || "---"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
