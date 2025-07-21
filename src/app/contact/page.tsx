
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Linkedin, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
      </section>

      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Get in Touch</CardTitle>
          <CardDescription>The best way to reach us is through the channels below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col gap-4">
            <a href="mailto:electronicswithvk@gmail.com" className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted dark:hover:bg-primary/20 dark:hover:text-primary-foreground transition-colors">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">electronicswithvk@gmail.com</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/vinayaka-hr-39804a320" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted dark:hover:bg-primary/20 dark:hover:text-primary-foreground transition-colors">
              <Linkedin className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">LinkedIn</p>
                <p className="text-sm text-muted-foreground">Connect with Vinayaka HR</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Location</p>
                <p className="text-sm text-muted-foreground">Bengaluru, Karnataka, India</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
