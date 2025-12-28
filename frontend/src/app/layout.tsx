import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uppal Kalan Street Food Guide",
  description: "Discover authentic street food experiences in Uppal Kalan, Telangana. AI-powered local guide built with Kiro.",
  keywords: "Uppal Kalan, street food, Telangana, Hyderabad, biryani, local guide, restaurants",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Uppal Kalan Street Food Guide",
    description: "Discover authentic street food experiences in Uppal Kalan, Telangana",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-orange-50 to-red-50 min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}