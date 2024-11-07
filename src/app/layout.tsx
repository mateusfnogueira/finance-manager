import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import { InstallProviders } from '@/providers/install-providers'
import { authOptions } from '@/lib/auth'
import './globals.css'
import { Header } from '@/components/header/header.component'
import { getServerSession } from 'next-auth/next'

const mulish = Mulish({
  subsets: ['latin-ext']
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
      <body className={`${mulish.className} dark antialiased`}>
        <InstallProviders locale="en" messages={{}} session={session}>
          <Header />
          {children}
        </InstallProviders>
      </body>
    </html>
  )
}
