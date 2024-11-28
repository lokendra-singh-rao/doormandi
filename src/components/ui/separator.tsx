interface SeparatorProps {
  text: string;
}

export default function Separator({ text }: SeparatorProps) {
  return (
    <div className={`flex ${text && "gap-2"} justify-between items-center`}>
      <div className={`w-full h-[1px] bg-gray-200`}></div>
      {text && <div className="text-nowrap text-[0.75rem] text-muted-foreground">{text}</div>}
      <div className={`w-full h-[1px] bg-gray-200`}></div>
    </div>
  );
}