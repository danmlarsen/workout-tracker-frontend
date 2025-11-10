import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-card animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_200ms_infinite_forwards] rounded-md opacity-0",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
