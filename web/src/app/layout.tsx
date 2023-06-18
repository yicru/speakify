import { Toaster } from '@/client/lib/sonner'
import { cn } from '@/client/lib/utils'
import { Providers } from '@/client/providers'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  description:
    'Speakify - Converting online text to audio, simplifying and enhancing your web experience',
  title: 'Speakify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={'h-full'} lang="en">
      <body className={cn(inter.className, 'h-full')}>
        <Providers>
          <div className={'h-full w-full max-w-lg mx-auto p-4'}>{children}</div>
        </Providers>
      </body>
      <Toaster />
    </html>
  )
}
