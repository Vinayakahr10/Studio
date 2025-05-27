
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

export default function SmdResistorCalculatorPage() {
  const { toast } = useToast();
  const [smdCode, setSmdCode] = useState<string>('');
  const [codeType, setCodeType] = useState<SmdCodeType>('3-digit');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // EIA-96 uses letters
    setSmdCode(value);
    setError(null);
    setResult(null);
  };
  
  const handleCodeTypeChange = (value: SmdCodeType) => {
    setCodeType(value);
    setSmdCode(''); // Reset code on type change
    setError(null);
    setResult(null);
  }

  const calculateResistance = () => {
    setError(null);
    setResult(null);

    if (!smdCode.trim()) {
      setError("Please enter an SMD code.");
      return;
    }

    // Placeholder logic - actual SMD calculation is complex, especially EIA-96
    toast({
      title: "Calculation Placeholder",
      description: `Logic for ${codeType} code "${smdCode}" needs to be implemented.`,
    });
    
    // Example placeholder result:
    // setResult("10 kΩ (Example)"); 
    
    // Actual logic would go here based on codeType and smdCode
    // For 3-digit: "102" = 10 * 10^2 = 1000 Ohms = 1kOhm
    // For 4-digit: "1002" = 100 * 10^2 = 10000 Ohms = 10kOhm
    // For EIA-96: "01C" = 100 * 1000 = 100kOhm (01 is code for 100, C is multiplier 1000)
    
    // This is a simplified example and does not cover all SMD code types accurately.
    if (codeType === '3-digit' && /^\d{3}$/.test(smdCode)) {
        const d1 = parseInt(smdCode[0]);
        const d2 = parseInt(smdCode[1]);
        const m = parseInt(smdCode[2]);
        if(smdCode.includes('R')) {
            const parts = smdCode.split('R');
            if (parts.length === 2 && parts.every(p => /^\d*$/.test(p))) {
                setResult(`${parts[0]}.${parts[1]} Ω`);
                return;
            }
        } else if (!isNaN(d1) && !isNaN(d2) && !isNaN(m)) {
             const val = (d1 * 10 + d2) * Math.pow(10, m);
             setResult(formatResistance(val));
             return;
        }
    } else if (codeType === '4-digit' && /^\d{4}$/.test(smdCode)) {
        const d1 = parseInt(smdCode[0]);
        const d2 = parseInt(smdCode[1]);
        const d3 = parseInt(smdCode[2]);
        const m = parseInt(smdCode[3]);
         if(smdCode.includes('R')) {
            const parts = smdCode.split('R');
            if (parts.length === 2 && parts.every(p => /^\d*$/.test(p))) {
                 setResult(`${parts[0]}.${parts[1]} Ω`);
                 return;
            }
        } else if(!isNaN(d1) && !isNaN(d2) && !isNaN(d3) && !isNaN(m)) {
            const val = (d1 * 100 + d2*10 + d3) * Math.pow(10, m);
            setResult(formatResistance(val));
            return;
        }
    } else if (codeType === 'eia-96' && /^\d{2}[A-Z]$/.test(smdCode)) {
        // Basic EIA-96 example - very simplified
        // Actual EIA-96 is a lookup table for the first two digits
        // and a letter code for multiplier.
        setError("EIA-96 calculation is complex and not fully implemented in this placeholder.");
        setResult("EIA-96 (Partial Demo)");
        return;
    }

    setError("Invalid code format for selected type.");
  };

  const formatResistance = (ohms: number): string => {
    if (isNaN(ohms)) return "Invalid";
    if (ohms >= 1_000_000_000) return (ohms / 1_000_000_000).toFixed(2) + " GΩ";
    if (ohms >= 1_000_000) return (ohms / 1_000_000).toFixed(2) + " MΩ";
    if (ohms >= 1_000) return (ohms / 1_000).toFixed(2) + " kΩ";
    return ohms.toFixed(2) + " Ω";
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
                <SelectItem value="eia-96">EIA-96 (e.g., 01C, 22A) - Placeholder</SelectItem>
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
              maxLength={codeType === 'eia-96' ? 3 : 4}
            />
            <p className="text-xs text-muted-foreground">
              Enter the code found on the SMD resistor. 'R' can be used as a decimal point.
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
