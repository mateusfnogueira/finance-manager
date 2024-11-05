import Logo from '@public/icons/logo-main.svg'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="flex h-full w-screen items-center justify-end gap-4">
      <div className="flex w-full flex-col justify-center px-12 font-[family-name:var(--font-geist-sans)] text-white">
        <div className="title justify-items-left flex items-center gap-2">
          <Logo />
          <h1 className="text-2xl font-bold">finance.ai</h1>
        </div>
        <div className="content w-full">
          <h2 className="mt-8 text-4xl font-bold">Bem vindo!</h2>
          <p className="mt-3 pr-5 text-base">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas
            movimentações, e oferecer insights personalizados, facilitando o controle do seu
            orçamento.
          </p>
          <button className="mt-8 w-full rounded border-2 border-solid border-white bg-slate-500">
            Entrar com Google
          </button>
        </div>
      </div>
      <Image src="/images/bg-login.png" alt="Login" width={600} height={600} objectFit="cover" />
    </div>
  )
}
