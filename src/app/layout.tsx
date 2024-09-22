import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transaction Processor",
  description: "Processes transactions that are in csv files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
