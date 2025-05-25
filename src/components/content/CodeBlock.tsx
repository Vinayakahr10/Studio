
"use client"; // Required if using hooks like useState for copy functionality

import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';

// Ensure prism has CPP language if not already included by default
// import 'prismjs/components/prism-cpp'; // Example, actual import path might vary

export const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  // Fallback to 'clike' if language is not directly supported or for general C-like syntax
  const prismLanguage = language.toLowerCase() as any; 

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code.trimEnd())
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2500);
        })
        .catch(err => {
          console.error('Error copying code to clipboard:', err);
          // You could add a toast notification here for errors
        });
    } else {
      console.warn('Clipboard API not available or context is not secure. Please copy manually.');
      // You could add a toast notification here
    }
  };

  return (
    <div className="relative group rounded-md bg-[#1e1e1e] my-6 shadow-lg"> {/* Added my-6 for margin */}
      <div className="overflow-x-auto">
        <Highlight
          theme={themes.vsDark} // You can change themes here e.g. themes.github, themes.dracula
          code={code.trimEnd()}
          language={prismLanguage}
        >
          {({ className: prismClassName, style: prismStyle, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(
                prismClassName,
                "p-4 text-sm !bg-transparent" // Ensure pre background is transparent if parent handles it
              )}
              style={{ ...prismStyle, margin: 0, backgroundColor: 'transparent' }} // Explicitly set bg to transparent
            >
              {tokens.map((line, i) => {
                // Skip rendering the last empty line if it exists
                if (i === tokens.length - 1 && line.length === 1 && line[0].content === '') {
                  return null;
                }
                const {key: _internalLineKey, ...restLineProps} = getLineProps({ line, key: i });
                return (
                  <div key={i} {...restLineProps} className={cn(restLineProps.className, "flex table-row")}>
                    <span
                      className="table-cell text-right pr-4 select-none text-muted-foreground/50 border-r border-muted-foreground/20 sticky left-0 bg-[#1e1e1e] z-[1]" // Sticky line numbers
                      style={{ minWidth: '3.5em' }} // Increased minWidth for 3-digit numbers
                    >
                      {i + 1}
                    </span>
                    <span className="table-cell pl-4 flex-grow">
                      {line.map((token, tokenKey) => {
                         const {key: _internalTokenKey, ...restTokenProps} = getTokenProps({ token, key: tokenKey });
                        return <span key={tokenKey} {...restTokenProps} />;
                      })}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={copyToClipboard}
        className={cn(
          "absolute top-2 right-2 h-8 w-8 p-1.5 rounded-md z-20", // Ensure button is above sticky line numbers
          "text-slate-400 hover:text-slate-200 focus-visible:text-slate-100",
          "hover:bg-slate-700/50 focus-visible:bg-slate-700/60",
          "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-150", // Appear on hover
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
