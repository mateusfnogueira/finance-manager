import Image from 'next/image'
import Logo from '@public/icons/logo-main.svg'

export default function LoginPage() {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <div className="flex items-center gap-0.5">
          <Logo />
          <p className="text-2xl font-bold">finance.ai</p>
        </div>
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas
          movimentações, e oferecer insights personalizados, facilitando o controle do seu
          orçamento.
        </p>
        {/* <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton> */}
      </div>
      <div className="relative h-full w-full">
        <Image src="/images/bg-login.png" alt="Faça login" fill className="object-cover" />
      </div>
    </div>
  )
}
