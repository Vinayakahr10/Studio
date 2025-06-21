
"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Linkedin } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add form submission logic here
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get in touch.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Jane Doe" required className="h-11 text-base" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required className="h-11 text-base" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Regarding..." required className="h-11 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message here..." required rows={5} className="text-base" />
              </div>
              <Button type="submit" size="lg" className="w-full transition-transform hover:scale-105">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
           <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Our Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:electronicswithvk@gmail.com" className="text-muted-foreground hover:text-primary">electronicswithvk@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-primary" />
                <a href="https://www.linkedin.com/in/vinayaka-hr-39804a320" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Connect on LinkedIn</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span className="text-muted-foreground">
                  123 Innovation Drive<br />Tech City, TC 54321<br />United States
                </span>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg overflow-hidden shadow-md">
            {/* Placeholder for a map. In a real app, use an embedded map component */}
            <Image src="https://placehold.co/600x300.png" alt="Map placeholder" data-ai-hint="map location" width={600} height={300} className="w-full aspect-video object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
