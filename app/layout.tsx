import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React
import type { Metadata, Viewport } from "next/types"

const inter = Inter({ subsets: ["latin"] })

// Add security headers
export const generateMetadata = (): Metadata => {
  return {
    title: "Luís Miguel - Portfolio",
    description: "Full-Stack Developer & Software Engineer Portfolio",
    metadataBase: new URL("https://lmfs.netlify.app/"),
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: "Luís Miguel Furlanetto Sousa" }],
    creator: "Luís Miguel Furlanetto Sousa",
    publisher: "Luís Miguel Furlanetto Sousa",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
  }
}

// Add viewport settings
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add CSP meta tag */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src 'self';"
        />
        {/* Add security headers */}
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
