import "@/styles/globals.css";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { DevtoolsProvider } from 'creatr-devtools';
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};
export const metadata: Metadata = {
  title: {
    default: "SKOOP - Collect, Search & Rediscover Your Saved Content",
    template: "%s | SKOOP"
  },
  description: "SKOOP helps you collect, search and rediscover everything you've saved across the internet—tweets, GitHub stars, Reddit saves, Stack Overflow favorites, and more.",
  applicationName: "SKOOP",
  keywords: ["knowledge management", "bookmarks", "content curation", "productivity", "search", "twitter saves", "github stars"],
  authors: [{
    name: "SKOOP Team"
  }],
  creator: "SKOOP Team",
  publisher: "SKOOP Team",
  icons: {
    icon: [{
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png"
    }, {
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png"
    }, {
      url: "/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon"
    }],
    apple: [{
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png"
    }]
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SKOOP"
  },
  formatDetection: {
    telephone: false
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en" className={`${GeistSans.variable}`} data-unique-id="84c0fe3c-396e-4833-8f8d-c0ffda1ffe9c" data-file-name="app/layout.tsx">
      <body data-unique-id="2742a014-28bc-4548-a227-07dbc980581e" data-file-name="app/layout.tsx">
        <DevtoolsProvider>{children}</DevtoolsProvider>
      </body>
    </html>;
}