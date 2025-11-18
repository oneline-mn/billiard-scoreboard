import { Geist, Geist_Mono } from "next/font/google";
import './global.css'
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/shared/navbar";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
