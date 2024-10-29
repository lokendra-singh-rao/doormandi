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
      <body className="antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}

// Z-index
// location model = 1000
// location model overlay = 999
// navbar = 998

// colors
// primary1: bg-green-500
// primary2: bg-gray-900
// secondary1: bg-green-100
// secondary2: bg-gray-100
// secondary3: white
