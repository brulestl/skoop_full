"use client";

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
interface BentoGridProps {
  children: ReactNode;
  className?: string;
}
export const BentoGrid = ({
  children,
  className
}: BentoGridProps) => {
  return <div className={cn("grid w-full grid-cols-3 gap-4", className)} data-unique-id="6ca921f9-59e0-4283-873f-643600e68ed6" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
      {children}
    </div>;
};
interface BentoCardProps {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ComponentType<any>;
  description: ReactNode | string;
  href: string;
  cta: string;
}
export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta
}: BentoCardProps) => <div className={cn("group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius)] skoop-card", "bg-card border border-border/40", "transform-gpu transition-all duration-[var(--transition-duration)]", className)} data-unique-id="2eba6a3d-dece-4f8c-8f79-607d0f5465b2" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
    {background}
    
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10" data-unique-id="edc75707-1cff-4913-afb8-46440983a2a8" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
      <Icon />
      <h3 className="text-xl font-semibold text-foreground line-clamp-1 mt-2" data-unique-id="af0e439f-e79a-40cc-b1a2-e63fb13686a3" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
        {name}
      </h3>
      {typeof description === 'string' ? <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="12ba9938-e61b-4551-8ea2-93f07b545265" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">{description}</p> : description}
    </div>

    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" data-unique-id="3b73a8e8-0b96-4f1c-a5b5-0e3d8359b59c" data-file-name="components/ui/bento-grid.tsx">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto" data-unique-id="26dc701b-12b0-47fd-856f-08e4dab68aa9" data-file-name="components/ui/bento-grid.tsx">
        <a href={href} className="flex items-center text-primary" data-unique-id="9a8322c8-e1b4-428e-90f9-39c9f3d15270" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-primary/[.03] group-hover:dark:bg-primary/5" data-unique-id="c583ef1e-5e11-4457-97c9-1b75bfac0f4a" data-file-name="components/ui/bento-grid.tsx" />
  </div>;