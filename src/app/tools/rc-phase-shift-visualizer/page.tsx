
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Activity, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'; // Assuming ChartTooltipContent is correctly exported

const chartConfig = {
  inputVoltage: {
    label: 'Input Voltage (Vin)',
    color: 'hsl(var(--chart-1))',
  },
  outputVoltage: {
    label: 'Output Voltage (Vout)',
    color: 'hsl(var(--chart-2))',
  },
};

export default function RcPhaseShiftVisualizerPage() {
  const [resistor, setResistor] = useState<number>(1000); // Ohms
  const [capacitor, setCapacitor] = useState<number>(1); // microFarads
  const [signalFrequency, setSignalFrequency] = useState<number>(1000); // Hertz

  const [cutoffFrequency, setCutoffFrequency] = useState<number>(0);
  const [phaseShift, setPhaseShift] = useState<number>(0); // degrees
  const [outputGain, setOutputGain] = useState<number>(1);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleResistorChange = (value: number[]) => {
    setResistor(value[0]);
  };

  const handleCapacitorChange = (value: number[]) => {
    setCapacitor(value[0]);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSignalFrequency(val > 0 ? val : 1); // Prevent 0 or negative frequency
  };

  useEffect(() => {
    const R = resistor;
    const C_farads = capacitor * 1e-6; // Convert µF to F
    const f_signal = signalFrequency;

    if (R > 0 && C_farads > 0 && f_signal > 0) {
      // Calculate Cutoff Frequency
      const fc = 1 / (2 * Math.PI * R * C_farads);
      setCutoffFrequency(fc);

      // Calculate Angular Frequency of signal
      const omega_signal = 2 * Math.PI * f_signal;
      const RC = R * C_farads;

      // Calculate Phase Shift
      const phi_rad = -Math.atan(omega_signal * RC);
      const phi_deg = phi_rad * (180 / Math.PI);
      setPhaseShift(phi_deg);

      // Calculate Gain (Magnitude of Transfer Function H(jω))
      const gain = 1 / Math.sqrt(1 + Math.pow(omega_signal * RC, 2));
      setOutputGain(gain);

      // Generate Chart Data
      const V_peak_input = 1; // Assume 1V peak input for simplicity
      const numCycles = 3; // Number of cycles to display
      const signalPeriod = 1 / f_signal;
      const timeEnd = numCycles * signalPeriod;
      const numPoints = 200; // Number of data points for the chart
      const timeStep = timeEnd / numPoints;
      
      const data = [];
      for (let i = 0; i <= numPoints; i++) {
        const t = i * timeStep;
        const inputV = V_peak_input * Math.sin(omega_signal * t);
        const outputV = V_peak_input * gain * Math.sin(omega_signal * t + phi_rad);
        data.push({
          time: parseFloat((t * 1000).toFixed(3)), // Time in ms for better readability
          inputVoltage: parseFloat(inputV.toFixed(4)),
          outputVoltage: parseFloat(outputV.toFixed(4)),
        });
      }
      setChartData(data);
    } else {
      setCutoffFrequency(0);
      setPhaseShift(0);
      setOutputGain(0);
      setChartData([]);
    }
  }, [resistor, capacitor, signalFrequency]);

  const formatFrequency = (hz: number) => {
    if (hz >= 1e6) return `${(hz / 1e6).toFixed(2)} MHz`;
    if (hz >= 1e3) return `${(hz / 1e3).toFixed(2)} kHz`;
    return `${hz.toFixed(2)} Hz`;
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

      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <div className="inline-block bg-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
            <Activity className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">RC Circuit Phase Shift Visualizer</CardTitle>
          <CardDescription>
            Visualize phase shift and cutoff frequency in an RC low-pass filter circuit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-3">
              <Label htmlFor="resistor" className="text-base">Resistor (R): {resistor} Ω</Label>
              <Slider
                id="resistor"
                min={100}
                max={10000}
                step={100}
                value={[resistor]}
                onValueChange={handleResistorChange}
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="capacitor" className="text-base">Capacitor (C): {capacitor} µF</Label>
              <Slider
                id="capacitor"
                min={0.1}
                max={10}
                step={0.1}
                value={[capacitor]}
                onValueChange={handleCapacitorChange}
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="frequency" className="text-base">Signal Frequency (f):</Label>
              <Input
                id="frequency"
                type="number"
                value={signalFrequency}
                onChange={handleFrequencyChange}
                placeholder="e.g., 1000 Hz"
                className="h-10 text-base"
                min="1"
              />
               <p className="text-xs text-muted-foreground">Enter frequency in Hertz (Hz).</p>
            </div>
          </div>

          <Card className="bg-muted/20 p-6 rounded-lg">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl text-primary flex items-center">
                <Zap className="mr-2 h-5 w-5"/>Calculated Values
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold">Cutoff Frequency (fc):</p>
                <p className="font-mono text-primary">{formatFrequency(cutoffFrequency)}</p>
              </div>
              <div>
                <p className="font-semibold">Phase Shift (ϕ) at {formatFrequency(signalFrequency)}:</p>
                <p className="font-mono text-primary">{phaseShift.toFixed(2)}°</p>
              </div>
              <div>
                <p className="font-semibold">Output Gain (Vout/Vin):</p>
                <p className="font-mono text-primary">{outputGain.toFixed(3)}</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <CardTitle className="text-xl mb-4 text-primary flex items-center">
                <TrendingUp className="mr-2 h-5 w-5"/>Voltage Waveforms
            </CardTitle>
            {chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5, right: 20, left: -10, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                        dataKey="time" 
                        type="number" 
                        label={{ value: "Time (ms)", position: "insideBottomRight", offset: -5, fill: 'hsl(var(--muted-foreground))' }} 
                        stroke="hsl(var(--muted-foreground))"
                        tickFormatter={(value) => `${value.toFixed(1)}`}
                    />
                    <YAxis 
                        label={{ value: "Voltage (V)", angle: -90, position: "insideLeft", fill: 'hsl(var(--muted-foreground))' }} 
                        stroke="hsl(var(--muted-foreground))"
                        domain={[-1.1, 1.1]} // Fixed domain for 1V peak input
                        ticks={[-1, -0.5, 0, 0.5, 1]}
                    />
                    <Tooltip content={<ChartTooltipContent hideIndicator />} cursor={{stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3'}} />
                    <Legend verticalAlign="top" height={36} iconSize={12} wrapperStyle={{color: 'hsl(var(--foreground))'}} />
                    <Line
                      type="monotone"
                      dataKey="inputVoltage"
                      stroke={chartConfig.inputVoltage.color}
                      strokeWidth={2}
                      dot={false}
                      name="Input Voltage (Vin)"
                    />
                    <Line
                      type="monotone"
                      dataKey="outputVoltage"
                      stroke={chartConfig.outputVoltage.color}
                      strokeWidth={2}
                      dot={false}
                      name="Output Voltage (Vout)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-[400px] w-full flex items-center justify-center bg-muted/30 rounded-md">
                <p className="text-muted-foreground">Adjust R, C, or Frequency to generate the chart.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
