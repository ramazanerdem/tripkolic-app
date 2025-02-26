import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import './globals.css'
import { FavoriteProvider } from '@/context/FavoriteContext'

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kanit',
})

export const metadata: Metadata = {
  title: 'Tripify',
  description: 'Tripify',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.variable} antialiased`}>
        <FavoriteProvider>{children}</FavoriteProvider>
      </body>
    </html>
  )
}
