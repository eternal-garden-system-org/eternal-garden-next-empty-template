import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("w-full py-6 bg-[#021010]", className)}>
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted">
          Карточку памяти создали{" "}
          <Link
            href="https://memory.by"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#30A0A4] underline hover:opacity-90 transition-opacity"
          >
            memory.by
          </Link>
        </p>
      </div>
    </footer>
  );
}
