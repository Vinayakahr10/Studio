
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/20 via-background to-background">
      <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary-foreground lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Welcome to ElectroLearn
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
