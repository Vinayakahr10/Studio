
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ColorSpec {
  name: string;
  id: ResistorBandColor;
  hex: string;
  digit?: number;
  multiplier?: number;
  multiplierVal?: number; // For display like x10^0
  tolerance?: number;
  tempCo?: number; // ppm/°C
}

type ResistorBandColor = 
  | 'black' | 'brown' | 'red' | 'orange' | 'yellow' 
  | 'green' | 'blue' | 'violet' | 'gray' | 'white' 
  | 'gold' | 'silver' | 'none' | 'pink'; // Added pink as per prompt implying it in tolerance

const colorData: ColorSpec[] = [
  { name: 'Black', id: 'black', hex: '#000000', digit: 0, multiplier: 1, multiplierVal: 0, tempCo: 250 },
  { name: 'Brown', id: 'brown', hex: '#A52A2A', digit: 1, multiplier: 10, multiplierVal: 1, tolerance: 1, tempCo: 100 },
  { name: 'Red', id: 'red', hex: '#FF0000', digit: 2, multiplier: 100, multiplierVal: 2, tolerance: 2, tempCo: 50 },
  { name: 'Orange', id: 'orange', hex: '#FFA500', digit: 3, multiplier: 1000, multiplierVal: 3, tempCo: 15 },
  { name: 'Yellow', id: 'yellow', hex: '#FFFF00', digit: 4, multiplier: 10000, multiplierVal: 4, tempCo: 25 },
  { name: 'Green', id: 'green', hex: '#008000', digit: 5, multiplier: 100000, multiplierVal: 5, tolerance: 0.5, tempCo: 20 },
  { name: 'Blue', id: 'blue', hex: '#0000FF', digit: 6, multiplier: 1000000, multiplierVal: 6, tolerance: 0.25, tempCo: 10 },
  { name: 'Violet', id: 'violet', hex: '#EE82EE', digit: 7, multiplier: 10000000, multiplierVal: 7, tolerance: 0.1, tempCo: 5 },
  { name: 'Gray', id: 'gray', hex: '#808080', digit: 8, multiplier: 100000000, multiplierVal: 8, tolerance: 0.05, tempCo: 1 },
  { name: 'White', id: 'white', hex: '#FFFFFF', digit: 9, multiplier: 1000000000, multiplierVal: 9, tempCo: 1 },
  { name: 'Gold', id: 'gold', hex: '#FFD700', multiplier: 0.1, multiplierVal: -1, tolerance: 5 },
  { name: 'Silver', id: 'silver', hex: '#C0C0C0', multiplier: 0.01, multiplierVal: -2, tolerance: 10 },
  { name: 'Pink', id: 'pink', hex: '#FFC0CB', tolerance: 0 }, // Example for pink, not standard EIA for tolerance. Usually Gold/Silver/None. For this example assuming it's placeholder for a value.
  { name: 'None', id: 'none', hex: 'transparent', tolerance: 20 },
];

const getColorSpec = (id: ResistorBandColor): ColorSpec | undefined => colorData.find(c => c.id === id);

type BandType = 'digit' | 'multiplier' | 'tolerance' | 'tempCo';

interface BandDefinition {
  type: BandType;
  label: string; // For table header
  colorStateSetter: React.Dispatch<React.SetStateAction<ResistorBandColor>>;
  currentColor: ResistorBandColor;
  validColors: ResistorBandColor[];
}

