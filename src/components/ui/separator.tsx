import { cn } from "@/lib/utils";

interface SeparatorProps {
  text: string;
  className?: string;
}

export default function Separator({ text, className }: SeparatorProps) {
  return (
    <div className={cn(`flex ${text && "gap-2"} justify-between items-center`, className)}>
      <div className={`w-full h-[1px] bg-gray-200`}></div>
      {text && <div className="text-nowrap text-[0.75rem] text-muted-foreground">{text}</div>}
      <div className={`w-full h-[1px] bg-gray-200`}></div>
    </div>
  );
}