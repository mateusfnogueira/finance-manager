'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

interface Props {
  children: React.ReactNode
  locale: string
  messages: AbstractIntlMessages
  timeZone?: string
}

export const InstallProviders: React.FC<Props> = ({ children, locale, messages, timeZone }) => {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone ?? 'America/Sao_Paulo'}
    >
      <ClerkProvider
        appearance={{
          baseTheme: dark
        }}
      >
        {children}
      </ClerkProvider>
    </NextIntlClientProvider>
  )
}