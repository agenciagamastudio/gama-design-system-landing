import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nosso Casamento - Memorial',
  description: 'Um memorial cinematic do nosso dia especial',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Casamento',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#88CE11" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-gama-dark text-gama-text overflow-hidden">
        {children}
        <script suppressHydrationWarning>
          {`
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js').catch(() => {})
            }
          `}
        </script>
      </body>
    </html>
  )
}
