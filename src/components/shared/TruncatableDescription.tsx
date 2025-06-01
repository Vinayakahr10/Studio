
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TruncatableDescriptionProps {
  text: string;
  initialCharLimit?: number;
  className?: string;
}

export const TruncatableDescription: React.FC<TruncatableDescriptionProps> = ({
  text,
  initialCharLimit = 120, // Default character limit for truncation
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncatable, setIsTruncatable] = useState(false);

  useEffect(() => {
    setIsTruncatable(text.length > initialCharLimit);
  }, [text, initialCharLimit]);

  const toggleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation if this button is inside an <a> tag (e.g. Card)
    e.stopPropagation(); // Prevent card click if button is inside a clickable card
    setIsExpanded(!isExpanded);
  };

  if (!isTruncatable) {
    return <p className={cn("text-sm text-muted-foreground", className)}>{text}</p>;
  }

  return (
    <div className={cn("text-sm text-muted-foreground", className)}>
      <p>
        {isExpanded ? text : `${text.substring(0, initialCharLimit)}...`}
      </p>
      <Button
        variant="link"
        size="sm"
        onClick={toggleExpand}
        className="p-0 h-auto text-primary hover:underline mt-1 text-xs"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </Button>
    </div>
  );
};
