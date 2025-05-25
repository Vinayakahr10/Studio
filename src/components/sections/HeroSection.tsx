
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const fullTitle = "Welcome to ElectroLearn";
  const [typedTitle, setTypedTitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const typingSpeed = 100; // milliseconds per character
  const cursorBlinkSpeed = 530; // milliseconds for cursor blink interval
  const cursorVisibleAfterTypingDuration = 1500; // milliseconds cursor stays solid after typing

  // Effect for typing out the title
  useEffect(() => {
    if (typedTitle.length < fullTitle.length) {
      const timer = setTimeout(() => {
        setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else if (typedTitle.length === fullTitle.length && !isTypingComplete) {
      // Ensures setIsTypingComplete is called only once
      setIsTypingComplete(true);
    }
  }, [typedTitle, fullTitle, isTypingComplete, typingSpeed]);

  // Effect for cursor blinking and visibility
  useEffect(() => {
    if (isTypingComplete) {
      // After typing is complete, make cursor solid for a bit, then hide
      setShowCursor(true); // Ensure it's visible and solid
      const timer = setTimeout(() => {
        setShowCursor(false); // Hide cursor
      }, cursorVisibleAfterTypingDuration);
      return () => clearTimeout(timer); // Cleanup the timeout
    } else {
      // While typing, blink the cursor
      const blinkTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, cursorBlinkSpeed);
      return () => clearInterval(blinkTimer); // Cleanup the interval
    }
  }, [isTypingComplete, cursorBlinkSpeed, cursorVisibleAfterTypingDuration]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/20 via-background to-background">
      <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px] flex items-center justify-center lg:justify-start">
            <span>{typedTitle}</span>
            {showCursor && <span className="ml-1 text-inherit">|</span>}
             {/* This optional span helps maintain consistent spacing if h1 height isn't perfect, though fixed height should mostly cover it */}
            {!showCursor && isTypingComplete && typedTitle.length === fullTitle.length && <span className="ml-1 text-inherit opacity-0">|</span>}
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
            Dive into the world of electronics with our comprehensive tutorials, hands-on projects, and insightful articles. Whether you're a beginner or an expert, ElectroLearn is your guide.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
            <Button asChild size="lg" className="transition-transform hover:scale-105 shadow-md hover:shadow-lg">
              <Link href="/projects">Explore Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="transition-transform hover:scale-105">
              <Link href="/tutorials">Browse Tutorials</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Electronics components"
            data-ai-hint="electronics components"
            width={600}
            height={400}
            className="overflow-hidden rounded-xl object-cover object-center shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
