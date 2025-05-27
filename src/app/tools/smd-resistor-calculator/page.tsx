
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Cpu, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type SmdCodeType = '3-digit' | '4-digit' | 'eia-96';

const eia96ValueMap: Record<string, number> = {
  '01': 100, '02': 102, '03': 105, '04': 107, '05': 110, '06': 113, '07': 115, '08': 118, '09': 121, '10': 124,
  '11': 127, '12': 130, '13': 133, '14': 137, '15': 140, '16': 143, '17': 147, '18': 150, '19': 154, '20': 158,
  '21': 162, '22': 165, '23': 169, '24': 174, '25': 178, '26': 182, '27': 187, '28': 191, '29': 196, '30': 200,
  '31': 205, '32': 210, '33': 215, '34': 221, '35': 226, '36': 232, '37': 237, '38': 243, '39': 249, '40': 255,
  '41': 261, '42': 267, '43': 274, '44': 280, '45': 287, '46': 294, '47': 301, '48': 309, '49': 316, '50': 324,
  '51': 332, '52': 340, '53': 348, '54': 357, '55': 365, '56': 374, '57': 383, '58': 392, '59': 402, '60': 412,
  '61': 422, '62': 432, '63': 442, '64': 453, '65': 464, '66': 475, '67': 487, '68': 499, '69': 511, '70': 523,
  '71': 536, '72': 549, '73': 562, '74': 576, '75': 590, '76': 604, '77': 619, '78': 634, '79': 649, '80': 665,
  '81': 681, '82': 698, '83': 715, '84': 732, '85': 750, '86': 768, '87': 787, '88': 806, '89': 825, '90': 845,
  '91': 866, '92': 887, '93': 909, '94': 931, '95': 953, '96': 976,
};

const eia96MultiplierMap: Record<string, number> = {
  'Z': 0.001, 'Y': 0.01, 'X': 0.1, 'A': 1, 'B': 10, 'C': 100, 'D': 1000, 'E': 10000, 'F': 100000, 'G': 1000000, 'H':10000000
};


