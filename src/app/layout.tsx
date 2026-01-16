
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import StyledComponentsRegistry from '@/lib/styled-components-registry';
import BackToTopButton from '@/components/ui/back-to-top';
import SpotifyWidget from '@/components/ui/spotify-widget';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';

export const metadata: Metadata = {
  title: 'Asterasia Café',
  description: 'An elegant, warm, and artistic café experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sour+Gummy:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <StyledComponentsRegistry>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SmoothScrollProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <BackToTopButton />
              <Toaster />
            </SmoothScrollProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
