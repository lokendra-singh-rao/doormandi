import Link from "next/link";
import { Button } from "../ui/button";

interface LinksProps {
  label: string;
  linkHref: string;
}

export const Links = ({ label, linkHref }: LinksProps) => {
  return (
    <Button variant={"link"} className="p-0 h-8" asChild>
      <Link href={linkHref}>{label}</Link>
    </Button>
  );
};
