import { Geist, Geist_Mono, Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { ClientLanguageProvider } from "@/components/providers/ClientLanguageProvider";
import { ChatWidget } from "@/features/chat/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Namtech Pro | Excelência em Tecnologia Angolana",
    template: "%s | Namtech Pro",
  },
  description:
    "Especialistas em integração de sistemas de navegação, rádio e energia industrial em Angola. Soluções tecnológicas marítimas e industriais premium.",
  keywords: [
    "navegação marítima",
    "radar",
    "GPS",
    "rádio VHF",
    "energia solar",
    "Angola",
    "Namibe",
    "Luanda",
    "tecnologia naval",
    "Furuno",
    "Icom",
    "Namtech Pro",
  ],
  authors: [{ name: "Namtech Pro" }],
  creator: "Namtech Pro",
  publisher: "Namtech Pro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    siteName: "Namtech Pro",
    title: "Namtech Pro | Excelência em Tecnologia Angolana",
    description:
      "Especialistas em integração de sistemas de navegação, rádio e energia industrial em Angola.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Namtech Pro | Excelência em Tecnologia Angolana",
    description:
      "Especialistas em integração de sistemas de navegação, rádio e energia industrial em Angola.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-AO" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${outfit.variable} antialiased font-sans`}>
        <ConvexClientProvider>
          <ClientLanguageProvider>
            {children}
            <ChatWidget />
          </ClientLanguageProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
