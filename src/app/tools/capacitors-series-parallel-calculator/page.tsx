
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Layers, Zap, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type ConnectionType = 'series' | 'parallel';

export default function CapacitorsSeriesParallelCalculatorPage() {
  const { toast } = useToast();
  const [connectionType, setConnectionType] = useState<ConnectionType>('parallel');
  const [capacitors, setCapacitors] = useState<string[]>(['', '']); // Start with two capacitor inputs
  const [unit, setUnit] = useState<string>('uF'); // Default unit
  
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (index: number, value: string) => {
    const newCapacitors = [...capacitors];
     if (/^\d*\.?\d*$/.test(value) || value === '') {
      newCapacitors[index] = value;
      setCapacitors(newCapacitors);
      setError(null);
      setResult(null);
    }
  };
  
  const addCapacitorInput = () => {
    setCapacitors([...capacitors, '']);
  };

  const removeCapacitorInput = (index: number) => {
    if (capacitors.length > 2) { // Keep at least two inputs
      const newCapacitors = capacitors.filter((_, i) => i !== index);
      setCapacitors(newCapacitors);
    }
  };


  const calculateTotalCapacitance = () => {
    setError(null);
    setResult(null);
    toast({ title: "Placeholder", description: "Calculation logic for capacitors needs to be implemented." });
    // Logic to be added later
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
            <Layers className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Capacitors in Series/Parallel Calculator</CardTitle>
          <CardDescription>
            Calculate the total equivalent capacitance of capacitors connected in series or parallel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="connectionType">Connection Type</Label>
            <Select value={connectionType} onValueChange={(value) => setConnectionType(value as ConnectionType)}>
              <SelectTrigger id="connectionType" className="h-11 text-base">
                <SelectValue placeholder="Select connection type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parallel">Parallel</SelectItem>
                <SelectItem value="series">Series</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr] gap-2 items-end mb-4">
            <div className="font-medium text-sm">Capacitor Values</div>
            <div className="space-y-1.5">
                <Label htmlFor="unit" className="sr-only">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit" className="h-10 text-base">
                    <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pF">pF</SelectItem>
                        <SelectItem value="nF">nF</SelectItem>
                        <SelectItem value="uF">µF</SelectItem>
                        <SelectItem value="mF">mF</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

          <div className="space-y-4">
            {capacitors.map((capValue, index) => (
              <div key={index} className="flex items-center gap-2">
                 <div className="flex-grow space-y-1.5">
                  <Label htmlFor={`c${index + 1}`}>Capacitor C{index + 1} ({unit})</Label>
                  <Input 
                    id={`c${index + 1}`} 
                    type="text" 
                    placeholder="e.g., 10" 
                    value={capValue} 
                    onChange={(e) => handleInputChange(index, e.target.value)} 
                    className="h-10 text-base" 
                    inputMode="decimal" 
                  />
                </div>
                 {capacitors.length > 2 && (
                  <Button variant="ghost" size="icon" onClick={() => removeCapacitorInput(index)} className="mt-auto text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-5 w-5" />
                     <span className="sr-only">Remove capacitor</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
           <Button variant="outline" onClick={addCapacitorInput} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Another Capacitor
          </Button>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive">
              {error}
            </div>
          )}
          
          <Button onClick={calculateTotalCapacitance} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate Total Capacitance
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Total Capacitance (Ct):</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

