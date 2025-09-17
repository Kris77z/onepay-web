"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Toaster, { ToasterRef } from "@/components/ui/toast";
import { useRef, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toasterRef = useRef<ToasterRef | null>(null);

  useEffect(() => {
    const handleShowToast = (event: CustomEvent) => {
      const { title, message, variant } = event.detail;
      toasterRef.current?.show({
        title,
        message,
        variant,
        duration: 4000,
      });
    };

    window.addEventListener('show-toast', handleShowToast as EventListener);
    return () => {
      window.removeEventListener('show-toast', handleShowToast as EventListener);
    };
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>OnePay - Next-Gen Crypto Payments Platform</title>
        <meta name="description" content="Seamlessly accept cryptocurrency payments with advanced Web3 infrastructure." />
        <link rel="icon" href="/images/onepay-dark.png" />
        <link rel="shortcut icon" href="/images/onepay-dark.png" />
        <link rel="apple-touch-icon" href="/images/onepay-dark.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster ref={toasterRef} defaultPosition="top-right" />
      </body>
    </html>
  );
}