export default function SmdResistorCalculatorPage() {
  const { toast } = useToast();
  const [smdCode, setSmdCode] = useState<string>('');
  const [codeType, setCodeType] = useState<SmdCodeType>('3-digit');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    if (codeType === 'eia-96') {
      value = value.replace(/[^0-9A-Z]/gi, ''); // Allow digits and letters for EIA-96
    } else {
      value = value.replace(/[^0-9R]/gi, ''); // Allow digits and 'R' for 3/4-digit
    }
    setSmdCode(value);
    setError(null);
    setResult(null);
  };
  
  const handleCodeTypeChange = (value: SmdCodeType) => {
    setCodeType(value);
    setSmdCode('');
    setError(null);
    setResult(null);
  }

  const formatResistance = (ohms: number | null): string => {
    if (ohms === null || isNaN(ohms)) return "Invalid Code";
    if (ohms < 0) return "Invalid Code (Negative resistance)";

    if (ohms >= 1_000_000_000) return (ohms / 1_000_000_000).toPrecision(3) + " GΩ";
    if (ohms >= 1_000_000) return (ohms / 1_000_000).toPrecision(3) + " MΩ";
    if (ohms >= 1_000) return (ohms / 1_000).toPrecision(3) + " kΩ";
    if (ohms < 1 && ohms > 0) return ohms.toPrecision(3) + " Ω";
    return ohms.toFixed(ohms % 1 === 0 ? 0 : 2) + " Ω"; // Show decimals only if needed
  };

  const calculateResistance = () => {
    setError(null);
    setResult(null);
    let calculatedOhms: number | null = null;

    if (!smdCode.trim()) {
      setError("Please enter an SMD code.");
      return;
    }

    if (codeType === '3-digit') {
      if (smdCode.includes('R')) {
        const parts = smdCode.split('R');
        if (parts.length === 2 && parts.every(p => /^\d*$/.test(p)) && (parts[0].length > 0 || parts[1].length > 0)) {
          calculatedOhms = parseFloat(parts.join('.'));
        } else {
          setError("Invalid 3-digit 'R' notation. Use format like '4R7' or 'R22'."); return;
        }
      } else if (/^\d{3}$/.test(smdCode)) {
        const d1 = parseInt(smdCode[0]);
        const d2 = parseInt(smdCode[1]);
        const m = parseInt(smdCode[2]);
        calculatedOhms = (d1 * 10 + d2) * Math.pow(10, m);
      } else {
        setError("Invalid 3-digit code. Must be 3 digits or use 'R' notation."); return;
      }
    } else if (codeType === '4-digit') {
      if (smdCode.includes('R')) {
        const parts = smdCode.split('R');
         if (parts.length === 2 && parts.every(p => /^\d*$/.test(p)) && (parts[0].length > 0 || parts[1].length > 0)) {
          calculatedOhms = parseFloat(parts.join('.'));
        } else {
          setError("Invalid 4-digit 'R' notation. Use format like '47R0' or '2R20'."); return;
        }
      } else if (/^\d{4}$/.test(smdCode)) {
        const d1 = parseInt(smdCode[0]);
        const d2 = parseInt(smdCode[1]);
        const d3 = parseInt(smdCode[2]);
        const m = parseInt(smdCode[3]);
        calculatedOhms = (d1 * 100 + d2 * 10 + d3) * Math.pow(10, m);
      } else {
        setError("Invalid 4-digit code. Must be 4 digits or use 'R' notation."); return;
      }
    } else if (codeType === 'eia-96') {
      if (/^(\d{2})([A-Z])$/.test(smdCode)) {
        const valueCode = smdCode.substring(0, 2);
        const multiplierCode = smdCode.substring(2, 3);
        const significantValue = eia96ValueMap[valueCode];
        const multiplier = eia96MultiplierMap[multiplierCode];

        if (significantValue !== undefined && multiplier !== undefined) {
          calculatedOhms = significantValue * multiplier;
        } else {
          setError("Invalid EIA-96 code. Check value or multiplier character."); return;
        }
      } else {
        setError("Invalid EIA-96 code format. Must be 2 digits followed by a letter (e.g., 01C)."); return;
      }
    }

    if (calculatedOhms !== null && !isNaN(calculatedOhms)) {
      setResult(formatResistance(calculatedOhms));
      toast({ title: "Calculation Complete", description: `Resistance: ${formatResistance(calculatedOhms)}` });
    } else if (!error) { // If no specific error was set, but calculation failed
        setError("Could not calculate resistance. Check code and type.");
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
            <Cpu className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">SMD Resistor Code Calculator</CardTitle>
          <CardDescription>
            Decode Surface Mount Device (SMD) resistor codes to find their resistance value.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="codeType">Code Type</Label>
            <Select value={codeType} onValueChange={(value) => handleCodeTypeChange(value as SmdCodeType)}>
              <SelectTrigger id="codeType" className="h-11 text-base">
                <SelectValue placeholder="Select SMD code type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-digit">3-Digit (e.g., 102, 4R7)</SelectItem>
                <SelectItem value="4-digit">4-Digit (e.g., 1002, 47R0)</SelectItem>
                <SelectItem value="eia-96">EIA-96 (e.g., 01C, 22A)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="smdCode">SMD Code</Label>
            <Input 
              id="smdCode" 
              type="text" 
              placeholder={
                codeType === '3-digit' ? "e.g., 472 or 2R2" :
                codeType === '4-digit' ? "e.g., 1001 or 82R0" :
                "e.g., 01A or 43C"
              }
              value={smdCode} 
              onChange={handleInputChange} 
              className="h-11 text-base font-mono tracking-wider"
              maxLength={codeType === 'eia-96' ? 3 : (codeType === '3-digit' ? 3 : 4)}
            />
            <p className="text-xs text-muted-foreground">
              Enter the code on the SMD resistor. 'R' can be a decimal point for 3/4-digit codes. EIA-96 is 2 digits then a letter.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4" /> {error}
            </div>
          )}

          <Button onClick={calculateResistance} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5" /> Calculate Resistance
          </Button>

          {result && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <h3 className="text-lg font-semibold text-center text-primary mb-1">Calculated Resistance:</h3>
              <p className="text-center text-2xl font-mono font-bold tracking-wide">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
