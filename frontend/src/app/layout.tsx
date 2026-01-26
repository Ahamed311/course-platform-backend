import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "EduPlatform - Plateforme d'apprentissage",
  description: "Modules, cours textuels et quiz interactifs pour un apprentissage moderne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
