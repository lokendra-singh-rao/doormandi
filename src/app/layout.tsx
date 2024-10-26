import type { Metadata } from "next";
import "./globals.css";
import Footer from "./ui/Footer/Footer";

export const metadata: Metadata = {
  title: "DoorMandi",
  description: "Doormandi is your go-to app for fresh vegetable and fruit delivery, bringing farm-fresh produce straight to your doorstep. With a user-friendly interface, Doormandi allows you to explore a wide variety of high-quality fruits and vegetables sourced from local farms, ensuring freshness and sustainability. Enjoy hassle-free ordering, same-day delivery, and a commitment to healthy, delicious food right from your phone. Whether you’re stocking up for the week or craving seasonal fruits, Doormandi makes healthy eating convenient and accessible.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        
        {children}
        <Footer/>
      </body>
    </html>
  );
}
