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

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex items-center justify-between bg-primary-foreground px-8 py-4">
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="text-xl font-bold">finance.ai</h1>
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
