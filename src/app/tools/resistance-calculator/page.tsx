
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Palette, Zap } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type BandColor = 'black' | 'brown' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet' | 'gray' | 'white' | 'gold' | 'silver' | 'none';

const colorValues: Record<Exclude<BandColor, 'gold' | 'silver' | 'none'>, number> = {
  black: 0, brown: 1, red: 2, orange: 3, yellow: 4, green: 5, blue: 6, violet: 7, gray: 8, white: 9,
};
const multiplierValues: Record<Exclude<BandColor, 'none'>, number> = {
  black: 1, brown: 10, red: 100, orange: 1000, yellow: 10000, green: 100000, blue: 1000000, violet: 10000000, gray:100000000, white: 1000000000, gold: 0.1, silver: 0.01,
};
const toleranceValues: Record<Extract<BandColor, 'brown' | 'red' | 'green' | 'blue' | 'violet' | 'gray' | 'gold' | 'silver' | 'none'>, number | string> = {
  brown: 1, red: 2, green: 0.5, blue: 0.25, violet: 0.1, gray: 0.05, gold: 5, silver: 10, none: 20,
};
const tempCoValues: Record<Extract<BandColor, 'brown' | 'red' | 'orange' | 'yellow' | 'blue' | 'violet'>, number> = {
  brown: 100, red: 50, orange: 15, yellow: 25, blue: 10, violet: 5,
};


