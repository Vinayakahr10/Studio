
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calculator, Zap } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type OhmsLawValues = {
  voltage: string;
  current: string;
  resistance: string;
  power: string;
};

export default function OhmsLawCalculatorPage() {
  const { toast } = useToast();
  const [values, setValues] = useState<OhmsLawValues>({
    voltage: '',
    current: '',
    resistance: '',
    power: '',
  });
  const [calculate, setCalculate] = useState<'voltage' | 'current' | 'resistance' | 'power'>('voltage');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setValues({ ...values, [name]: value });
      setError(null); // Clear error on valid input
    }
  };
  
  const handleSelectChange = (value: 'voltage' | 'current' | 'resistance' | 'power') => {
    setCalculate(value);
  };

  // Placeholder calculation logic
  const performCalculation = () => {
    setError(null);
    const v = parseFloat(values.voltage);
    const i = parseFloat(values.current);
    const r = parseFloat(values.resistance);
    // const p = parseFloat(values.power); // Power is usually calculated

    let newVoltage = values.voltage;
    let newCurrent = values.current;
    let newResistance = values.resistance;
    let newPower = '';

    const knownValues = [values.voltage, values.current, values.resistance].filter(val => val !== '').length;
    if (knownValues < 2 && (calculate === 'voltage' || calculate === 'current' || calculate === 'resistance')) {
        setError("Please enter at least two values (Voltage, Current, or Resistance) to calculate the third.");
        return;
    }
     if (knownValues === 0 && calculate === 'power') {
        setError("Please enter at least Voltage and Current, or Current and Resistance, or Voltage and Resistance to calculate Power.");
        return;
    }


    // This is where the actual Ohm's Law logic would go.
    // For now, it's a placeholder.
    toast({
      title: "Calculation Placeholder",
      description: "Actual Ohm's Law calculation logic needs to be implemented.",
    });

    // Example: If calculating voltage and I & R are known
    if (calculate === 'voltage' && !isNaN(i) && !isNaN(r)) {
      newVoltage = (i * r).toString();
      newPower = (i * i * r).toString();
    } 
    // Example: If calculating current and V & R are known
    else if (calculate === 'current' && !isNaN(v) && !isNaN(r) && r !== 0) {
      newCurrent = (v / r).toString();
      newPower = (v * v / r).toString();
    }
    // Example: If calculating resistance and V & I are known
    else if (calculate === 'resistance' && !isNaN(v) && !isNaN(i) && i !== 0) {
      newResistance = (v / i).toString();
      newPower = (v * i).toString();
    }
     // Example: If calculating power directly
    else if (calculate === 'power') {
        if(!isNaN(v) && !isNaN(i)) newPower = (v*i).toString();
        else if (!isNaN(i) && !isNaN(r)) newPower = (i*i*r).toString();
        else if (!isNaN(v) && !isNaN(r) && r !== 0) newPower = (v*v/r).toString();
        else {
             setError("Insufficient values to calculate power. Need V & I, or I & R, or V & R.");
             return;
        }
    } else if (knownValues >=2) { // If calculating V, I, or R but not enough specific pair.
        setError("Please provide the correct pair of values for the selected calculation or ensure values are valid numbers.");
        return;
    }


    // Update all fields based on what was calculated
    // This logic needs to be robust based on which two fields are filled.
    // For demo, we'll just update what was "calculated"
    setValues(prev => ({
        ...prev,
        voltage: calculate === 'voltage' ? newVoltage : prev.voltage,
        current: calculate === 'current' ? newCurrent : prev.current,
        resistance: calculate === 'resistance' ? newResistance : prev.resistance,
        power: newPower || prev.power // Always update power if calculated
    }));

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
            Enter any two values (Voltage, Current, Resistance) to calculate the other two, including Power.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="voltage">Voltage (V)</Label>
              <Input id="voltage" name="voltage" type="text" placeholder="e.g., 12" value={values.voltage} onChange={handleInputChange} className="h-11 text-base" inputMode="decimal" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current">Current (I) - Amps</Label>
              <Input id="current" name="current" type="text" placeholder="e.g., 0.5" value={values.current} onChange={handleInputChange} className="h-11 text-base" inputMode="decimal"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resistance">Resistance (R) - Ohms</Label>
              <Input id="resistance" name="resistance" type="text" placeholder="e.g., 24" value={values.resistance} onChange={handleInputChange} className="h-11 text-base" inputMode="decimal"/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="calculate">Calculate Which Value?</Label>
              <Select value={calculate} onValueChange={handleSelectChange}>
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
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <Button onClick={performCalculation} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate
          </Button>

          <div className="mt-6 p-6 bg-muted/30 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-center text-primary mb-3">Results:</h3>
            <div className="grid grid-cols-2 gap-3 text-base">
              <div><strong>Voltage (V):</strong> {values.voltage || "N/A"}</div>
              <div><strong>Current (A):</strong> {values.current || "N/A"}</div>
              <div><strong>Resistance (Ω):</strong> {values.resistance || "N/A"}</div>
              <div><strong>Power (W):</strong> {values.power || "N/A"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
