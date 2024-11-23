import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    console.log("HELLO MOTO")
//   const session = await auth();
//   if (!session) {
//     return redirect("/login");
//   }

  return  <div>{children}</div> ;
}
