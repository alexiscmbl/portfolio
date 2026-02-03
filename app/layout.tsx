import { Geist, Geist_Mono } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';

import type { Metadata } from 'next';


import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio - Alexis Cesmat-Belliard',
  description:
    'Portfolio d\'Alexis Cesmat-Belliard, étudiant développeur à L\'IUT de Vannes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full overflow-x-hidden antialiased bg-background text-foreground transition-colors duration-300 ease-out`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
