
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, DraftingCompass } from 'lucide-react';
import Link from 'next/link';

export default function CapacitorCodeCalculatorPage() {
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
            <DraftingCompass className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Capacitor Code Calculator</CardTitle>
          <CardDescription>
            Convert 3-digit capacitor codes (e.g., 104, 222) to capacitance values (pF, nF, µF).
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground mb-4">
            The Capacitor Code Calculator functionality will be implemented here.
          </p>
          {/* Placeholder for code input and result display */}
        </CardContent>
      </Card>
    </div>
  );
}
