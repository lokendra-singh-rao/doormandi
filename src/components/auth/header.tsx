import {Poppins} from "next/font/google"
import { cn } from "@/lib/utils"

const font = Poppins({
    weight: ["600"],
    subsets: ["latin"],
})

interface HeaderProps {
    title: string;
    subtitle: string;
}
export const Header = ({title, subtitle}: HeaderProps) => {
return (
    <div className="w-full flex flex-col gap-y-1 items-center justify-center">
        <h1 className={cn("text-3xl font-semibold mb-0", font.className)}>{title}</h1>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
)
}