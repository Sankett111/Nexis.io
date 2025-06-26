import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/ui/ui/Header"

export const metadata: Metadata = {
  title: "Nexis.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">{children}</main>
               <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
