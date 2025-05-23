"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, HTMLProps } from "react";
interface AuroraBackgroundProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}
export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return <div className={cn("relative flex flex-col items-center justify-center transition-bg", className)} {...props} data-unique-id="021e8030-9f42-4ff8-a3ae-219adf60853c" data-file-name="components/ui/aurora-background.tsx" data-dynamic-text="true">
      <div className="absolute inset-0 overflow-hidden" data-unique-id="16746618-0ac6-4d10-8a07-a13a14133e47" data-file-name="components/ui/aurora-background.tsx">
        <div className={cn(`
            [--white-gradient:repeating-linear-gradient(100deg,var(--primary)_0%,var(--primary)_7%,transparent_10%,transparent_12%,var(--primary)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--primary)_0%,var(--primary)_7%,transparent_10%,transparent_12%,var(--primary)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--primary)_10%,var(--accent)_15%,var(--primary)_20%,var(--secondary)_25%,var(--primary)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] opacity-30 dark:opacity-40
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] will-change-transform`, showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`)} data-unique-id="d7b96f97-e894-4ab8-8e79-35b4e3d8d1cb" data-file-name="components/ui/aurora-background.tsx"></div>
      </div>
      {children}
    </div>;
};