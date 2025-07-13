import Image from "next/image";
import { cn } from "@/lib/utils";

interface MemorialPhotoProps {
  src: string;
  alt: string;
  className?: string;
}

export function MemorialPhoto({ src, alt, className }: MemorialPhotoProps) {
  return (
    <div
      className={cn(
        "relative",
        "w-[292px] h-[292px] sm:w-[332px] sm:h-[332px] md:w-[392px] md:h-[392px]",
        className,
      )}
      style={{
        background: `linear-gradient(143.7deg, #123D3E 7.38%, #30A1A4 28.56%, #123D3E 52.64%),
                    linear-gradient(143.7deg, rgba(120, 223, 226, 0) 75.05%, rgba(120, 223, 226, 0.35) 82.66%, rgba(120, 223, 226, 0) 90.58%)`,
        padding: "6px",
        borderRadius: "calc(0.5rem + 6px)",
      }}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 380px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
