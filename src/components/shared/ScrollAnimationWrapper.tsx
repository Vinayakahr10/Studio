
"use client";

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ScrollAnimationWrapper({ children, className }: ScrollAnimationWrapperProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We only want to trigger the animation once
        if (entry.isIntersecting) {
          setIsInView(true);
          // Disconnect the observer once the animation is triggered
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
}
