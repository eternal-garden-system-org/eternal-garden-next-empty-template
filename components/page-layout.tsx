import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
}

export function PageLayout({
  children,
  className,
  backgroundImage,
}: PageLayoutProps) {
  return (
    <div className={cn("relative flex min-h-screen flex-col", className)}>
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.6,
          mixBlendMode: "soft-light",
        }}
      />

      <main className="relative flex min-h-[100vh] flex-1 flex-col" role="main">
        {children}
      </main>
    </div>
  );
}
