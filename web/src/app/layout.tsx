import { Toaster } from '@/lib/sonner'
import { cn } from '@/lib/utils'
import { Providers } from '@/providers'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App',
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
          <div className={'h-full w-full max-w-lg mx-auto p-8'}>{children}</div>
        </Providers>
      </body>
      <Toaster />
    </html>
  )
}
