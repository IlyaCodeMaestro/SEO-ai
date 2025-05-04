import type React from "react"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { TariffProvider } from "@/components/tariff-provider"
import { ProcessingProvider } from "@/components/processing-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider defaultTheme="light">
            <LanguageProvider>
              <TariffProvider>
                <ProcessingProvider>{children}</ProcessingProvider>
              </TariffProvider>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

