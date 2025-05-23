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
  return <div className={cn("grid w-full grid-cols-3 gap-4", className)} data-unique-id="f8b25d60-209c-4a9d-9451-783f913ef810" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
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
}: BentoCardProps) => <div className={cn("group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius)] skoop-card", "bg-card border border-border/40", "transform-gpu transition-all duration-[var(--transition-duration)]", className)} data-unique-id="f0a55738-4cd0-4408-9e7e-caa223748f9b" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
    {background}
    
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10" data-unique-id="ce028cea-1a04-498c-a0ac-fae576499f32" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
      <Icon />
      <h3 className="text-xl font-semibold text-foreground line-clamp-1 mt-2" data-unique-id="20654269-bd0f-4c48-abb0-905725a23c35" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
        {name}
      </h3>
      {typeof description === 'string' ? <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="856c3318-2489-4ccb-ba1e-05a56e3d0511" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">{description}</p> : description}
    </div>

    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" data-unique-id="d04f8704-abfa-4311-959b-3125e7e04b05" data-file-name="components/ui/bento-grid.tsx">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto" data-unique-id="8cbe167b-a8de-42f0-81d8-3994be7b4d8d" data-file-name="components/ui/bento-grid.tsx">
        <a href={href} className="flex items-center text-primary" data-unique-id="a0f1326d-432e-4078-9e55-0fdcc977b79a" data-file-name="components/ui/bento-grid.tsx" data-dynamic-text="true">
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-primary/[.03] group-hover:dark:bg-primary/5" data-unique-id="ce3ef60a-e922-4a1b-a27f-b24457872a91" data-file-name="components/ui/bento-grid.tsx" />
  </div>;