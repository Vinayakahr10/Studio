
"use client";

import { getProjectById, type ProjectDetail, type CodeSection } from '@/data/project-details';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ListChecks, Wrench, Codepen, Lightbulb, ArrowLeft, ExternalLink, CircuitBoard, Zap, Clock, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Highlight, themes } from 'prism-react-renderer';
import { cn } from "@/lib/utils";
import React, { useState, use } from 'react';

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const prismLanguage = language.toLowerCase() as any;

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code.trimEnd())
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2500); // Reset after 2.5 seconds
        })
        .catch(err => {
          console.error('Error copying code to clipboard:', err);
        });
    } else {
      console.warn('Clipboard API not available or context is not secure. Please copy manually.');
    }
  };

  return (
    <div className="relative group rounded-md bg-[#1e1e1e] overflow-x-auto">
      <Highlight
        theme={themes.vsDark}
        code={code.trimEnd()}
        language={prismLanguage}
      >
        {({ className: prismClassName, style: prismStyle, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              prismClassName,
              "p-4 text-sm" 
            )}
            style={{ ...prismStyle, margin: 0 }}
          >
            {tokens.map((line, i) => {
              if (i === tokens.length - 1 && line.length === 1 && line[0].empty) {
                return null;
              }
              return (
                <div key={i} {...getLineProps({ line, key: i })} className="flex table-row">
                  <span
                    className="table-cell text-right pr-4 select-none text-muted-foreground/50 border-r border-muted-foreground/20"
                    style={{ minWidth: '3em' }}
                  >
                    {i + 1}
                  </span>
                  <span className="table-cell pl-4 flex-grow">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
      <Button
        variant="ghost"
        size="icon"
        onClick={copyToClipboard}
        className={cn(
          "absolute top-2 right-2 h-8 w-8 p-1.5 rounded-md",
          "text-slate-400 hover:text-slate-200 focus-visible:text-slate-100",
          "hover:bg-slate-700/50 focus-visible:bg-slate-700/60",
          "opacity-60 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-150",
          isCopied ? "bg-green-700/30 hover:bg-green-700/40 focus-visible:bg-green-700/40" : ""
        )}
        aria-label={isCopied ? "Copied to clipboard" : "Copy code to clipboard"}
      >
        {isCopied ? (
          <Check className="h-5 w-5 text-green-400" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};


export default function ProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const actualParams = use(params);
  const project = getProjectById(actualParams.projectId);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The project with ID "{actualParams.projectId}" does not exist or details are not yet available.
        </p>
        <Button asChild variant="outline">
          <Link href="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to All Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to All Projects</Link>
      </Button>

      <article className="space-y-8">
        <header className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">{project.title}</h1>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
          )}
        </header>

        <Image
          src={project.mainImageUrl}
          alt={project.title}
          data-ai-hint={project.mainImageHint || 'project image'}
          width={1200}
          height={675} // 16:9 aspect ratio
          className="w-full rounded-lg object-cover shadow-xl aspect-video"
          priority
        />

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{project.introduction}</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {project.componentsNeeded && project.componentsNeeded.length > 0 && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary" />Components Needed</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {project.componentsNeeded.map(component => <li key={component}>{component}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}
          {project.toolsNeeded && project.toolsNeeded.length > 0 && (
             <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center"><Wrench className="mr-2 h-5 w-5 text-primary" />Tools Needed</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {project.toolsNeeded.map(tool => <li key={tool}>{tool}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {project.circuitDiagramUrl && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center"><CircuitBoard className="mr-2 h-6 w-6 text-primary"/>Circuit Diagram</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src={project.circuitDiagramUrl}
                alt="Circuit Diagram"
                data-ai-hint={project.circuitDiagramHint || 'circuit diagram'}
                width={600}
                height={400}
                className="rounded-md object-contain shadow-sm border"
              />
            </CardContent>
          </Card>
        )}

        {project.codeSections && project.codeSections.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center"><Codepen className="mr-2 h-6 w-6 text-primary"/>Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.codeSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                  <CodeBlock code={section.code} language={section.language} />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Step-by-Step Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {project.steps.map((step, index) => (
              <div key={index} className="space-y-3 pb-4 border-b border-dashed last:border-b-0 last:pb-0">
                <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                {step.imageUrl && (
                  <div className="my-3 flex justify-center">
                    <Image
                      src={step.imageUrl}
                      alt={`Step ${index + 1}: ${step.title}`}
                      data-ai-hint={step.imageHint || 'project step illustration'}
                      width={500}
                      height={300}
                      className="rounded-md object-cover shadow-sm border"
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-md bg-secondary/30">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center"><Lightbulb className="mr-2 h-6 w-6 text-primary"/>Conclusion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{project.conclusion}</p>
          </CardContent>
        </Card>

        {project.learnMoreLinks && project.learnMoreLinks.length > 0 && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-3">Further Reading & Resources</h2>
            <ul className="space-y-2">
              {project.learnMoreLinks.map((link, index) => (
                <li key={index}>
                  <Button variant="link" asChild className="p-0 h-auto text-base">
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.text} <ExternalLink className="ml-1.5 h-4 w-4" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
