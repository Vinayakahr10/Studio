
"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
}

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
