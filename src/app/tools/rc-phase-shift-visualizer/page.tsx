
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Activity, TrendingUp, Zap, AlertTriangle, Settings, Calculator } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [resistor, setResistor] = useState<string>('1000'); // Ohms
  const [capacitor, setCapacitor] = useState<string>('1'); // microFarads
  const [signalFrequency, setSignalFrequency] = useState<string>('1000'); // Hertz
  const [numberOfStages, setNumberOfStages] = useState<string>('3'); // N for oscillator
  const [targetOscFreq, setTargetOscFreq] = useState<string>(''); // Target f_osc for R/C calculation

  const [cutoffFrequency, setCutoffFrequency] = useState<number>(0);
  const [phaseShift, setPhaseShift] = useState<number>(0); // degrees for the RC network
  const [outputGain, setOutputGain] = useState<number>(1); // gain of the RC network
  const [calculatedOscillationFrequency, setCalculatedOscillationFrequency] = useState<number>(0); // Actual f_osc from current R,C,N
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, allowFloat: boolean = true, isIntegerOnly: boolean = false) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const pattern = allowFloat ? /^\d*\.?\d*$/ : /^\d*$/;
    
    if (value === '') {
      setter('');
      setError(null);
      return;
    }

    if (pattern.test(value)) {
      if (isIntegerOnly) {
        const intVal = parseInt(value, 10);
        if (!isNaN(intVal) && intVal.toString() === value && intVal > 0) { // Ensure positive for N
          setter(value);
        } else if (value === '' || (parseInt(value, 10).toString() !== value && value !=='0')) { // Allow empty or partial valid int
           setter(value); // Let validation catch it later if still invalid
        } else if (intVal <=0) {
           setter(value); // Let validation catch it
        }
      } else {
        setter(value);
      }
      setError(null);
    }
  };
  
  useEffect(() => {
    setError(null);

    const R_val = parseFloat(resistor);
    const C_val_uF = parseFloat(capacitor);
    let f_signal_val = parseFloat(signalFrequency);
    const N_val = parseInt(numberOfStages, 10);

    // Reverted validation logic
    if (isNaN(R_val) || R_val <= 0 || isNaN(C_val_uF) || C_val_uF <= 0 || isNaN(N_val) || N_val <= 0) {
      setError("R, C, and N must be positive values greater than zero."); // Reverted error message
      setChartData([]); setCutoffFrequency(0); setPhaseShift(0); setOutputGain(0); setCalculatedOscillationFrequency(0);
      return;
    }
    
     if (isNaN(f_signal_val) || f_signal_val <= 0) {
        f_signal_val = 1; 
        setSignalFrequency("1"); 
    }

    const C_farads = C_val_uF * 1e-6; 
    const RC = R_val * C_farads;
    
    const fc = 1 / (2 * Math.PI * RC);
    setCutoffFrequency(isFinite(fc) ? fc : 0);

    const omega_signal = 2 * Math.PI * f_signal_val;
    
    const phi_rad_rc_network = -Math.atan(omega_signal * RC);
    const phi_deg_rc_network = phi_rad_rc_network * (180 / Math.PI);
    setPhaseShift(isFinite(phi_deg_rc_network) ? phi_deg_rc_network : 0);

    const gain_rc_network = 1 / Math.sqrt(1 + Math.pow(omega_signal * RC, 2));
    setOutputGain(isFinite(gain_rc_network) ? gain_rc_network : 0);
    
    // N_val is already validated by the check above for the main calculations
    // For f_osc, N_val will be > 0 here.
    const sqrt2N = Math.sqrt(2 * N_val);
    if (RC > 0 && sqrt2N > 0) { // N_val is >0 from the initial check
        const f_osc = 1 / (2 * Math.PI * RC * sqrt2N);
        setCalculatedOscillationFrequency(isFinite(f_osc) ? f_osc : 0);
    } else {
        setCalculatedOscillationFrequency(0); // Should not happen if R,C,N >0
    }


    const V_peak_input = 1;
    const numCycles = 3;
    const signalPeriod = isFinite(f_signal_val) && f_signal_val > 0 ? 1 / f_signal_val : 1;
    const timeEnd = isFinite(signalPeriod) ? numCycles * signalPeriod : numCycles;
    const numPoints = 200;
    const timeStep = isFinite(timeEnd) && numPoints > 0 ? timeEnd / numPoints : 0.01;
    
    const data = [];
    if (isFinite(omega_signal) && isFinite(timeStep) && isFinite(gain_rc_network) && isFinite(phi_rad_rc_network)) {
      for (let i = 0; i <= numPoints; i++) {
        const t = i * timeStep;
        let inputV = V_peak_input * Math.sin(omega_signal * t);
        
        let outputV_rc_filter = V_peak_input * gain_rc_network * Math.sin(omega_signal * t + phi_rad_rc_network);
        
        let outputV_inverted = -1 * outputV_rc_filter;


        data.push({
          time: parseFloat((t * 1000).toFixed(3)), 
          inputVoltage: isFinite(inputV) ? parseFloat(inputV.toFixed(4)) : 0,
          outputVoltage: isFinite(outputV_inverted) ? parseFloat(outputV_inverted.toFixed(4)) : 0,
        });
      }
    }
    setChartData(data);
    
  }, [resistor, capacitor, signalFrequency, numberOfStages]);

  const handleCalculateMissingComponent = () => {
    setError(null);
    const targetFreq_val = parseFloat(targetOscFreq);
    const N_val = parseInt(numberOfStages, 10);
    const current_R_val = parseFloat(resistor);
    const current_C_val_uF = parseFloat(capacitor);

    if (isNaN(targetFreq_val) || targetFreq_val <= 0) {
      setError("Please enter a valid positive Target Oscillation Frequency.");
      return;
    }
    if (isNaN(N_val) || N_val <= 0) {
      setError("Number of RC Stages (N) must be a positive integer greater than zero.");
      return;
    }

    const sqrt2N = Math.sqrt(2 * N_val);
    const twoPi_targetFreq_sqrt2N = 2 * Math.PI * targetFreq_val * sqrt2N;

    if (twoPi_targetFreq_sqrt2N === 0) {
        setError("Cannot calculate with zero target frequency or N stages.");
        return;
    }

    if (resistor === '' && capacitor !== '' && !isNaN(current_C_val_uF) && current_C_val_uF > 0) {
        const C_farads = current_C_val_uF * 1e-6;
        const calculated_R = 1 / (twoPi_targetFreq_sqrt2N * C_farads);
        if (isFinite(calculated_R) && calculated_R > 0) {
            setResistor(calculated_R.toPrecision(4));
            toast({ title: "Resistor Calculated", description: `R set to ${calculated_R.toPrecision(4)} Ω for target f_osc.` });
        } else {
            setError("Could not calculate a valid Resistor value. Check inputs.");
        }
    } else if (capacitor === '' && resistor !== '' && !isNaN(current_R_val) && current_R_val > 0) {
        const calculated_C_farads = 1 / (twoPi_targetFreq_sqrt2N * current_R_val);
        const calculated_C_uF = calculated_C_farads * 1e6;
         if (isFinite(calculated_C_uF) && calculated_C_uF > 0) {
            setCapacitor(calculated_C_uF.toPrecision(4));
            toast({ title: "Capacitor Calculated", description: `C set to ${calculated_C_uF.toPrecision(4)} µF for target f_osc.` });
        } else {
            setError("Could not calculate a valid Capacitor value. Check inputs.");
        }
    } else if (resistor !== '' && capacitor !== '') {
        setError("To calculate a missing component, please clear either the Resistor or Capacitor field.");
        toast({ title: "Input Error", description: "Clear R or C field to calculate its value for the target frequency.", variant: "destructive" });
    } else {
        setError("Provide Target f_osc, N, and either R or C to calculate the missing component.");
        toast({ title: "Insufficient Information", description: "Need Target f_osc, N, and one of R or C.", variant: "destructive" });
    }
  };


  const formatFrequency = (hz: number) => {
    if (isNaN(hz) || !isFinite(hz)) return "---"; 
    if (hz === 0 && calculatedOscillationFrequency === 0 && (parseInt(numberOfStages, 10) <=0 || isNaN(parseInt(numberOfStages, 10)))) return "---"; 
    if (hz === 0) return "0 Hz";


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
          
          <Card className="bg-background/70 dark:bg-muted/20 p-4 md:p-6 rounded-lg border shadow-sm">
            <CardHeader className="p-0 pb-4 mb-4 border-b">
              <CardTitle className="text-xl text-primary/90 flex items-center">
                <Settings className="mr-2 h-5 w-5"/>Input Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-muted-foreground border-b pb-1.5">Component Values</h4>
                <div className="space-y-2">
                  <Label htmlFor="resistor" className="text-base">Resistor (R) - Ohms</Label>
                  <Input id="resistor" type="text" value={resistor} onChange={handleInputChange(setResistor, true, false)} placeholder="e.g., 1000" className="h-10 text-base" inputMode="decimal"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacitor" className="text-base">Capacitor (C) - µF</Label>
                  <Input id="capacitor" type="text" value={capacitor} onChange={handleInputChange(setCapacitor, true, false)} placeholder="e.g., 1" className="h-10 text-base" inputMode="decimal"/>
                </div>
              </div>
              <div className="space-y-4">
                 <h4 className="text-md font-semibold text-muted-foreground border-b pb-1.5">Signal & Oscillator Config</h4>
                 <div className="space-y-2">
                  <Label htmlFor="signalFrequency" className="text-base">Signal Frequency (f_signal) - Hz</Label>
                  <Input id="signalFrequency" type="text" value={signalFrequency} onChange={handleInputChange(setSignalFrequency, true, false)} placeholder="e.g., 1000 Hz" className="h-10 text-base" inputMode="decimal"/>
                   <p className="text-xs text-muted-foreground">Input for waveform graph visualization.</p>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="numberOfStages" className="text-base">Number of RC Stages (N)</Label>
                  <Input id="numberOfStages" type="text" value={numberOfStages} onChange={handleInputChange(setNumberOfStages, false, true)} placeholder="e.g., 3" className="h-10 text-base" inputMode="numeric" pattern="\d*"/>
                   <p className="text-xs text-muted-foreground">For f_osc calculation (e.g., 3 or more).</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetOscFreq" className="text-base">Target Oscillation Freq. (f_osc_target) - Hz</Label>
                  <Input id="targetOscFreq" type="text" value={targetOscFreq} onChange={handleInputChange(setTargetOscFreq, true, false)} placeholder="e.g., 5000 (Optional)" className="h-10 text-base" inputMode="decimal"/>
                   <p className="text-xs text-muted-foreground">If set, clear R or C and click button below.</p>
                </div>
                <Button onClick={handleCalculateMissingComponent} variant="outline" className="w-full">
                    <Calculator className="mr-2 h-4 w-4"/> Calculate Missing R or C
                </Button>
              </div>
            </CardContent>
          </Card>


          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md text-center text-sm text-destructive flex items-center gap-2 justify-center">
              <AlertTriangle className="h-4 w-4"/> {error}
            </div>
          )}

          <Card className="bg-muted/20 p-6 rounded-lg">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl text-primary flex items-center">
                <Zap className="mr-2 h-5 w-5"/>Calculated Values (based on current R, C, N, f_signal)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-semibold">Single Stage Cutoff (fc):</p>
                <p className="font-mono text-primary">{formatFrequency(cutoffFrequency)}</p>
              </div>
              <div>
                <p className="font-semibold">Single Stage Phase Shift (ϕ) at {formatFrequency(parseFloat(signalFrequency))}:</p>
                <p className="font-mono text-primary">{phaseShift.toFixed(2)}°</p>
              </div>
              <div>
                <p className="font-semibold">Single Stage Gain (Vout/Vin):</p>
                <p className="font-mono text-primary">{outputGain.toFixed(3)}</p>
              </div>
              <div>
                <p className="font-semibold">Actual Osc. Freq. (f_osc) for {parseInt(numberOfStages, 10) > 0 ? parseInt(numberOfStages, 10) : 'N'} stage(s):</p>
                <p className="font-mono text-primary">{formatFrequency(calculatedOscillationFrequency)}</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <CardTitle className="text-xl mb-4 text-primary flex items-center">
                <TrendingUp className="mr-2 h-5 w-5"/>Voltage Waveforms (Single Stage Filter Response to f_signal)
            </CardTitle>
            {chartData.length > 0 && !error ? ( 
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
                <p className="text-muted-foreground">{error ? "Error in inputs. Please check values." : "Enter valid R, C, Frequency, and N to generate the chart."}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
