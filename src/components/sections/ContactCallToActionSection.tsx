
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function ContactCallToActionSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground md:text-lg">
            Have questions, feedback, or just want to say hello? We'd love to hear from you. Reach out to us, and we'll get back to you as soon as possible.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="transition-transform hover:scale-105 shadow-md hover:shadow-lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
