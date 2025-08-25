import { ThemeProvider } from '@/components/home/theme-provider';
import { siteConfig } from '@/lib/site';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import { PostHogIdentify } from '@/components/posthog-identify';
import '@/lib/polyfills'; // Load polyfills early

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: 'black',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description:
    'Lynx AI by Apex7 AI é um assistente de inteligência artificial avançado que ajuda você a realizar tarefas do mundo real com facilidade. Através de conversação natural, o Lynx AI se torna seu companheiro digital para pesquisa, análise de dados e desafios cotidianos.',
  keywords: [
    'IA',
    'inteligência artificial',
    'automação de navegador',
    'web scraping',
    'gerenciamento de arquivos',
    'assistente IA',
    'Lynx AI',
    'pesquisa',
    'análise de dados',
  ],
  authors: [{ name: 'Lynx AI Team', url: 'https://lynxai.com.br' }],
  creator:
    'Apex7 AI Team',
  publisher:
    'Apex7 AI',
  category: 'Technology',
  applicationName: 'Lynx AI',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Lynx AI - Assistente IA Inteligente by Apex7 AI',
    description:
      'Lynx AI é um assistente de inteligência artificial avançado que ajuda você a realizar tarefas do mundo real com facilidade através de conversação natural.',
    url: siteConfig.url,
    siteName: 'Lynx AI',
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 630,
        alt: 'Lynx AI - Assistente IA Inteligente by Apex7 AI',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lynx AI - Assistente IA Inteligente by Apex7 AI',
    description:
      'Lynx AI é um assistente de inteligência artificial avançado que ajuda você a realizar tarefas do mundo real com facilidade através de conversação natural.',
    creator: '@lynxai',
    site: '@lynxai',
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 630,
        alt: 'Lynx AI - Assistente IA Inteligente by Apex7 AI',
      },
    ],
  },
  icons: {
    icon: [{ url: '/favicon.png', sizes: 'any' }],
    shortcut: '/favicon.png',
  },
  // manifest: "/manifest.json",
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PCHSN4M2');`}
        </Script>
        <Script async src="https://cdn.tolt.io/tolt.js" data-tolt={process.env.NEXT_PUBLIC_TOLT_REFERRAL_ID}></Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PCHSN4M2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <Toaster />
          </Providers>
          <Analytics />
          <GoogleAnalytics gaId="G-6ETJFB3PT3" />
          <SpeedInsights />
          <PostHogIdentify />
        </ThemeProvider>
      </body>
    </html>
  );
}
