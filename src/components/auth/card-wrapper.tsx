"use client";

import { Header } from "@/components/auth/header";
import { SocialOptions } from "@/components/auth/social-options";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Links } from "./links";

interface CardWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkLabels: string[];
  linkHrefs: string[];
  showSocial: boolean;
}

export const CardWrapper = ({ children, title, subtitle, linkLabels, linkHrefs, showSocial }: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header title={title} subtitle={subtitle} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (<CardFooter>
        <SocialOptions />
      </CardFooter>)}
      <CardFooter className="flex flex-col items-end">
      {linkLabels.map((label, index) => (
            <Links key={index} label={label} linkHref={linkHrefs[index]} />
      ))}
      </CardFooter>
    </Card>
  );
};
