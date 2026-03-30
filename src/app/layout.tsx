import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NeXFlowX — Financial Supply Chain Orchestrator",
  description:
    "Transformamos pagamentos numa operação logística global inteligente. Orquestração de Supply Chain Financeira com visibilidade em tempo real.",
  keywords: [
    "NeXFlowX",
    "Financial Supply Chain",
    "Payment Orchestration",
    "Supply Chain Finance",
    "Multi-Acquirer",
    "Smart Routing",
    "FLOX",
  ],
  authors: [{ name: "NeXFlowX Team" }],
  icons: {
    icon: "/nexflowx-logo-nav.png",
  },
  openGraph: {
    title: "NeXFlowX — Financial Supply Chain Orchestrator",
    description:
      "Gerimos dinheiro como a Amazon gere encomendas. Orquestração inteligente de pagamentos globais.",
    siteName: "NeXFlowX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeXFlowX — Financial Supply Chain Orchestrator",
    description: "Gerimos dinheiro como a Amazon gere encomendas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
        style={{ backgroundColor: "#0B0C10" }}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
