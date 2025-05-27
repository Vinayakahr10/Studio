
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Activity, TrendingUp, Zap, AlertTriangle } from 'lucide-react';
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
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  inputVoltage: {
    label: 'Input Voltage (Vin)',
    color: 'hsl(var(--chart-1))',
  },
  outputVoltage: {
    label: 'Output Voltage (Vout - Inverted)',
    color: 'hsl(var(--chart-2))',
  },
};

export default function RcPhaseShiftVisualizerPage() {
  const [resistor, setResistor] = useState<number>(1000); // Ohms
  const [capacitor, setCapacitor] = useState<number>(1); // microFarads
  const [signalFrequency, setSignalFrequency] = useState<number>(1000); // Hertz
  const [numberOfStages, setNumberOfStages] = useState<number>(3); // N for oscillator

  const [cutoffFrequency, setCutoffFrequency] = useState<number>(0);
  const [phaseShift, setPhaseShift] = useState<number>(0); // degrees for the RC network
  const [outputGain, setOutputGain] = useState<number>(1); // gain of the RC network
  const [calculatedOscillationFrequency, setCalculatedOscillationFrequency] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleResistorChange = (value: number[]) => {
    setResistor(value[0]);
    setError(null);
  };

  const handleCapacitorChange = (value: number[]) => {
    setCapacitor(value[0]);
    setError(null);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val) || val <= 0) {
      val = 1; // Default to 1 Hz if input is invalid or zero
    }
    setSignalFrequency(val);
    setError(null);
  };

  const handleNumberOfStagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) { // N must be at least 1
        val = 1; 
    }
    setNumberOfStages(val);
    setError(null);
  };

  useEffect(() => {
    setError(null);
    const R = resistor;
    const C_farads = capacitor * 1e-6; // Convert µF to F
    const f_signal = signalFrequency > 0 ? signalFrequency : 1; // Ensure positive frequency
    const N = numberOfStages > 0 ? numberOfStages : 1; // Ensure N is positive

    if (R > 0 && C_farads > 0) {
      // Calculate Cutoff Frequency for the single RC network
      const fc = 1 / (2 * Math.PI * R * C_farads);
      setCutoffFrequency(fc);

      // Calculate Angular Frequency of signal
      const omega_signal = 2 * Math.PI * f_signal;
      const RC = R * C_farads;

      // Calculate Phase Shift for the single RC network (radians and degrees)
      const phi_rad_rc_network = -Math.atan(omega_signal * RC);
      const phi_deg_rc_network = phi_rad_rc_network * (180 / Math.PI);
      setPhaseShift(phi_deg_rc_network);

      // Calculate Gain (Magnitude of Transfer Function H(jω)) for the single RC network
      const gain_rc_network = 1 / Math.sqrt(1 + Math.pow(omega_signal * RC, 2));
      setOutputGain(gain_rc_network);
      
      // Calculate Oscillation Frequency for N-stage RC phase-shift oscillator
      if (N > 0) {
        const sqrt2N = Math.sqrt(2 * N);
        if (RC > 0 && sqrt2N > 0) {
            const f_osc = 1 / (2 * Math.PI * RC * sqrt2N);
            setCalculatedOscillationFrequency(f_osc);
        } else {
            setCalculatedOscillationFrequency(0);
        }
      } else {
        setCalculatedOscillationFrequency(0);
      }


      // Generate Chart Data for single stage response
      const V_peak_input = 1; // Assume 1V peak input for simplicity
      const numCycles = 3; // Number of cycles to display
      const signalPeriod = 1 / f_signal;
      const timeEnd = numCycles * signalPeriod;
      const numPoints = 200; // Number of data points for the chart
      const timeStep = timeEnd / numPoints;
      
      const data = [];
      for (let i = 0; i <= numPoints; i++) {
        const t = i * timeStep;
        let inputV = V_peak_input * Math.sin(omega_signal * t);
        let outputV_rc_filter = V_peak_input * gain_rc_network * Math.sin(omega_signal * t + phi_rad_rc_network);
        let outputV_inverted = -1 * outputV_rc_filter;

        data.push({
          time: parseFloat((t * 1000).toFixed(3)) || 0, // Time in ms
          inputVoltage: isFinite(inputV) ? parseFloat(inputV.toFixed(4)) : 0,
          outputVoltage: isFinite(outputV_inverted) ? parseFloat(outputV_inverted.toFixed(4)) : 0,
        });
      }
      setChartData(data);
    } else {
      setCutoffFrequency(0);
      setPhaseShift(0);
      setOutputGain(0);
      setCalculatedOscillationFrequency(0);
      setChartData([]);
      if (R <= 0 || capacitor <= 0 ) {
        setError("Resistor and Capacitor values must be positive.");
      }
    }
  }, [resistor, capacitor, signalFrequency, numberOfStages]);

  const formatFrequency = (hz: number) => {
    if (isNaN(hz) || !isFinite(hz) || hz <= 0) return "---";
    if (hz >= 1e6) return `${(hz / 1e6).toPrecision(3)} MHz`;
    if (hz >= 1e3) return `${(hz / 1e3).toPrecision(3)} kHz`;
    return `${hz.toPrecision(3)} Hz`;
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
          <CardTitle className="text-3xl">RC Circuit Phase Shift Visualizer & Oscillator Calculator</CardTitle>
          <CardDescription>
            Visualize phase shift in a passive RC low-pass filter and calculate theoretical oscillation frequency for an N-stage RC oscillator.
            The graphed output waveform is shown inverted (180° shift) for contexts like an inverting amplifier stage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
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
              <Label htmlFor="capacitor" className="text-base">Capacitor (C): {capacitor.toFixed(1)} µF</Label>
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
              <Label htmlFor="frequency" className="text-base">Signal Frequency (f_signal):</Label>
              <Input
                id="frequency"
                type="number"
                value={signalFrequency}
                onChange={handleFrequencyChange}
                placeholder="e.g., 1000 Hz"
                className="h-10 text-base"
                min="1"
              />
               <p className="text-xs text-muted-foreground">Input for waveform graph (Hz).</p>
            </div>
             <div className="space-y-3">
              <Label htmlFor="numberOfStages" className="text-base">Number of RC Stages (N):</Label>
              <Input
                id="numberOfStages"
                type="number"
                value={numberOfStages}
                onChange={handleNumberOfStagesChange}
                placeholder="e.g., 3"
                className="h-10 text-base"
                min="1"
              />
               <p className="text-xs text-muted-foreground">For oscillator frequency calculation.</p>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}

          <Card className="bg-muted/20 p-6 rounded-lg">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl text-primary flex items-center">
                <Zap className="mr-2 h-5 w-5"/>Calculated Values
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-semibold">Single Stage Cutoff (fc):</p>
                <p className="font-mono text-primary">{formatFrequency(cutoffFrequency)}</p>
              </div>
              <div>
                <p className="font-semibold">Single Stage Phase Shift (ϕ) at {formatFrequency(signalFrequency)}:</p>
                <p className="font-mono text-primary">{phaseShift.toFixed(2)}°</p>
              </div>
              <div>
                <p className="font-semibold">Single Stage Gain (Vout/Vin):</p>
                <p className="font-mono text-primary">{outputGain.toFixed(3)}</p>
              </div>
              <div>
                <p className="font-semibold">Oscillator Freq. (f_osc) for {numberOfStages} stage(s):</p>
                <p className="font-mono text-primary">{formatFrequency(calculatedOscillationFrequency)}</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <CardTitle className="text-xl mb-4 text-primary flex items-center">
                <TrendingUp className="mr-2 h-5 w-5"/>Voltage Waveforms (Single Stage Filter Response)
            </CardTitle>
            {chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5, right: 30, left: 0, bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                        dataKey="time" 
                        type="number" 
                        label={{ value: "Time (ms)", position: "insideBottom", dy:10, fill: 'hsl(var(--muted-foreground))' }} 
                        stroke="hsl(var(--muted-foreground))"
                        tickFormatter={(value) => `${value.toFixed(1)}`}
                        domain={['dataMin', 'dataMax']}
                    />
                    <YAxis 
                        label={{ value: "Voltage (V)", angle: -90, position: "insideLeft", fill: 'hsl(var(--muted-foreground))' }} 
                        stroke="hsl(var(--muted-foreground))"
                        type="number"
                        domain={[-1.1, 1.1]} 
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
                      name={chartConfig.inputVoltage.label}
                    />
                    <Line
                      type="monotone"
                      dataKey="outputVoltage"
                      stroke={chartConfig.outputVoltage.color}
                      strokeWidth={2}
                      dot={false}
                      name={chartConfig.outputVoltage.label}
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

