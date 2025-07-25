
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function IntroAnimation() {
  const [animationState, setAnimationState] = useState('start');

  useEffect(() => {
    // This effect runs only once on component mount
    const hasSeenAnimation = sessionStorage.getItem('hasSeenIntroAnimation');

    if (hasSeenAnimation) {
      setAnimationState('finished');
      return;
    }

    // Start the animation sequence
    const timer1 = setTimeout(() => {
      setAnimationState('animating');
    }, 1000); // Wait 1 second before starting the move

    const timer2 = setTimeout(() => {
      setAnimationState('fading-out');
    }, 2500); // Start fading out the overlay after animation (1s wait + 1.5s anim)

    const timer3 = setTimeout(() => {
        setAnimationState('finished');
        sessionStorage.setItem('hasSeenIntroAnimation', 'true');
    }, 3000); // Fully hide after fade out

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (animationState === 'finished') {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500',
        animationState === 'fading-out' ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div
        className={cn(
          'absolute text-2xl font-bold text-primary',
          animationState === 'animating' && 'animate-move-to-header'
        )}
        style={{
          // Initial position for the text
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1.5)',
        }}
      >
        EletronicswithVK
      </div>
    </div>
  );
}
