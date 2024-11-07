import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { getServerSession } from 'next-auth'
import { InstallProviders } from '@/providers/install-providers'
import { authOptions } from '@/lib/auth'
import './globals.css'
import { Header } from '@/components/header/header.component'
import { Suspense } from 'react'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Finance Manager',
  description: 'Application to manage your finances'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
        <InstallProviders locale="en" messages={{}} session={session}>
          <Header />
          {children}
        </InstallProviders>
      </body>
    </html>
  )
}
