
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
import { cn } from '@/lib/utils';
import Image from 'next/image';


type OhmsLawParameter = 'voltage' | 'current' | 'resistance';

interface OhmsLawValues {
  voltage: string;
  current: string;
  resistance: string;
  power: string;
}

const OhmsLawDiagram = () => (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg h-full">
        <Image
            src="https://lh3.googleusercontent.com/d/15AUu1zE3iZMmkHmBIMkiAUHsfg8hQbAc"
            alt="Ohm's Law Circuit Diagram"
            data-ai-hint="ohms law diagram"
            width={300}
            height={200}
            className="rounded-lg object-contain"
        />
    </div>
);


export default function OhmsLawCalculatorPage() {
  const { toast } = useToast();
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
    if (/^\d*\.?\d*$/.test(value) || value === '') { 
      setValues(prev => ({ ...prev, [name]: value, power: '' })); 
      setError(null);
    }
  };

  const handleSelectChange = (value: OhmsLawParameter) => {
    setCalculateWhich(value);
    setValues({ voltage: '', current: '', resistance: '', power: ''}); 
    setError(null);
  };

  const formatResult = (num: number | null | undefined, unit: string): string => {
    if (num === null || num === undefined || isNaN(num) || !isFinite(num)) return '';
    if (Math.abs(num) < 0.0001 && num !== 0) return num.toExponential(2) + ` ${unit}`;
    if (Math.abs(num) < 1) return num.toFixed(4) + ` ${unit}`;
    if (Math.abs(num) < 1000) return num.toFixed(2) + ` ${unit}`;
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 }) + ` ${unit}`;
  };

  const performCalculation = () => {
    setError(null);
    const v = parseFloat(values.voltage);
    const i = parseFloat(values.current);
    const r = parseFloat(values.resistance);

    let newVoltage = NaN, newCurrent = NaN, newResistance = NaN, newPower = NaN;

    try {
        const requiredInputs = {
            voltage: ['current', 'resistance'],
            current: ['voltage', 'resistance'],
            resistance: ['voltage', 'current'],
        };

        const inputsProvided = {
            voltage: values.voltage,
            current: values.current,
            resistance: values.resistance,
        };

        for (const input of requiredInputs[calculateWhich]) {
            if (inputsProvided[input as keyof typeof inputsProvided] === '' || isNaN(parseFloat(inputsProvided[input as keyof typeof inputsProvided]))) {
                throw new Error(`Please provide ${requiredInputs[calculateWhich].join(' and ')} to calculate ${calculateWhich}.`);
            }
        }
        
        if (calculateWhich === 'voltage') {
            if (i <= 0 || r <= 0) throw new Error("Current and Resistance must be positive.");
            newVoltage = i * r;
            newPower = newVoltage * i;
        } else if (calculateWhich === 'current') {
            if (r <= 0) throw new Error("Resistance must be positive and greater than zero.");
            if (v < 0) throw new Error("Voltage must be non-negative.");
            newCurrent = v / r;
            newPower = v * newCurrent;
        } else if (calculateWhich === 'resistance') {
            if (i <= 0) throw new Error("Current must be positive and greater than zero.");
            if (v < 0) throw new Error("Voltage must be non-negative.");
            newResistance = v / i;
            newPower = v * i;
        }

        const finalValues = {
            voltage: isNaN(newVoltage) ? values.voltage : newVoltage.toString(),
            current: isNaN(newCurrent) ? values.current : newCurrent.toString(),
            resistance: isNaN(newResistance) ? values.resistance : newResistance.toString(),
            power: newPower.toString(),
        }

        setValues(finalValues);
         toast({
            title: "Calculation Complete",
            description: (
              <div className="flex flex-col gap-1">
                <span>{`Calculated ${calculateWhich.charAt(0).toUpperCase() + calculateWhich.slice(1)}: ${formatResult(parseFloat(finalValues[calculateWhich]), calculateWhich === 'voltage' ? 'V' : calculateWhich === 'current' ? 'A' : 'Ω')}`}</span>
                <span>{`Power: ${formatResult(newPower, 'W')}`}</span>
              </div>
            ),
        });

    } catch (e: any) {
      setError(e.message || "Calculation error.");
      setValues(prev => ({ ...prev, power: '' })); 
    }
  };
  
   const getFormulaText = () => {
    switch(calculateWhich) {
        case 'voltage': return "V = I × R";
        case 'current': return "I = V / R";
        case 'resistance': return "R = V / I";
        default: return "V = I × R";
    }
  }


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

      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Ohm's Law Calculator</CardTitle>
          <CardDescription>
            Enter any two values to calculate the third, based on Ohm's Law. Power (W) is also calculated.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* Left Column: Inputs and Controls */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="voltage">Voltage (V)</Label>
                            <Input id="voltage" name="voltage" type="text" placeholder="Enter Voltage" value={values.voltage} onChange={handleInputChange} className="h-11 text-base" inputMode="decimal" disabled={calculateWhich === 'voltage'}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="current">Current (I) - Amps</Label>
                            <Input id="current" name="current" type="text" placeholder="Enter Current" value={values.current} onChange={handleInputChange} className="h-11 text-base" inputMode="decimal" disabled={calculateWhich === 'current'}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="resistance">Resistance (R) - Ohms</Label>
                            <Input id="resistance" name="resistance" type="text" placeholder="Enter Resistance" value={values.resistance} onChange={handleInputChange} className="h-11 text-base" inputMode="decimal" disabled={calculateWhich === 'resistance'}/>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="calculateWhich">Value to Calculate</Label>
                        <Select value={calculateWhich} onValueChange={handleSelectChange as any}>
                            <SelectTrigger className="h-11 text-base">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="voltage">Voltage (V)</SelectItem>
                            <SelectItem value="current">Current (I)</SelectItem>
                            <SelectItem value="resistance">Resistance (R)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                     <Button onClick={performCalculation} size="lg" className={cn(
                        "w-full transition-transform hover:scale-105 h-12 text-lg font-bold",
                        "bg-red-600 hover:bg-red-700 text-white"
                     )}>
                        <Zap className="mr-2 h-5 w-5"/> CALCULATE
                    </Button>
                </div>
                
                {/* Right Column: Diagram and Results */}
                <div className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg text-center">
                        <p className="text-lg font-semibold text-muted-foreground">Formula</p>
                        <p className="text-3xl font-mono font-bold text-primary tracking-wider">{getFormulaText()}</p>
                    </div>
                    
                    <OhmsLawDiagram />
                    
                    {error && 
                        <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
                        <AlertTriangle className="h-4 w-4"/> {error}
                        </div>
                    }

                    {(values.power || Object.values(values).some(v => v && !isNaN(parseFloat(v)))) && !error && (
                         <div className="mt-6 p-4 bg-primary/5 rounded-lg space-y-3 border border-primary/20">
                            <h3 className="text-xl font-semibold text-center text-primary mb-2">Results</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-base">
                                <p><strong>Voltage:</strong> {values.voltage ? `${parseFloat(values.voltage).toPrecision(4)} V` : "---"}</p>
                                <p><strong>Current:</strong> {values.current ? `${parseFloat(values.current).toPrecision(4)} A` : "---"}</p>
                                <p><strong>Resistance:</strong> {values.resistance ? `${parseFloat(values.resistance).toPrecision(4)} Ω` : "---"}</p>
                                <p><strong>Power:</strong> {values.power ? `${parseFloat(values.power).toPrecision(4)} W`: "---"}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
