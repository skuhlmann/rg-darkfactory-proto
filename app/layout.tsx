import type { Metadata } from "next";
import { IM_Fell_English } from "next/font/google";
import { Source_Sans_3 } from "next/font/google";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const imFell = IM_Fell_English({
  variable: "--font-im-fell",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "The Dark Factory",
  description: "Beneath the Raid Guild castle, strange machinery turns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${imFell.variable} ${sourceSans.variable} ${firaCode.variable} antialiased bg-obsidian text-stone-200`}
      >
        {children}
      </body>
    </html>
  );
}
