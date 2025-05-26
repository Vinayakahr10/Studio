
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ServerIcon } from 'lucide-react'; // Added ServerIcon
import Link from 'next/link';

export default function DataDemoPage() {
  const [data, setData] = useState<{ message: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/greeting');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e: any) {
        console.error("Failed to fetch data:", e);
        setError(e.message || "Failed to load data from the backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16 flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <ServerIcon className="mx-auto h-10 w-10 text-primary mb-2" />
          <CardTitle className="text-3xl">Backend Data Demo</CardTitle>
          <CardDescription>
            This page fetches a simple message from a Next.js API Route Handler.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center min-h-[100px] flex items-center justify-center">
          {loading && (
            <div className="flex items-center text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Loading data from backend...</span>
            </div>
          )}
          {error && <p className="text-destructive">Error: {error}</p>}
          {!loading && !error && data && (
            <p className="text-xl font-semibold text-foreground">
              Backend says: <span className="text-accent">{data.message}</span>
            </p>
          )}
          {!loading && !error && !data && <p>No data received.</p>}
        </CardContent>
      </Card>
      <Button asChild variant="outline" className="mt-8">
        <Link href="/">
          &larr; Back to Home
        </Link>
      </Button>
    </div>
  );
}
