
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Linkedin, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
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
          <CardTitle className="text-2xl">Get in Touch</CardTitle>
          <CardDescription>The best way to reach us is through email or LinkedIn.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-4 p-6">
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
        </CardContent>
      </Card>
    </div>
  );
}
