
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRightLeft, Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
} from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

interface IdealDiodeResults {
  diodeCurrentDisplay: string;
  diodeVoltageDisplay: string;
  resistorVoltageDisplay: string;
  // Raw values for charting
  diodeCurrentRaw: number;
  diodeVoltageRaw: number;
}

const chartConfig = {
  idealCurve: {
    label: 'Ideal Diode I-V Curve',
    color: 'hsl(var(--chart-1))',
  },
  operatingPoint: {
    label: 'Operating Point (Vd, Id)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function IdealDiodeCalculatorPage() {
  const { toast } = useToast();
  const [sourceVoltage, setSourceVoltage] = useState<string>(''); // Vs
  const [resistance, setResistance] = useState<string>(''); // R
  
  const [results, setResults] = useState<IdealDiodeResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [chartData, setChartData] = useState({
    idealCurveDataX: [] as Array<{vd: number, id: number}>,
    idealCurveDataY: [] as Array<{vd: number, id: number}>,
    operatingPointData: [] as Array<{vd: number, id: number, name: string}>,
  });


  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     if (/^-?\d*\.?\d*$/.test(value) || value === '') {
      setter(value);
      setError(null); 
      setResults(null);
      setChartData({ idealCurveDataX: [], idealCurveDataY: [], operatingPointData: [] });
    }
  };

  const formatCurrentForDisplay = (amps: number): string => {
    if (isNaN(amps) || !isFinite(amps)) return "---";
    if (Math.abs(amps) < 1e-3 && amps !== 0) return `${(amps * 1e3).toPrecision(3)} mA`;
    return `${amps.toPrecision(3)} A`;
  };
  
  const formatVoltageForDisplay = (volts: number): string => {
    if (isNaN(volts) || !isFinite(volts)) return "---";
    return `${volts.toFixed(2)} V`;
  }


  const calculateDiodeParameters = () => {
    setError(null);
    setResults(null);
    setChartData({ idealCurveDataX: [], idealCurveDataY: [], operatingPointData: [] });


    const vs_raw = parseFloat(sourceVoltage);
    const r_raw = parseFloat(resistance);

    if (isNaN(vs_raw) || isNaN(r_raw)) {
      setError("Please enter valid numeric values for Source Voltage and Resistance.");
      return;
    }

    if (r_raw <= 0) {
      setError("Resistance (R) must be a positive value greater than zero.");
      return;
    }

    let id_amps_raw: number;
    let vd_volts_raw: number;
    let vr_volts_raw: number;

    if (vs_raw > 0) { 
      id_amps_raw = vs_raw / r_raw;
      vd_volts_raw = 0; 
      vr_volts_raw = vs_raw;
    } else { 
      id_amps_raw = 0;
      vd_volts_raw = vs_raw; 
      vr_volts_raw = 0;
    }
    
    setResults({
      diodeCurrentDisplay: formatCurrentForDisplay(id_amps_raw),
      diodeVoltageDisplay: formatVoltageForDisplay(vd_volts_raw),
      resistorVoltageDisplay: formatVoltageForDisplay(vr_volts_raw),
      diodeCurrentRaw: id_amps_raw,
      diodeVoltageRaw: vd_volts_raw,
    });

    // Prepare chart data
    const maxCurrentGraph = Math.max(1, Math.abs(id_amps_raw) * 1.2, (vs_raw > 0 && r_raw > 0 ? vs_raw/r_raw : 1) * 1.2);
    const minVoltageGraph = Math.min(-1, vs_raw -1, -Math.abs(vs_raw || 5) -1);

    const newIdealCurveDataX = [ { vd: minVoltageGraph, id: 0 }, { vd: 0, id: 0 } ];
    const newIdealCurveDataY = [ { vd: 0, id: 0 }, { vd: 0, id: maxCurrentGraph } ];
    const newOperatingPointData = [{ vd: vd_volts_raw, id: id_amps_raw, name: 'Operating Point' }];
    
    setChartData({
        idealCurveDataX: newIdealCurveDataX,
        idealCurveDataY: newIdealCurveDataY,
        operatingPointData: newOperatingPointData
    });
    
    toast({
        title: "Calculation Complete",
        description: `Diode Current: ${formatCurrentForDisplay(id_amps_raw)}`,
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
            <ArrowRightLeft className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Ideal Diode Calculator</CardTitle>
          <CardDescription>
            Calculate current and voltage for an ideal diode in a series circuit with a resistor and voltage source.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="sourceVoltage">Source Voltage (Vs) - Volts</Label>
              <Input id="sourceVoltage" type="text" placeholder="e.g., 5 or -5" value={sourceVoltage} onChange={handleInputChange(setSourceVoltage)} className="h-10 text-base" inputMode="decimal" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="resistance">Series Resistance (R) - Ohms</Label>
              <Input id="resistance" type="text" placeholder="e.g., 1000" value={resistance} onChange={handleInputChange(setResistance)} className="h-10 text-base" inputMode="decimal" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}
          
          <Button onClick={calculateDiodeParameters} size="lg" className="w-full transition-transform hover:scale-105">
            <Zap className="mr-2 h-5 w-5"/> Calculate Parameters
          </Button>

          {results && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg space-y-3 border border-primary/20">
              <h3 className="text-xl font-semibold text-center text-primary mb-2">Calculated Values:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-base">
                 <p><strong>Diode Current (Id):</strong> {results.diodeCurrentDisplay}</p>
                 <p><strong>Diode Voltage (Vd):</strong> {results.diodeVoltageDisplay}</p>
                 <p className="sm:col-span-2"><strong>Resistor Voltage (Vr):</strong> {results.resistorVoltageDisplay}</p>
              </div>
               <p className="text-xs text-muted-foreground text-center pt-2">Note: Assumes an ideal diode. For positive Vs, forward bias is assumed. For Vs ≤ 0, reverse bias is assumed (or current flow is blocked).</p>
            
              <div className="mt-6">
                <CardTitle className="text-lg mb-4 text-primary flex items-center justify-center">
                    <TrendingUp className="mr-2 h-5 w-5"/>Ideal Diode I-V Characteristic
                </CardTitle>
                {chartData.operatingPointData.length > 0 && (
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                        <LineChart margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis 
                                type="number" 
                                dataKey="vd" 
                                name="Diode Voltage (Vd)" 
                                label={{ value: "Vd (Volts)", position: 'insideBottom', dy:10, fill: 'hsl(var(--muted-foreground))' }}
                                stroke="hsl(var(--muted-foreground))"
                                domain={['dataMin - 0.5', 'dataMax + 0.5']}
                                allowDataOverflow
                            />
                            <YAxis 
                                type="number" 
                                dataKey="id" 
                                name="Diode Current (Id)" 
                                label={{ value: "Id (Amps)", angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                                stroke="hsl(var(--muted-foreground))"
                                domain={['auto', 'auto']}
                                allowDataOverflow
                            />
                            <Tooltip content={<ChartTooltipContent indicator="dot" hideLabel />} cursor={{stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3'}}/>
                            <Legend verticalAlign="top" height={36} wrapperStyle={{color: 'hsl(var(--foreground))'}}/>
                            <Line 
                                type="linear" 
                                data={chartData.idealCurveDataX} 
                                dataKey="id" 
                                stroke={chartConfig.idealCurve.color} 
                                strokeWidth={2} 
                                name={chartConfig.idealCurve.label} 
                                dot={false} 
                                activeDot={false}
                            />
                            <Line 
                                type="linear" 
                                data={chartData.idealCurveDataY} 
                                dataKey="id" 
                                stroke={chartConfig.idealCurve.color} 
                                strokeWidth={2} 
                                name="_idealCurveY" // Hide from legend with underscore
                                dot={false}
                                activeDot={false}
                                legendType="none"
                            />
                             <Scatter 
                                name={chartConfig.operatingPoint.label} 
                                data={chartData.operatingPointData} 
                                fill={chartConfig.operatingPoint.color} 
                                shape="circle" 
                                r={5} 
                            />
                        </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    