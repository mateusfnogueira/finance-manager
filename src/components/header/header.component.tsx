'use client'
import Logo from '@public/icons/logo-main.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function Header() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session.data) {
      router.push('/login')
    }
  }, [session.data, router])

  return (
    <header className="flex items-center justify-between bg-primary-foreground px-8 py-4">
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="text-xl font-bold">finance.ai</h1>
      </div>
      {session.data ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 border-none">
            <img
              src={session.data?.user?.image as string}
              alt="Avatar"
              className="h-8 w-8 rounded-full"
            />
            <span>Usuário</span>
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
