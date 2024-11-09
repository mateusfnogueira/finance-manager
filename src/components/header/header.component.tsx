'use client'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Logo from '@public/icons/logo-main.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()

  if (!session) {
    return null
  }

  return (
    <header className="border-solidpx-8 flex items-center justify-between border-b bg-primary-foreground px-8 py-4">
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-2">
          <Logo />
          <h1 className="text-xl font-bold">finance.ai</h1>
        </div>
        <nav className="flex items-center gap-10">
          <Link
            href="/"
            className={pathname === '/' ? 'font-bold text-primary' : 'text-muted-foreground'}
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === '/transactions' ? 'font-bold text-primary' : 'text-muted-foreground'
            }
          >
            Transações
          </Link>
          <Link
            href="/subscription"
            className={
              pathname === '/subscription' ? 'font-bold text-primary' : 'text-muted-foreground'
            }
          >
            Assinatura
          </Link>
        </nav>
      </div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 border-none">
            <Image
              src={session.user?.image as string}
              alt="Avatar"
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
            />
            <span>{session.user.name}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => {}}>
              <DropdownMenuLabel>Perfil</DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {}}>
              <DropdownMenuLabel>Configurações</DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => signOut()}>
              <DropdownMenuLabel>Sair</DropdownMenuLabel>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </header>
  )
}
