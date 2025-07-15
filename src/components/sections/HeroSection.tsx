
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function HeroSection() {
  const fullTitle = "Welcome to EletronicswithVK";

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        <Image
          src="/images/hero-image.jpg"
          alt="An intricate circuit board with glowing pathways, representing the world of electronics."
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 brightness-[0.4]"
          priority
        />
        <div className="relative z-10 p-4 space-y-4 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Master the World of Electronics
          </h1>
          <p className="max-w-[700px] mx-auto text-lg text-primary-foreground/80 md:text-xl">
            From basic circuits to advanced microcontrollers, EletronicswithVK provides the knowledge and tools you need to bring your ideas to life.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button asChild size="lg" className="transition-transform hover:scale-105 shadow-md hover:shadow-lg">
              <Link href="/tutorials">Start Learning</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="transition-transform hover:scale-105">
              <Link href="/projects">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </section>
  );
}
