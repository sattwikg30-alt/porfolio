import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sattwik Ghosh | Full-Stack Developer & Web3 Builder",
  description: "Personal portfolio of Sattwik Ghosh, a Computer Science student and full-stack developer building practical digital products and exploring Web3.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#08080a] text-[#f4f4f6] selection:bg-accent selection:text-white">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