export default function ResistorColorCodeCalculatorPage() {
  const [numBands, setNumBands] = useState<3 | 4 | 5 | 6>(4);
  
  const [band1Color, setBand1Color] = useState<ResistorBandColor>('brown');
  const [band2Color, setBand2Color] = useState<ResistorBandColor>('black');
  const [band3Color, setBand3Color] = useState<ResistorBandColor>('red'); // Digit for 5/6, Multiplier for 3/4
  const [band4Color, setBand4Color] = useState<ResistorBandColor>('gold'); // Multiplier for 5/6, Tolerance for 4
  const [band5Color, setBand5Color] = useState<ResistorBandColor>('gold'); // Tolerance for 5/6
  const [band6Color, setBand6Color] = useState<ResistorBandColor>('brown'); // TempCo for 6

  const [resistanceResult, setResistanceResult] = useState<string>('');
  const [activeBandConfig, setActiveBandConfig] = useState<number>(1); // 1-indexed band user is currently configuring

  const digitColors = colorData.filter(c => c.digit !== undefined).map(c => c.id);
  const multiplierColors = colorData.filter(c => c.multiplier !== undefined).map(c => c.id);
  const toleranceColors = colorData.filter(c => c.tolerance !== undefined).map(c => c.id);
  const tempCoColors = colorData.filter(c => c.tempCo !== undefined).map(c => c.id);

  const bandSetters = [setBand1Color, setBand2Color, setBand3Color, setBand4Color, setBand5Color, setBand6Color];
  const bandColors = [band1Color, band2Color, band3Color, band4Color, band5Color, band6Color];
  
  const bandDefinitions = useMemo((): BandDefinition[] => {
    const defs: Partial<Record<number, { type: BandType, label: string, validColors: ResistorBandColor[] }>> = {};
    
    defs[1] = { type: 'digit', label: 'Band 1 (1st)', validColors: digitColors.filter(c => c !== 'black' || numBands > 4) }; // Black not allowed for 1st band in 4 band usually
    defs[2] = { type: 'digit', label: 'Band 2 (2nd)', validColors: digitColors };

    if (numBands === 3) {
      defs[3] = { type: 'multiplier', label: 'Multiplier', validColors: multiplierColors };
      // Implicit tolerance of +/-20% (None) for 3-band
    } else if (numBands === 4) {
      defs[3] = { type: 'multiplier', label: 'Multiplier', validColors: multiplierColors };
      defs[4] = { type: 'tolerance', label: 'Tolerance', validColors: toleranceColors };
    } else if (numBands === 5) {
      defs[3] = { type: 'digit', label: 'Band 3 (3rd)', validColors: digitColors };
      defs[4] = { type: 'multiplier', label: 'Multiplier', validColors: multiplierColors };
      defs[5] = { type: 'tolerance', label: 'Tolerance', validColors: toleranceColors };
    } else if (numBands === 6) {
      defs[3] = { type: 'digit', label: 'Band 3 (3rd)', validColors: digitColors };
      defs[4] = { type: 'multiplier', label: 'Multiplier', validColors: multiplierColors };
      defs[5] = { type: 'tolerance', label: 'Tolerance', validColors: toleranceColors };
      defs[6] = { type: 'tempCo', label: 'Temp. Coeff.', validColors: tempCoColors };
    }
    
    return Array.from({ length: numBands }, (_, i) => ({
      ...defs[i + 1]!,
      colorStateSetter: bandSetters[i],
      currentColor: bandColors[i],
    }));
  }, [numBands, band1Color, band2Color, band3Color, band4Color, band5Color, band6Color]);


  useEffect(() => {
    // Reset colors when numBands changes to avoid invalid states
    setBand1Color(getColorSpec(bandDefinitions[0]?.validColors[1] || 'brown')?.id || 'brown'); // default to brown or first valid
    setBand2Color(getColorSpec(bandDefinitions[1]?.validColors[0] || 'black')?.id || 'black'); // default to black
    if (numBands >= 3) setBand3Color(getColorSpec(bandDefinitions[2]?.validColors[2] || 'red')?.id || 'red');
    if (numBands >= 4) setBand4Color(getColorSpec(bandDefinitions[3]?.validColors.includes('gold') ? 'gold' : bandDefinitions[3]?.validColors[0] || 'gold')?.id || 'gold');
    if (numBands >= 5) setBand5Color(getColorSpec(bandDefinitions[4]?.validColors.includes('gold') ? 'gold' : bandDefinitions[4]?.validColors[0] || 'gold')?.id || 'gold');
    if (numBands >= 6) setBand6Color(getColorSpec(bandDefinitions[5]?.validColors[0] || 'brown')?.id || 'brown');
    setActiveBandConfig(1);
  }, [numBands]);


  useEffect(() => {
    let value = 0;
    let multiplier = 1;
    let toleranceVal: number | null = null;
    let tempCoVal: number | null = null;

    const b1Spec = getColorSpec(band1Color);
    const b2Spec = getColorSpec(band2Color);
    let b3Spec: ColorSpec | undefined, 
        b4Spec: ColorSpec | undefined, 
        b5Spec: ColorSpec | undefined, 
        b6Spec: ColorSpec | undefined;

    if (b1Spec?.digit === undefined || b2Spec?.digit === undefined) {
      setResistanceResult('Invalid band colors');
      return;
    }
    
    value = b1Spec.digit * 10 + b2Spec.digit;

    if (numBands === 3) {
      b3Spec = getColorSpec(band3Color); // Multiplier
      if (b3Spec?.multiplier === undefined) { setResistanceResult('Invalid multiplier'); return; }
      multiplier = b3Spec.multiplier;
      toleranceVal = 20; // Default for 3-band
    } else if (numBands === 4) {
      b3Spec = getColorSpec(band3Color); // Multiplier
      b4Spec = getColorSpec(band4Color); // Tolerance
      if (b3Spec?.multiplier === undefined) { setResistanceResult('Invalid multiplier'); return; }
      multiplier = b3Spec.multiplier;
      if (b4Spec?.tolerance === undefined) { setResistanceResult('Invalid tolerance'); return; }
      toleranceVal = b4Spec.tolerance;
    } else if (numBands === 5) {
      b3Spec = getColorSpec(band3Color); // 3rd Digit
      b4Spec = getColorSpec(band4Color); // Multiplier
      b5Spec = getColorSpec(band5Color); // Tolerance
      if (b3Spec?.digit === undefined) { setResistanceResult('Invalid 3rd digit'); return; }
      value = value * 10 + b3Spec.digit;
      if (b4Spec?.multiplier === undefined) { setResistanceResult('Invalid multiplier'); return; }
      multiplier = b4Spec.multiplier;
      if (b5Spec?.tolerance === undefined) { setResistanceResult('Invalid tolerance'); return; }
      toleranceVal = b5Spec.tolerance;
    } else if (numBands === 6) {
      b3Spec = getColorSpec(band3Color); // 3rd Digit
      b4Spec = getColorSpec(band4Color); // Multiplier
      b5Spec = getColorSpec(band5Color); // Tolerance
      b6Spec = getColorSpec(band6Color); // TempCo
      if (b3Spec?.digit === undefined) { setResistanceResult('Invalid 3rd digit'); return; }
      value = value * 10 + b3Spec.digit;
      if (b4Spec?.multiplier === undefined) { setResistanceResult('Invalid multiplier'); return; }
      multiplier = b4Spec.multiplier;
      if (b5Spec?.tolerance === undefined) { setResistanceResult('Invalid tolerance'); return; }
      toleranceVal = b5Spec.tolerance;
      if (b6Spec?.tempCo === undefined) { setResistanceResult('Invalid TempCo'); return; }
      tempCoVal = b6Spec.tempCo;
    }

    const finalResistance = value * multiplier;

    let displayResistance: string;
    if (finalResistance >= 1000000000) displayResistance = (finalResistance / 1000000000).toFixed(finalResistance % 1000000000 === 0 ? 0 : 2) + ' GΩ';
    else if (finalResistance >= 1000000) displayResistance = (finalResistance / 1000000).toFixed(finalResistance % 1000000 === 0 ? 0 : 2) + ' MΩ';
    else if (finalResistance >= 1000) displayResistance = (finalResistance / 1000).toFixed(finalResistance % 1000 === 0 ? 0 : 2) + ' kΩ';
    else displayResistance = finalResistance.toFixed(finalResistance % 1 === 0 ? 0 : (finalResistance < 10 ? 2 : 1)) + ' Ω';
    
    let resultString = `${displayResistance}`;
    if (toleranceVal !== null) resultString += ` ±${toleranceVal}%`;
    if (tempCoVal !== null && numBands === 6) resultString += `, ${tempCoVal}ppm/°C`;
    
    setResistanceResult(resultString);

  }, [band1Color, band2Color, band3Color, band4Color, band5Color, band6Color, numBands]);

  const handleTableColorClick = (bandIndexToSet: number, colorId: ResistorBandColor) => {
    if (bandIndexToSet >= 0 && bandIndexToSet < numBands) {
      const bandDef = bandDefinitions[bandIndexToSet];
      if (bandDef && bandDef.validColors.includes(colorId)) {
        bandDef.colorStateSetter(colorId);
      }
    }
  };
  
  const tableColumns = [
    { header: "Color", id: "colorName" },
    { header: bandDefinitions[0]?.label || "Band 1", id: "band1", bandNum: 1 },
    { header: bandDefinitions[1]?.label || "Band 2", id: "band2", bandNum: 2 },
    { header: bandDefinitions[2]?.label || "Band 3", id: "band3", bandNum: 3 },
    { header: bandDefinitions[3]?.label || "Band 4", id: "band4", bandNum: 4 },
    { header: bandDefinitions[4]?.label || "Band 5", id: "band5", bandNum: 5 },
    { header: bandDefinitions[5]?.label || "Band 6", id: "band6", bandNum: 6 },
  ].filter((col, index) => index === 0 || (col.bandNum && col.bandNum <= numBands));


  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="mb-6">
        <Button variant="outline" asChild size="sm">
          <Link href="/tools">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Tools
          </Link>
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto shadow-xl overflow-hidden">
        <CardHeader className="bg-orange-500 p-4 rounded-t-md">
          <CardTitle className="text-2xl font-bold text-white text-center">
            Resistor Color Code Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-6">
          <div className="flex justify-center space-x-1 sm:space-x-2 bg-gray-200 dark:bg-gray-700 p-1 rounded-md">
            {[3, 4, 5, 6].map((bands) => (
              <Button
                key={bands}
                variant={numBands === bands ? "default" : "secondary"}
                onClick={() => setNumBands(bands as 3 | 4 | 5 | 6)}
                className={cn(
                  "text-xs sm:text-sm px-2 sm:px-4 py-1.5 h-auto",
                  numBands === bands ? "bg-gray-600 dark:bg-gray-500 text-white" : "bg-gray-400 dark:bg-gray-600 text-white hover:bg-gray-500 dark:hover:bg-gray-500"
                )}
              >
                {bands} Band
              </Button>
            ))}
          </div>

          {/* Resistor Graphic */}
          <div className="relative flex justify-center items-center my-6 h-24">
              <Image 
                src="https://lh3.googleusercontent.com/d/1XPtbyTKYjwFVIfy_tfccvLTdTfCsECzn" 
                alt="Resistor body"
                width={300}
                height={96}
                className="z-0"
              />
              <div className="absolute flex items-center justify-around h-full w-[300px] z-10 px-10">
                 {bandDefinitions.map((bandDef, index) => (
                  <div
                    key={`resistor-band-overlay-${index}`}
                    className="h-[55%] w-3"
                    style={{ backgroundColor: getColorSpec(bandColors[index])?.hex || 'transparent' }}
                  />
                ))}
              </div>
          </div>
          
          {/* Resistance Value Display */}
          <div className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-md text-center">
            <div className="flex items-center justify-center">
              <span className="text-lg font-medium text-gray-700 dark:text-gray-200 mr-1">Resistance</span> 
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-primary mt-1">{resistanceResult || "Select band colors"}</p>
          </div>

          {/* Interactive Color Table */}
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {tableColumns.map(col => (
                    <th key={col.id} scope="col" className="px-3 py-3 text-center whitespace-nowrap">
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {colorData.map((color) => (
                  <tr key={color.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/50">
                    <td className="px-3 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap flex items-center justify-center">
                       <div className="w-4 h-4 rounded-sm mr-2 border border-gray-400" style={{ backgroundColor: color.hex === 'transparent' ? '#E5E7EB' : color.hex }} />
                       {color.name}
                    </td>
                    {tableColumns.slice(1).map((colDef, colIndex) => {
                      const bandNum = colDef.bandNum!;
                      const currentBandInfo = bandDefinitions[bandNum - 1];
                      let displayVal = '';
                      let isValidChoice = false;

                      if (currentBandInfo) {
                        if (currentBandInfo.type === 'digit' && color.digit !== undefined) { displayVal = color.digit.toString(); isValidChoice = true; }
                        else if (currentBandInfo.type === 'multiplier' && color.multiplierVal !== undefined) { displayVal = `x10^${color.multiplierVal}`; isValidChoice = true; }
                        else if (currentBandInfo.type === 'tolerance' && color.tolerance !== undefined) { displayVal = `±${color.tolerance}%`; isValidChoice = true; }
                        else if (currentBandInfo.type === 'tempCo' && color.tempCo !== undefined) { displayVal = `${color.tempCo}`; isValidChoice = true; }
                        
                        isValidChoice = isValidChoice && currentBandInfo.validColors.includes(color.id);
                      }
                      
                      return (
                        <td key={`${color.id}-${colDef.id}`} className="px-3 py-3 text-center">
                          {isValidChoice ? (
                            <button
                              onClick={() => handleTableColorClick(bandNum - 1, color.id)}
                              className={cn(
                                "w-full h-full p-1 rounded text-xs",
                                bandColors[bandNum - 1] === color.id ? "ring-2 ring-blue-500 ring-inset shadow-md" : "hover:bg-gray-200 dark:hover:bg-gray-700",
                                !isValidChoice && "opacity-30 cursor-not-allowed"
                              )}
                              disabled={!isValidChoice}
                              title={isValidChoice ? `Set ${colDef.header} to ${color.name}` : 'Invalid for this band'}
                            >
                              {displayVal || '-'}
                            </button>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-600">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center mt-4">
             <HelpCircle className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400"/>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Standard: IEC 60062:2016
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
