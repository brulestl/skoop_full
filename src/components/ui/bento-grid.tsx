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
  return <div className={cn("grid w-full grid-cols-3 gap-4", className)} data-unique-id="0799a904-f0d8-4c87-a359-ceeb5dc9afe9" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
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
}: BentoCardProps) => <div className={cn("group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius)] skoop-card", "bg-card border border-border/40", "transform-gpu transition-all duration-[var(--transition-duration)]", className)} data-unique-id="ebbb1717-63a2-46a2-bc29-e3a60e6796fb" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
    {background}
    
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10" data-unique-id="56f6ed11-39de-454c-a45b-06668c64f343" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
      <Icon />
      <h3 className="text-xl font-semibold text-foreground line-clamp-1 mt-2" data-unique-id="f896346c-4843-4756-99f4-45811d601562" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
        {name}
      </h3>
      {typeof description === 'string' ? <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="0cdc9799-49c6-4850-98ed-8af32ad44367" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">{description}</p> : description}
    </div>

    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" data-unique-id="aa046360-1569-4950-91f0-3a2a48b3e80b" data-file-name="components/ui/bento-grid.tsx">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto" data-unique-id="01e3113b-251c-42ad-b79e-20783faf8d82" data-file-name="components/ui/bento-grid.tsx">
        <a href={href} className="flex items-center text-primary" data-unique-id="46856b49-d83a-42b1-861e-68a0945a7939" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-primary/[.03] group-hover:dark:bg-primary/5" data-unique-id="05cad8ac-e98b-4902-8f85-b54b443a06f0" data-file-name="components/ui/bento-grid.tsx" />
  </div>;