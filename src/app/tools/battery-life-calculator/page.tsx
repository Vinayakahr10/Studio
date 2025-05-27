
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Hourglass, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

// Helper to format duration into a readable string
const formatDuration = (hours: number): string => {
  if (isNaN(hours) || !isFinite(hours) || hours <= 0) return "N/A";

  if (hours < 1) {
    const minutes = hours * 60;
    return `${minutes.toFixed(1)} minutes`;
  }
  if (hours < 24) {
    return `${hours.toFixed(1)} hours`;
  }
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  let durationString = `${days} day${days > 1 ? 's' : ''}`;
  if (remainingHours > 0.1) { // Only add hours if significant
    durationString += ` and ${remainingHours.toFixed(1)} hour${remainingHours > 1 ? 's' : ''}`;
  }
  return durationString;
};


export default function BatteryLifeCalculatorPage() {
  const { toast } = useToast();
  const [batteryCapacity, setBatteryCapacity] = useState<string>(''); // in mAh
  const [currentConsumption, setCurrentConsumption] = useState<string>(''); // in mA
  
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

  const calculateBatteryLife = () => {
    setError(null);
    setResult(null);

    const capacity = parseFloat(batteryCapacity);
    const consumption = parseFloat(currentConsumption);

    if (isNaN(capacity) || isNaN(consumption)) {
      setError("Please enter valid numeric values for all fields.");
      return;
    }

    if (capacity <= 0 || consumption <= 0) {
      setError("Battery capacity and current consumption must be positive and greater than zero.");
      return;
    }
    
    const estimatedHours = capacity / consumption;

    if (isNaN(estimatedHours) || !isFinite(estimatedHours)) {
      setError("Calculation resulted in an invalid number. Please check input values.");
      return;
    }
    
    const formattedDuration = formatDuration(estimatedHours);
    setResult(formattedDuration);
    toast({
      title: "Calculation Complete",
      description: `Estimated Battery Life: ${formattedDuration}`,
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
            <Hourglass className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Battery Life Calculator</CardTitle>
          <CardDescription>
            Estimate how long your battery will last based on its capacity and the device's average current consumption.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="batteryCapacity">Battery Capacity (mAh)</Label>
              <Input id="batteryCapacity" type="text" placeholder="e.g., 2000" value={batteryCapacity} onChange={handleInputChange(setBatteryCapacity)} className="h-10 text-base" inputMode="decimal" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="currentConsumption">Avg. Current Consumption (mA)</Label>
              <Input id="currentConsumption" type="text" placeholder="e.g., 50" value={currentConsumption} onChange={handleInputChange(setCurrentConsumption)} className="h-10 text-base" inputMode="decimal" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateBatteryLife} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate Battery Life
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Estimated Battery Life:</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
               <p className="text-xs text-muted-foreground text-center pt-2">Note: This is an ideal estimate. Real-world battery life can be affected by factors like battery age, temperature, discharge curve, and variations in current draw.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
