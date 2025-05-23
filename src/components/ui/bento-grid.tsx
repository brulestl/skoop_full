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
  return <div className={cn("grid w-full grid-cols-3 gap-4", className)} data-unique-id="3a1a9924-ab4f-440a-a0a1-99155b438043" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
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
}: BentoCardProps) => <div className={cn("group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius)] skoop-card", "bg-card border border-border/40", "transform-gpu transition-all duration-[var(--transition-duration)]", className)} data-unique-id="c71b9f85-47ad-4db5-b555-0bb715928120" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
    {background}
    
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10" data-unique-id="d8148dda-4a7e-4bd2-b9e2-abb9dde53560" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
      <Icon />
      <h3 className="text-xl font-semibold text-foreground line-clamp-1 mt-2" data-unique-id="2a43d2cf-7258-41b1-ae8b-0e92688d7ef8" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
        {name}
      </h3>
      {typeof description === 'string' ? <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="4867a186-63fd-49a6-9cfe-8fd3508e3c07" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">{description}</p> : description}
    </div>

    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" data-unique-id="d0d1c606-8036-4bbd-9a53-f485391c7b71" data-file-name="components/ui/bento-grid.tsx">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto" data-unique-id="7f23913c-a679-416d-9291-37b2293251ab" data-file-name="components/ui/bento-grid.tsx">
        <a href={href} className="flex items-center text-primary" data-unique-id="be8f822e-e5b8-4b93-bec8-6e15b3fc3931" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-primary/[.03] group-hover:dark:bg-primary/5" data-unique-id="f7e05d38-355d-44b6-b3ed-ff9d7fb0b70d" data-file-name="components/ui/bento-grid.tsx" />
  </div>;