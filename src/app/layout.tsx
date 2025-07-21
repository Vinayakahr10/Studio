
import type { Metadata } from 'next';
import { Poppins, Geist_Mono } from 'next/font/google'; // Changed Geist to Poppins
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { AppThemeProvider } from '@/components/theme-provider';

// Configure Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // Added more weights for flexibility
  variable: '--font-poppins', // CSS variable for Poppins
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EletronicswithVK - Your Guide to Electronics',
  description: 'Learn electronics with tutorials, projects, and articles on Arduino, Raspberry Pi, IoT, and more with EletronicswithVK.',
  openGraph: {
    title: 'EletronicswithVK - Your Guide to Electronics',
    description: 'Learn electronics with tutorials, projects, and articles on Arduino, Raspberry Pi, IoT, and more with EletronicswithVK.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/d/1b-f2Tm-l0H7bh8uzpY6v7XPGQgD3UBov',
        width: 1200,
        height: 630,
        alt: 'An intricate circuit board with glowing pathways.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EletronicswithVK - Your Guide to Electronics',
    description: 'Learn electronics with tutorials, projects, and articles on Arduino, Raspberry Pi, IoT, and more with EletronicswithVK.',
    images: ['https://lh3.googleusercontent.com/d/1b-f2Tm-l0H7bh8uzpY6v7XPGQgD3UBov'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Updated className to use Poppins variable */}
      <body className={`${poppins.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <AppThemeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AppThemeProvider>
      </body>
    </html>
  );
}
