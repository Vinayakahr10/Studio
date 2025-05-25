
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Save, SettingsIcon, AlertTriangle } from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Settings Saved (Placeholder)",
      description: "Site settings have been updated. This is a placeholder notification.",
      action: <CheckCircle className="text-green-500" />,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center"><SettingsIcon className="mr-3 h-7 w-7 text-primary" />Site Settings</h1>
        <p className="text-muted-foreground">Manage general site configurations and preferences.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="shadow-md mb-6">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic information and global settings for your website.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="ElectroLearn" className="h-11 text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteTagline">Site Tagline</Label>
              <Input id="siteTagline" defaultValue="Your Guide to Electronics" className="h-11 text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Administrator Email</Label>
              <Input id="adminEmail" type="email" defaultValue="admin@electrolearn.com" className="h-11 text-base" />
            </div>
             <div className="flex items-center space-x-2 pt-2">
              <Switch id="maintenance-mode" />
              <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md mb-6">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of your site.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Placeholder for theme selection or logo upload */}
            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input id="logoUrl" placeholder="https://example.com/logo.png" className="h-11 text-base"/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="footerText">Custom Footer Text</Label>
              <Textarea id="footerText" placeholder="© Your Company Name. All rights reserved." className="text-base" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-yellow-500/50 bg-yellow-500/5 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-700 dark:text-yellow-400">
              <AlertTriangle className="mr-2 h-5 w-5" /> Advanced Settings
            </CardTitle>
            <CardDescription className="text-yellow-600 dark:text-yellow-500">
                These settings are for advanced users. Modifying them without understanding can impact site functionality.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
                Placeholder for advanced settings like API keys, integration options, etc.
                Actual functionality for these settings is not yet implemented.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" className="transition-transform hover:scale-105">
            <Save className="mr-2 h-4 w-4" /> Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