export default function ResistorColorCodeCalculatorPage() {
  const { toast } = useToast();
  const [numBands, setNumBands] = useState<4 | 5 | 6>(4);
  const [band1, setBand1] = useState<BandColor>('brown');
  const [band2, setBand2] = useState<BandColor>('black');
  const [band3, setBand3] = useState<BandColor>('red'); // Multiplier for 4-band, 3rd digit for 5/6-band
  const [band4, setBand4] = useState<BandColor>('gold'); // Tolerance for 4-band, Multiplier for 5/6-band
  const [band5, setBand5] = useState<BandColor>('gold'); // Tolerance for 5/6-band
  const [band6, setBand6] = useState<BandColor>('brown'); // TempCo for 6-band

  const [resistance, setResistance] = useState<string>('');
  const [tolerance, setTolerance] = useState<string>('');
  const [tempCo, setTempCo] = useState<string>('');

  const digitColors: BandColor[] = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'gray', 'white'];
  const multiplierColors: BandColor[] = [...digitColors, 'gold', 'silver'];
  const toleranceColors: BandColor[] = ['brown', 'red', 'green', 'blue', 'violet', 'gray', 'gold', 'silver', 'none'];
  const tempCoColors: BandColor[] = ['brown', 'red', 'orange', 'yellow', 'blue', 'violet'];

  // Placeholder calculation
  const calculateResistance = () => {
     toast({
      title: "Calculation Placeholder",
      description: "Actual resistor calculation logic needs to be implemented.",
    });
    // Basic example for a 4-band resistor (needs full implementation)
    // let val = (colorValues[band1] * 10 + colorValues[band2]) * multiplierValues[band3];
    // setResistance(`${val} Ω`);
    // setTolerance(`±${toleranceValues[band4]}%`);
    setResistance("Calculated Resistance (e.g., 1k Ω)");
    setTolerance("Calculated Tolerance (e.g., ±5%)");
    if (numBands === 6) {
        setTempCo("Calculated TempCo (e.g., 100 ppm/°C)");
    } else {
        setTempCo("");
    }
  };
  
  const bandSelect = (bandNumber: number, value: BandColor, setter: React.Dispatch<React.SetStateAction<BandColor>>) => {
    setter(value);
  };

  const renderBandSelectors = () => {
    const selectors = [];
    selectors.push(
      <div key="band1" className="space-y-1">
        <Label htmlFor="band1">Band 1 (1st Digit)</Label>
        <Select value={band1} onValueChange={(v) => bandSelect(1, v as BandColor, setBand1)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{digitColors.filter(c => c !== 'black' || numBands > 4).map(c => <SelectItem key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</SelectItem>)}</SelectContent>
        </Select>
      </div>
    );
    selectors.push(
      <div key="band2" className="space-y-1">
        <Label htmlFor="band2">Band 2 (2nd Digit)</Label>
        <Select value={band2} onValueChange={(v) => bandSelect(2, v as BandColor, setBand2)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{digitColors.map(c => <SelectItem key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</SelectItem>)}</SelectContent>
        </Select>
      </div>
    );

    if (numBands >= 5) {
      selectors.push(
        <div key="band3_digit" className="space-y-1">
          <Label htmlFor="band3_digit">Band 3 (3rd Digit)</Label>
          <Select value={band3} onValueChange={(v) => bandSelect(3, v as BandColor, setBand3)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{digitColors.map(c => <SelectItem key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      );
      selectors.push( // Multiplier
        <div key="band4_multiplier" className="space-y-1">
          <Label htmlFor="band4_multiplier">Band 4 (Multiplier)</Label>
          <Select value={band4} onValueChange={(v) => bandSelect(4, v as BandColor, setBand4)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{multiplierColors.map(c => <SelectItem key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      );
      selectors.push( // Tolerance
         <div key="band5_tolerance" className="space-y-1">
            <Label htmlFor="band5_tolerance">Band 5 (Tolerance)</Label>
            <Select value={band5} onValueChange={(v) => bandSelect(5, v as BandColor, setBand5)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{toleranceColors.map(c => <SelectItem key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</SelectItem>)}</SelectContent>
            </Select>
        </div>
      );
       if (numBands === 6) {
         selectors.push(
            <div key="band6_tempco" className="space-y-1">
                <Label htmlFor="band6_tempco">Band 6 (Temp. Coeff.)</Label>
                <Select value={band6} onValueChange={(v) => bandSelect(6, v as BandColor, setBand6)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{tempCoColors.map(c => <SelectItem key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</SelectItem>)}</SelectContent>
                </Select>
            </div>
         );
       }
    } else { // 4-band
      selectors.push( // Multiplier
        <div key="band3_multiplier" className="space-y-1">
          <Label htmlFor="band3_multiplier">Band 3 (Multiplier)</Label>
          <Select value={band3} onValueChange={(v) => bandSelect(3, v as BandColor, setBand3)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{multiplierColors.map(c => <SelectItem key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      );
      selectors.push( // Tolerance
         <div key="band4_tolerance" className="space-y-1">
            <Label htmlFor="band4_tolerance">Band 4 (Tolerance)</Label>
            <Select value={band4} onValueChange={(v) => bandSelect(4, v as BandColor, setBand4)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{toleranceColors.map(c => <SelectItem key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</SelectItem>)}</SelectContent>
            </Select>
        </div>
      );
    }
    return selectors;
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

      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="inline-block bg-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
            <Palette className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Resistor Color Code Calculator</CardTitle>
          <CardDescription>
            Select the color bands to determine the resistance value and tolerance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="numBands">Number of Bands</Label>
            <Select value={numBands.toString()} onValueChange={(v) => setNumBands(parseInt(v) as 4 | 5 | 6)}>
              <SelectTrigger className="h-11 text-base"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 Bands</SelectItem>
                <SelectItem value="5">5 Bands</SelectItem>
                <SelectItem value="6">6 Bands</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 items-end`}>
            {renderBandSelectors()}
          </div>

          <Button onClick={calculateResistance} size="lg" className="w-full transition-transform hover:scale-105">
             <Zap className="mr-2 h-5 w-5"/> Calculate Resistance
          </Button>

          <div className="mt-6 p-6 bg-muted/30 rounded-lg space-y-3">
            <h3 className="text-xl font-semibold text-center text-primary mb-2">Result:</h3>
            <div className="text-center text-lg">
              <p><strong>Resistance:</strong> {resistance || "N/A"}</p>
              <p><strong>Tolerance:</strong> {tolerance || "N/A"}</p>
              {numBands === 6 && tempCo && <p><strong>Temp. Coefficient:</strong> {tempCo}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
