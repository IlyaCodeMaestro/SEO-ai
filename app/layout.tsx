import type React from "react";
import "./globals.css";
import "./darkTheme.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { LanguageProvider } from "@/components/provider/language-provider";
import { TariffProvider } from "@/components/provider/tariff-provider";
import { ProcessingProvider } from "@/components/main/processing-provider";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "SEO AI Dashboard",
  description: "Multilingual SEO AI Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <TariffProvider>
              <ProcessingProvider>{children}</ProcessingProvider>
            </TariffProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
