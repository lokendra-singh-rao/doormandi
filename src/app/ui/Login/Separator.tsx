interface SeparatorProps {
  text: string;
}

export default function Separator({ text }: SeparatorProps) {
  return (
    <div className="flex gap-4 justify-between items-center">
      <div className={`w-full h-[1px] bg-gray-200`}></div>
      <div className="text-[0.6rem] text-nowrap font-semibold text-gray-400">{text}</div>
      <div className={`w-full h-[1px] bg-gray-200`}></div>
    </div>
  );
}