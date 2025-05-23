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
  return <div className={cn("grid w-full grid-cols-3 gap-4", className)} data-unique-id="1118cd78-9a45-4364-b7c3-0190d2301806" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
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
}: BentoCardProps) => <div className={cn("group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius)] skoop-card", "bg-card border border-border/40", "transform-gpu transition-all duration-[var(--transition-duration)]", className)} data-unique-id="340066da-093f-4580-a57b-b3899c864e9a" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
    {background}
    
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10" data-unique-id="d7bc2de7-6ca2-4efc-a892-7f922034a1e5" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
      <Icon />
      <h3 className="text-xl font-semibold text-foreground line-clamp-1 mt-2" data-unique-id="fc9de8db-db9b-48f1-a234-1f1f015631e9" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
        {name}
      </h3>
      {typeof description === 'string' ? <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="90b5468c-979c-4c80-91d7-80536a03ab3c" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">{description}</p> : description}
    </div>

    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" data-unique-id="061c39bd-8ea9-4b45-8dbc-be41b0daf553" data-file-name="components/ui/bento-grid.tsx">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto" data-unique-id="0942b207-8561-48b8-82dd-8b6008c61413" data-file-name="components/ui/bento-grid.tsx">
        <a href={href} className="flex items-center text-primary" data-unique-id="dfd78e1d-dec7-4aa1-b63b-714951359ceb" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-primary/[.03] group-hover:dark:bg-primary/5" data-unique-id="edf44e02-0406-42d5-960d-43ba2428ca7e" data-file-name="components/ui/bento-grid.tsx" />
  </div>;