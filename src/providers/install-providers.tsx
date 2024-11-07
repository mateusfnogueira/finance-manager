'use client'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

interface Props {
  children: React.ReactNode
  locale: string
  messages: AbstractIntlMessages
  timeZone?: string
  session: Session | null
}

export const InstallProviders: React.FC<Props> = ({
  children,
  locale,
  messages,
  timeZone,
  session
}) => {
  return (
    <SessionProvider session={session}>
      {/* <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timeZone ?? 'America/Sao_Paulo'}
      > */}
      {children}
      {/* </NextIntlClientProvider> */}
    </SessionProvider>
  )
}
