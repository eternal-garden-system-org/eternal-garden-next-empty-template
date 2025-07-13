import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("mx-auto w-full px-6", {
  variants: {
    size: {
      default: "max-w-6xl",
      sm: "max-w-3xl",
      lg: "max-w-screen-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ContainerProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, size, className = "" }: ContainerProps) {
  return (
    <div className={cn(buttonVariants({ size, className }))}>{children}</div>
  );
}
