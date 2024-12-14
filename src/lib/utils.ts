import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = ({ timestamp }: { timestamp: number }) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (isYesterday) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
  }
};

export const formatAvatar = ({ name }: { name: string }) => {
  return name?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
};

export const scrollToBottom = (
  container: HTMLElement | null,
  smooth = false,
) => {
  if (container?.children.length) {
    const lastElement = container?.lastChild as HTMLElement

    lastElement?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'end',
      inline: 'nearest',
    })
  }
}