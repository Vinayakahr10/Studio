
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Linkedin, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Send us a Message</CardTitle>
          <CardDescription>Fill out the form below and we'll get in touch.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your Name" required className="h-11 text-base" />
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
            <Button type="submit" size="lg" className="w-full transition-transform hover:scale-105">
              <Send className="mr-2 h-4 w-4"/> Send Message
            </Button>
          </form>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex flex-col items-start gap-4 p-6">
            <h3 className="text-lg font-semibold text-foreground">Our Contact Information</h3>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-muted-foreground">
              <a href="mailto:electronicswithvk@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-5 w-5 text-primary/80" />
                <span>electronicswithvk@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/vinayaka-hr-39804a320" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5 text-primary/80" />
                <span>Connect on LinkedIn</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary/80" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
