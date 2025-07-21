
"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

/**
 * @deprecated This component is no longer the recommended way to solve hydration issues.
 * Use a dedicated client-side provider wrapper instead. See `AppThemeProvider` for an example.
 */
export function ClientOnly({ children }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // On the server, and before hydration, render nothing.
  }

  return <>{children}</>;
}
