import PublicNavbar from "@/components/navbar/public-navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PublicNavbar />
      {children}
    </div>
  );
}
